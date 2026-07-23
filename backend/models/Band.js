const mongoose = require("mongoose");

const bandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    age: { type: Number, required: true },
    bloodGroup: { type: String, trim: true },
    heartRate: { type: Number, default: 0 }, // bpm
    temperature: { type: Number, default: 0 }, // Celsius
    spo2: { type: Number, default: 0 }, // percentage
    active: { type: Boolean, default: true },
    color: { type: String, default: "blue" },
    workArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkArea",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Band", bandSchema);
