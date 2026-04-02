import express from "express";
import authRoute from "./auth.routes.js";
import userRoute from "./user.routes.js";

const router = express.Router();

router.use("/auth", authRoute);
// router.use("/user", { "userRoutes": ".." });
// router.use("/records", { "recordRoutes": ".." });
// router.use("/dashboard", { "dashboardRoutes": ".." });

export default router;