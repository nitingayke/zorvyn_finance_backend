import { apiResponse } from "../utils/apiResponse.js";
import {
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/user.service.js";

export const getUsersController = async (req, res) => {
  const users = await getUsersService();

  return apiResponse(res, {
    message: "Users fetched",
    data: users,
  });
};

export const getUserController = async (req, res) => {
  const user = await getUserByIdService(req.params.id);

  return apiResponse(res, {
    message: "User fetched",
    data: user,
  });
};

export const updateUserController = async (req, res) => {
  const user = await updateUserService(req.params.id, req?.body, req?.user);

  return apiResponse(res, {
    message: "User updated",
    data: user,
  });
};

export const deleteUserController = async (req, res) => {
  await deleteUserService(req.params.id);

  return apiResponse(res, {
    message: "User deactivated successfully",
  });
};
