import { apiResponse } from "../utils/apiResponse.js";
import {
  getCategoryService,
  getRecentService,
  getSummaryService,
  getTrendsService,
} from "../services/dashboard.service.js";

export const getSummaryController = async (req, res) => {
  const data = await getSummaryService({
    user: req.user,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  });

  return apiResponse(res, {
    message: "Summary fetched successfully",
    data,
  });
};

export const getCategoryController = async (req, res) => {
  const data = await getCategoryService({ user: req.user });

  return apiResponse(res, {
    message: "Category fetched successfully",
    data,
  });
};

export const getRecentController = async (req, res) => {
  const limit = Number(req.query.limit) || 5;

  const data = await getRecentService({ user: req.user, limit });

  return apiResponse(res, {
    message: "Recent records fetched successfully",
    data,
  });
};

export const getTrendsController = async (req, res) => {
  const data = await getTrendsService({ user: req.user });

  return apiResponse(res, {
    message: "Trends fetched successfully",
    data,
  });
};
