import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use("/api/v1", limiter);


app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api/v1", routes);

app.use("/", (req, res) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(errorMiddleware);

const startServer = async () => {
  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log(`Server is running on PORT: ${ENV.PORT}`);
  });
};

startServer();
