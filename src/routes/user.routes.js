import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import {
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  allowRoles("ADMIN"),
  asyncHandler(getUsersController),
);

router.get(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  asyncHandler(getUserController),
);

router.patch(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  asyncHandler(updateUserController),
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  asyncHandler(deleteUserController),
);

export default router;
