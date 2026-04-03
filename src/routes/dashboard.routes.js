import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/summary", asyncHandler({  })); // Summary (all-in-one)

router.get("/category", asyncHandler({  })); // Category-wise totals

router.get("/recent", asyncHandler({  })); // Category-wise totals

router.get("/trends", asyncHandler({  })); // Recent activity

export default router;