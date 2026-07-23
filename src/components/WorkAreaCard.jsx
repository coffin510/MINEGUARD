import React from "react";

const WorkAreaCard = ({ areaId, data }) => {
  return (
    <div className="bg-amber-950/70 p-5 rounded-2xl shadow-lg text-white w-80">
      <h2 className="text-2xl font-semibold mb-2">Work Area</h2>
      <p className="text-amber-300/60 text-sm mb-6">{areaId}</p>

      {/* Temperature */}
      <div className="bg-amber-700/80 p-3 rounded-lg mb-3 flex justify-between items-center">
        <div>
          <p className="text-gray-300 text-sm">Temperature</p>
          <p className="text-2xl font-semibold">{data.temperature}</p>
        </div>
        <span className="text-2xl">🌡</span>
      </div>

      {/* Humidity */}
      <div className="bg-amber-700/80 p-3 rounded-lg mb-3 flex justify-between items-center">
        <div>
          <p className="text-gray-300 text-sm">Humidity</p>
          <p className="text-2xl font-semibold">{data.humidity}</p>
        </div>
        <span className="text-2xl">💧</span>
      </div>

      {/* Air Quality */}
      <div className="bg-amber-700/80 p-3 rounded-lg mb-3 flex justify-between items-center">
        <div>
          <p className="text-gray-300 text-sm">Air Quality</p>
          <p className="text-2xl font-semibold">{data.aqi}</p>
        </div>
        <span className="text-2xl">🌬</span>
      </div>

      {/* Gas Levels */}
      <div className="bg-amber-700/80 p-3 rounded-lg mb-4">
        <p className="text-gray-300 text-sm mb-2">Gas Levels</p>
        <p>CO2: <span className="font-medium">{data.gasLevels.co2}</span></p>
        <p>Benzene: <span className="font-medium">{data.gasLevels.benzene}</span></p>
        <p>Ammonia: <span className="font-medium">{data.gasLevels.ammonia}</span></p>
        <p>Alcohol: <span className="font-medium">{data.gasLevels.alcohol}</span></p>
      </div>

      <button className="text-sm text-amber-300/60 hover:text-amber-200">
        🔄 Refresh
      </button>
    </div>
  );
};

export default WorkAreaCard;