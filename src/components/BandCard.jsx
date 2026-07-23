// BandCard.js
import React from "react";

const BandCard = () => {
  return (
    <div className="p-5 rounded-2xl shadow-lg text-white w-96 bg-amber-950/70">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Active Band</h2>
      </div>

      <p className="text-gray-200 text-sm mb-4">Male · 25 years · A+</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-amber-700/80 p-3 rounded-lg">
          <p className="text-sm text-gray-300">Heart Rate</p>
          <p className="text-xl font-semibold">0 bpm</p>
        </div>

        <div className="bg-amber-700/80 p-3 rounded-lg">
          <p className="text-sm text-gray-300">Temperature</p>
          <p className="text-xl font-semibold">0°C</p>
        </div>

        <div className="col-span-2 bg-amber-700/80 p-3 rounded-lg">
          <p className="text-sm text-gray-300">SPO2 Level</p>
          <p className="text-xl font-semibold">0%</p>
        </div>
      </div>
    </div>
  );
};

export default BandCard;