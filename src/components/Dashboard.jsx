// src/components/Dashboard.jsx
import React from "react";
import WorkAreaCard from "./WorkAreaCard";
import BandCard from "./BandCard";

const Dashboard = () => {
  const workAreaData = {
    temperature: "0C",
    humidity: "0%",
    aqi: "0 AQI",
    gasLevels: {
      co2: "0 ppm",
      benzene: "0 ppm",
      ammonia: "0 ppm",
      alcohol: "0  ppm",
    },
  };

  const bands = [
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
    },
 
  ];

  return (
    <div className="min-h-screen flex gap-6 p-8 bg-gradient-to-br from-[#521601] via-[#a13c10] to-[#eb994d] text-[#FAF3E0]">
      <WorkAreaCard areaId="Mine Area WA-1312" data={workAreaData} />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-green-400 mb-5">• Active Bands</p>

        <div className="flex flex-wrap gap-6">
          {bands.map((band) => (
            <BandCard key={band.name} band={band} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
