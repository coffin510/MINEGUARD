const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["open", "investigating", "resolved"],
      default: "open",
    },
    workArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkArea",
      default: null,
    },
    band: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Band",
      default: null,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", incidentSchema);
