import { apiResponse } from "../utils/apiResponse.js";
import { createUserService, loginService } from "../services/auth.service.js";
import { validateCreateUser } from "../validators/auth.validator.js";
import { generateToken } from "../utils/jwt.js";

export const createUserController = async (req, res) => {
  validateCreateUser(req);

  const user = await createUserService({
    name: req.body?.name,
    email: req.body?.email,
    password: req.body?.password,
    role: req.body?.role,
    currentUser: req.user || null,
  });

  const token = generateToken({ id: user._id, role: user.role });

  user.password = null;

  return apiResponse(res, {
    status: 201,
    message: "User created successfully",
    data: { user, token },
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await loginService({ email, password });

  const token = generateToken({ id: user._id, role: user.role });

  return apiResponse(res, {
    message: "Login successful",
    data: { token },
  });
};
