import mongoose from "mongoose";
import Record from "../models/record.model.js";
import ApiError from "../utils/apiError.js";

export const createRecordService = async ({ data, user }) => {
  if (!user?.id) {
    throw new ApiError(401, "Unauthorized");
  }

  const record = await Record.create({
    amount: data.amount,
    type: data.type,
    category: data.category.trim().toLowerCase(),
    date: data.date,
    notes: data.notes,
    createdBy: user.id,
  });

  return record;
};

export const getRecordsService = async ({ query, user }) => {
  const { type, category, startDate, endDate } = query;

  let filter = {};

  if (user.role === "ANALYST") {
    filter.createdBy = user.id;
  }

  if (type) {
    const normalizedType = type.toUpperCase();

    if (!["INCOME", "EXPENSE"].includes(normalizedType)) {
      throw new ApiError(400, "Invalid type filter");
    }

    filter.type = normalizedType;
  }

  if (category) {
    filter.category = {
      $regex: category.trim().toLowerCase(),
      $options: "i", // case-insensitive
    };
  }

  if (startDate || endDate) {
    filter.date = {};

    if (startDate) {
      if (isNaN(Date.parse(startDate))) {
        throw new ApiError(400, "Invalid startDate");
      }
      filter.date.$gte = new Date(startDate);
    }

    if (endDate) {
      if (isNaN(Date.parse(endDate))) {
        throw new ApiError(400, "Invalid endDate");
      }
      filter.date.$lte = new Date(endDate);
    }
  }

  const records = await Record.find(filter)
    .sort({ date: -1 })
    .populate("createdBy", "name email role");

  return records;
};

export const getRecordService = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid record ID");
  }

  const record = await Record.findById(id).populate(
    "createdBy",
    "name email role",
  );

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return record;
};

export const updateRecordService = async ({ id, data }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid record ID");
  }

  const record = await Record.findById(id);

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  if (data.type) {
    data.type = data.type.toUpperCase();
  }

  Object.assign(record, data);

  await record.save();

  return record;
};

export const deleteRecordService = async ({ id }) => {
  const record = await Record.findById(id);

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  await record.deleteOne();
};
