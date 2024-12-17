import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserByID,
  getUserByID,
  updateUserByID,
} from "../controllers/userController.js";
import {
  authtenticateUser,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .post(createUser)
  .get(authtenticateUser, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authtenticateUser, getCurrentUserProfile)
  .put(authtenticateUser, updateCurrentUserProfile);

// Admin Routes ✨
router
  .route("/:id")
  .delete(authtenticateUser, authorizeAdmin, deleteUserByID)
  .get(authtenticateUser, authorizeAdmin, getUserByID)
  .put(authtenticateUser, authorizeAdmin, updateUserByID);
export default router;
