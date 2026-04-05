import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createUserController, loginController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", authMiddleware, asyncHandler(createUserController));

router.post("/login", asyncHandler(loginController));

export default router;