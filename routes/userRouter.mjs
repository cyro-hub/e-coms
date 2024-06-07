/** @format */

import { Router, json } from "express";
import {
  createUser,
  verifyUser,
  logoutCurrentUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  updateUser,
  deleteUser,
} from "../Controllers/userController.mjs";

import authenticateUser from "../middlewares/verifyToken.mjs";

const userRoutes = Router();
userRoutes.use(json());

userRoutes
  .route("/")
  .post(createUser)
  .get(getUsers)
  .put(updateUser)
  .delete(deleteUser);
userRoutes.route("/auth").post(verifyUser);
userRoutes.route("/logout").post(logoutCurrentUser);
userRoutes
  .route("/profile")
  .get(authenticateUser, getUserProfile)
  .put(authenticateUser, updateUserProfile);

export default userRoutes;
