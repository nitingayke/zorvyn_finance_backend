import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcrypt";

export const createUserService = async ({
  name,
  email,
  password,
  role: requestedRole,
  currentUser,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const usersCount = await User.countDocuments();

  let role = "VIEWER";

  if (usersCount === 0) {
    role = "ADMIN";
  } else {
    if (!currentUser) {
      throw new ApiError(401, "Unauthorized");
    }

    if (currentUser?.role !== "ADMIN") {
      throw new ApiError(403, "Only admin can create users");
    }

    if (requestedRole) {
      if (!["ADMIN", "ANALYST", "VIEWER"].includes(requestedRole)) {
        throw new ApiError(400, "Invalid role provided");
      }
      role = requestedRole;
    }
  }

  const passwordStr = String(password);
  const hashedPassword = await bcrypt.hash(passwordStr, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return user;
};

export const loginService = async ({ email, password }) => {

  if (!email) {
    throw new ApiError(400, "Valid email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found.");
  }

  const passwordStr = String(password);
  if (!passwordStr) {
    throw new ApiError(400, "Password required");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiError(403, "User is inactive");
  }

  const isMatch = await bcrypt.compare(passwordStr, user.password);

  if (!isMatch) {
    throw new ApiError(400, "Wrong password");
  }

  return user;
};
