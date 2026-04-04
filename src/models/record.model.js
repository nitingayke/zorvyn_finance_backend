import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["INCOME", "EXPENSE"],
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);

export default Record;