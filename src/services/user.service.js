import mongoose from "mongoose";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

export const getUsersService = async () => {
  return await User.find({});
};

export const getUserByIdService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const updateUserService = async (id, data, currentUser) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (data.role && id === currentUser.id.toString()) {
    throw new ApiError(400, "Admin cannot change their own role");
  }

  const ALLOWED_ROLES = ["ADMIN", "ANALYST", "VIEWER"];
  const ALLOWED_STATUS = ["ACTIVE", "INACTIVE"];

  if (data?.role && !ALLOWED_ROLES.includes(data.role)) {
    throw new ApiError(400, "Invalid role");
  }

  if (data?.status && !ALLOWED_STATUS.includes(data.status)) {
    throw new ApiError(400, "Invalid status");
  }

  if (data?.role) user.role = data.role;
  if (data?.status) user.status = data.status;

  await user.save();

  return user;
};

export const deleteUserService = async (id, currentUser) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  if (id === currentUser.id.toString()) {
    throw new ApiError(400, "Admin cannot deactivate themselves");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.status = "INACTIVE";
  await user.save();
};
