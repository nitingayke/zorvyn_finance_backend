import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    const user = await User.findById(decoded?.id);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    if (user.status !== "ACTIVE") {
      throw new ApiError(403, "User is inactive");
    }

    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch {
    throw new ApiError(401, "Invalid token");
  }
};
