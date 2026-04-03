import express from "express";
import authRoute from "./auth.routes.js";
import userRoute from "./user.routes.js";
import recordRoute from "./record.routes.js";
import dashboardRoute from "./dashboard.routes.js";

const router = express.Router();

router.use("/auth", authRoute);

router.use("/users", userRoute);

router.use("/records", recordRoute);

router.use("/dashboard", dashboardRoute);

export default router;