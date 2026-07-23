const mongoose = require("mongoose");

const workAreaSchema = new mongoose.Schema(
  {
    areaId: { type: String, required: true, unique: true, trim: true },
    temperature: { type: Number, default: 0 }, // stored in Celsius
    humidity: { type: Number, default: 0 }, // percentage
    aqi: { type: Number, default: 0 },
    gasLevels: {
      co2: { type: Number, default: 0 }, // ppm
      benzene: { type: Number, default: 0 }, // ppm
      ammonia: { type: Number, default: 0 }, // ppm
      alcohol: { type: Number, default: 0 }, // ppm
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkArea", workAreaSchema);
