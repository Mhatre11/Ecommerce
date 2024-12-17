import User from "../models/userModel.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import bcrypt from "bcrypt";
import createToken from "../utils/createToken.js";

// Create a new user
const createUser = asyncHandler(async (request, response) => {
  const { username, email, password } = request.body;
  if (!username || !email || !password) {
    response.status(400);
    throw new Error("Please fill all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    response.status(400);
    throw new Error("User already exists");
  }
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate a token
    createToken(response, user._id);
    response.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(`ERROR : ${error.message}`);
    response.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// login user
const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      response.status(400);
      throw new Error("Invalid password");
    }
    createToken(response, existingUser._id);
    response.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    });
  } else {
    response.status(400);
    throw new Error("User not found");
  }
});

// logout user
const logoutCurrentUser = asyncHandler(async (request, response) => {
  response.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
  response.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Get all users
const getAllUsers = asyncHandler(async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

// Get current user
const getCurrentUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);
  if (user) {
    response.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

// Update current user
const updateCurrentUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);
  if (user) {
    user.username = request.body.username || user.username;
    user.email = request.body.email || user.email;
    if (request.body.password) {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);

      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(request.body.password, salt);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();

    response.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

// Delete user by ID
const deleteUserByID = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) {
    if (user.isAdmin) {
      response.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    response.json({ message: "User deleted successfully" });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

// Get user by ID
const getUserByID = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id).select("-password");
  if (user) {
    response.json(user);
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

// Update user by ID
const updateUserByID = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) {
    user.username = request.body.username || user.username;
    user.email = request.body.email || user.email;
    user.isAdmin = request.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    response.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserByID,
  getUserByID,
  updateUserByID,
};
