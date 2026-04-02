import ApiError from "../utils/apiError.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { id, role }
    next();
  } catch {
    throw new ApiError(401, "Invalid token");
  }
};
