import Record from "../models/record.model.js";

export const getSummaryService = async ({ user, startDate, endDate }) => {
  let match = {};

  if (startDate || endDate) {
    match.date = {};

    if (startDate) {
      if (isNaN(Date.parse(startDate))) {
        throw new ApiError(400, "Invalid startDate");
      }

      const start = new Date(startDate);
      match.date.$gte = start;
    }

    if (endDate) {
      if (isNaN(Date.parse(endDate))) {
        throw new ApiError(400, "Invalid endDate");
      }

      const end = new Date(endDate);
      match.date.$lte = end;
    }
  }

  if (user.role === "VIEWER") {
    match.createdBy = user.id;
  }

  const result = await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  result.forEach((item) => {
    if (item._id === "INCOME") totalIncome = item.total;
    if (item._id === "EXPENSE") totalExpense = item.total;
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
};

export const getCategoryService = async ({ user }) => {
  let match = {};

  if (user.role === "VIEWER") {
    match.createdBy = user.id;
  }

  return await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        total: 1,
      },
    },
  ]);
};

export const getRecentService = async ({ user, limit }) => {
  let filter = {};

  if (user.role === "VIEWER") {
    filter.createdBy = user.id;
  }

  return await Record.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("amount type category date")
    .lean();
};

export const getTrendsService = async ({ user }) => {
  let match = {};

  if (user.role === "VIEWER") {
    match.createdBy = user.id;
  }

  return await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        type: "$_id.type",
        total: 1,
      },
    },
    {
      $sort: { year: 1, month: 1 },
    },
  ]);
};
