import ApiError from "../utils/apiError.js";

export const validateCreateUser = (req) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string") {
    throw new ApiError(400, "Valid name is required");
  }

  if (!email?.includes("@")) {
    throw new ApiError(400, "Valid email is required");
  }

  const passwordStr = String(password);
  if (!passwordStr || passwordStr.length < 6) {
    throw new ApiError(400, passwordStr ? "Password must be at least 6 characters" : "Password required" );
  }
};
