// Populates the database with one demo work area and a couple of bands,
// so the Dashboard has something real to display right after setup.
// Run with: npm run seed

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const WorkArea = require("./models/WorkArea");
const Band = require("./models/Band");

async function seed() {
  await connectDB();

  const existingArea = await WorkArea.findOne({ areaId: "Mine Area WA-1312" });
  const area =
    existingArea ||
    (await WorkArea.create({
      areaId: "Mine Area WA-1312",
      temperature: 34,
      humidity: 62,
      aqi: 87,
      gasLevels: {
        co2: 420,
        benzene: 2,
        ammonia: 5,
        alcohol: 0,
      },
    }));

  console.log("Work area ready:", area.areaId);

  const bandDefs = [
    {
      name: "Band1",
      gender: "Male",
      age: 25,
      bloodGroup: "A+",
      heartRate: 76,
      temperature: 36,
      spo2: 98,
      active: true,
      color: "blue",
      workArea: area._id,
    },
    {
      name: "Band2",
      gender: "Female",
      age: 31,
      bloodGroup: "O+",
      heartRate: 82,
      temperature: 36.5,
      spo2: 97,
      active: true,
      color: "green",
      workArea: area._id,
    },
  ];

  for (const def of bandDefs) {
    const existing = await Band.findOne({ name: def.name });
    if (!existing) {
      await Band.create(def);
      console.log("Created band:", def.name);
    } else {
      console.log("Band already exists:", def.name);
    }
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
