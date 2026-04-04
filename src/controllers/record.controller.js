import { apiResponse } from "../utils/apiResponse.js";
import {
  validateCreateRecord,
  validateUpdateRecord,
} from "../validators/record.validator.js";
import {
  createRecordService,
  deleteRecordService,
  getRecordService,
  getRecordsService,
  updateRecordService,
} from "../services/record.service.js";

export const createRecordController = async (req, res) => {
  validateCreateRecord(req);

  const record = await createRecordService({
    data: req.body,
    user: req.user,
  });

  return apiResponse(res, {
    status: 201,
    message: "Record created successfully",
    data: record,
  });
};

export const getRecordsController = async (req, res) => {
  const records = await getRecordsService({
    query: req?.query,
    user: req.user
  });

  return apiResponse(res, {
    message: "Records fetched successfully",
    data: records,
  });
};

export const getRecordController = async (req, res) => {
  const record = await getRecordService({
    id: req.params.id,
  });

  return apiResponse(res, {
    message: "Record fetched successfully",
    data: record,
  });
};

export const updateRecordController = async (req, res) => {
  validateUpdateRecord(req.body);

  const record = await updateRecordService({
    id: req.params.id,
    data: req.body,
  });

  return apiResponse(res, {
    message: "Record updated successfully",
    data: record,
  });
};

export const deleteRecordController = async (req, res) => {
  await deleteRecordService({
    id: req.params.id,
  });

  return apiResponse(res, {
    message: "Record deleted successfully",
    data: null,
  });
};
