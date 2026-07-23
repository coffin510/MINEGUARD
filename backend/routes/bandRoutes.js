const express = require("express");
const Band = require("../models/Band");
const protect = require("../middleware/auth");

const router = express.Router();

// @route  GET /api/bands
// Supports ?workArea=<areaObjectId> and ?active=true/false
router.get("/", protect, async (req, res) => {
  const filter = {};
  if (req.query.workArea) filter.workArea = req.query.workArea;
  if (req.query.active !== undefined) filter.active = req.query.active === "true";

  const bands = await Band.find(filter).sort({ name: 1 });
  res.json(bands);
});

// @route  POST /api/bands
router.post("/", protect, async (req, res) => {
  try {
    const { name, gender, age } = req.body;
    if (!name || !gender || !age) {
      return res.status(400).json({ message: "name, gender, and age are required" });
    }

    const band = await Band.create(req.body);
    res.status(201).json(band);
  } catch (err) {
    res.status(500).json({ message: "Could not create band", error: err.message });
  }
});

// @route  PATCH /api/bands/:id
// Used to push updated vitals (heartRate, temperature, spo2, active)
router.patch("/:id", protect, async (req, res) => {
  try {
    const band = await Band.findById(req.params.id);
    if (!band) return res.status(404).json({ message: "Band not found" });

    const allowed = [
      "heartRate",
      "temperature",
      "spo2",
      "active",
      "color",
      "workArea",
    ];
    for (const key of allowed) {
      if (key in req.body) band[key] = req.body[key];
    }
    await band.save();
    res.json(band);
  } catch (err) {
    res.status(500).json({ message: "Could not update band", error: err.message });
  }
});

// @route  DELETE /api/bands/:id
router.delete("/:id", protect, async (req, res) => {
  const band = await Band.findByIdAndDelete(req.params.id);
  if (!band) return res.status(404).json({ message: "Band not found" });
  res.json({ message: "Band deleted" });
});

module.exports = router;
