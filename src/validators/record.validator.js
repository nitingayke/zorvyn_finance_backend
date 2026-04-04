import ApiError from "../utils/apiError.js";

export const validateCreateRecord = (req) => {
  const { amount, type, category, date } = req.body;

  if (amount === undefined || isNaN(Number(amount)) || Number(amount) <= 0) {
    throw new ApiError(400, "Valid amount is required");
  }

  if (!["INCOME", "EXPENSE"].includes(type)) {
    throw new ApiError(400, "Type must be INCOME or EXPENSE");
  }

  if (!category || typeof category !== "string" || !category.trim()) {
    throw new ApiError(400, "Category is required");
  }

  if (!date || isNaN(Date.parse(date))) {
    throw new ApiError(400, "Valid date is required");
  }

  const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

  if (!date || !DATE_REGEX.test(date) || isNaN(Date.parse(date))) {
    throw new ApiError(400, "Date must be in YYYY-MM-DD format");
  }

  const inputDate = new Date(date + "T00:00:00.000Z");
  const now = new Date();

  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  if (inputDate > todayUTC) {
    throw new ApiError(400, "Future dates are not allowed");
  }
};

export const validateUpdateRecord = (body) => {
  const allowedFields = ["amount", "type", "category", "date", "notes"];

  const updates = Object.keys(body);
  
  if (updates.length === 0) {
    throw new ApiError(400, "No fields provided for update");
  }

  const isValid = updates.every((field) => allowedFields.includes(field));

  if (!isValid) {
    throw new ApiError(400, "Invalid fields in update");
  }

  if (body.type) {
    const type = body.type.toUpperCase();

    if (!["INCOME", "EXPENSE"].includes(type)) {
      throw new ApiError(400, "Invalid type");
    }

    body.type = type;
  }

  if (body.amount) {
    const amount = Number(body.amount);

    if (isNaN(amount) || amount <= 0) {
      throw new ApiError(400, "Amount must be a positive number");
    }

    body.amount = amount; // normalize
  }

  if (body.category) {
    body.category = body.category.trim().toLowerCase();
  }

  if (body.notes) {
    body.notes = body.notes.trim();
  }

  if (body.date) {
    const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

    if (!DATE_REGEX.test(body.date) || isNaN(Date.parse(body.date))) {
      throw new ApiError(400, "Date must be in YYYY-MM-DD format");
    }

    const inputDate = new Date(body.date + "T00:00:00.000Z");

    const now = new Date();

    const todayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );

    if (inputDate > todayUTC) {
      throw new ApiError(400, "Future dates are not allowed");
    }

    body.date = inputDate;
  }
};
