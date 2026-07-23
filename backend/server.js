require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const workAreaRoutes = require("./routes/workAreaRoutes");
const bandRoutes = require("./routes/bandRoutes");
const incidentRoutes = require("./routes/incidentRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/workareas", workAreaRoutes);
app.use("/api/bands", bandRoutes);
app.use("/api/incidents", incidentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5002;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`MineGuard API running on port ${PORT}`));
});

module.exports = app;
