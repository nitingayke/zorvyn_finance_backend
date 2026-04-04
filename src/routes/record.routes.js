import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import {
  createRecordController,
  deleteRecordController,
  getRecordController,
  getRecordsController,
  updateRecordController,
} from "../controllers/record.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN"),
  asyncHandler(createRecordController),
);

// type=INCOME
// category=Food
// startDate=2026-01-01&endDate=2026-01-31
router.get(
  "/",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST"),
  asyncHandler(getRecordsController),
);

router.get(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST"),
  asyncHandler(getRecordController),
);

router.patch(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  asyncHandler(updateRecordController),
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  asyncHandler(deleteRecordController),
);

export default router;
