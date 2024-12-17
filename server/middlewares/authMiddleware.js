import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { asyncHandler } from "./asyncHandler.js";

const authtenticateUser = asyncHandler(async (request, response, next) => {
  let token;

  // Read the jwt from the cookie
  token = request.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      request.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      response.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    response.status(401);
    throw new Error("Not authorized, no token");
  }
});

// check for the admin

const authorizeAdmin = (request, response, next) => {
  if (request.user && request.user.isAdmin) {
    next();
  } else {
    response.status(401).send("Not authorized as an admin");
  }
};
export { authtenticateUser, authorizeAdmin };
