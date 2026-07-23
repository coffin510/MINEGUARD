const express = require("express");
const WorkArea = require("../models/WorkArea");
const protect = require("../middleware/auth");

const router = express.Router();

// Reading sensor data is open to any logged-in user; only supervisors/admins
// would typically create new work areas, but we keep it simple here.

// @route  GET /api/workareas
router.get("/", protect, async (req, res) => {
  const areas = await WorkArea.find().sort({ areaId: 1 });
  res.json(areas);
});

// @route  GET /api/workareas/:areaId
router.get("/:areaId", protect, async (req, res) => {
  const area = await WorkArea.findOne({ areaId: req.params.areaId });
  if (!area) return res.status(404).json({ message: "Work area not found" });
  res.json(area);
});

// @route  POST /api/workareas
router.post("/", protect, async (req, res) => {
  try {
    const { areaId, temperature, humidity, aqi, gasLevels } = req.body;
    if (!areaId) return res.status(400).json({ message: "areaId is required" });

    const existing = await WorkArea.findOne({ areaId });
    if (existing) {
      return res.status(409).json({ message: "That areaId already exists" });
    }

    const area = await WorkArea.create({ areaId, temperature, humidity, aqi, gasLevels });
    res.status(201).json(area);
  } catch (err) {
    res.status(500).json({ message: "Could not create work area", error: err.message });
  }
});

// @route  PATCH /api/workareas/:areaId
// Used to push updated sensor readings (e.g. from a simulator or real hardware feed)
router.patch("/:areaId", protect, async (req, res) => {
  try {
    const area = await WorkArea.findOne({ areaId: req.params.areaId });
    if (!area) return res.status(404).json({ message: "Work area not found" });

    const { temperature, humidity, aqi, gasLevels } = req.body;
    if (temperature !== undefined) area.temperature = temperature;
    if (humidity !== undefined) area.humidity = humidity;
    if (aqi !== undefined) area.aqi = aqi;
    if (gasLevels) {
      area.gasLevels = { ...area.gasLevels.toObject(), ...gasLevels };
    }

    await area.save();
    res.json(area);
  } catch (err) {
    res.status(500).json({ message: "Could not update work area", error: err.message });
  }
});

module.exports = router;
