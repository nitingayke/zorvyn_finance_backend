import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler({  })); // create new record

router.get("/", asyncHandler({  })); // get all records (with filters)
// GET /api/v1/records?type=INCOME
// GET /api/v1/records?category=Food
// GET /api/v1/records?startDate=2026-01-01&endDate=2026-01-31

router.get("/:id", asyncHandler({  })); // Get single record

router.patch("/:id", asyncHandler({  })); // Get single record

router.delete("/:id", asyncHandler({  })); // Update record

export default router;