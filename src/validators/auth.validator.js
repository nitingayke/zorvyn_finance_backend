import ApiError from "../utils/apiError.js";

export const validateCreateUser = (req) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string") {
    throw new ApiError(400, "Valid name is required");
  }

  if (!email?.includes("@")) {
    throw new ApiError(400, "Valid email is required");
  }

  if (!password || password.length < 6) {
    throw new ApiError(400, password ? "Password must be at least 6 characters" : "Password required" );
  }
};
