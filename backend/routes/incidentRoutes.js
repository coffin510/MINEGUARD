const express = require("express");
const Incident = require("../models/Incident");
const protect = require("../middleware/auth");

const router = express.Router();
router.use(protect);

// @route  GET /api/incidents
// Supports ?status=open&severity=high&workArea=<id>
router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.severity) filter.severity = req.query.severity;
  if (req.query.workArea) filter.workArea = req.query.workArea;

  const incidents = await Incident.find(filter)
    .populate("workArea", "areaId")
    .populate("band", "name")
    .populate("reportedBy", "name")
    .sort({ createdAt: -1 });

  res.json(incidents);
});

// @route  POST /api/incidents
router.post("/", async (req, res) => {
  try {
    const { title, description, severity, workArea, band } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const incident = await Incident.create({
      title,
      description,
      severity,
      workArea,
      band,
      reportedBy: req.userId,
    });
    res.status(201).json(incident);
  } catch (err) {
    res.status(500).json({ message: "Could not create incident", error: err.message });
  }
});

// @route  PATCH /api/incidents/:id
// Mainly used to change status as an incident is investigated/resolved
router.patch("/:id", async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ message: "Incident not found" });

    const allowed = ["title", "description", "severity", "status"];
    for (const key of allowed) {
      if (key in req.body) incident[key] = req.body[key];
    }
    await incident.save();
    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: "Could not update incident", error: err.message });
  }
});

module.exports = router;
