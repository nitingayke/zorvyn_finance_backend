import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import {
  getCategoryController,
  getRecentController,
  getSummaryController,
  getTrendsController,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
  "/summary",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST", "VIEWER"),
  asyncHandler(getSummaryController),
);

router.get(
  "/category",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST", "VIEWER"),
  asyncHandler(getCategoryController),
);

router.get(
  "/recent",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST", "VIEWER"),
  asyncHandler(getRecentController),
);

router.get(
  "/trends",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST", "VIEWER"),
  asyncHandler(getTrendsController),
);

export default router;
