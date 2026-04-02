import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createUserController, loginController } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/new", authMiddleware, asyncHandler(createUserController));

router.post("/login", asyncHandler(loginController));

export default router;