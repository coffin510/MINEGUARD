// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import WorkAreaCard from "./WorkAreaCard";
import BandCard from "./BandCard";
import api from "../api";

const AREA_ID = "Mine Area WA-1312"; // matches the area created by the seed script

const Dashboard = () => {
  const [workAreaData, setWorkAreaData] = useState({
    temperature: "0C",
    humidity: "0%",
    aqi: "0 AQI",
    gasLevels: {
      co2: "0 ppm",
      benzene: "0 ppm",
      ammonia: "0 ppm",
      alcohol: "0 ppm",
    },
  });
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Incident reporting form state
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incidentTitle, setIncidentTitle] = useState("");
  const [incidentSeverity, setIncidentSeverity] = useState("medium");
  const [incidentSubmitting, setIncidentSubmitting] = useState(false);
  const [incidentSuccess, setIncidentSuccess] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    setError("");
    try {
      const [areaRes, bandsRes] = await Promise.all([
        api.get(`/workareas/${encodeURIComponent(AREA_ID)}`),
        api.get("/bands", { params: { active: true } }),
      ]);

      const area = areaRes.data;
      setWorkAreaData({
        temperature: `${area.temperature}C`,
        humidity: `${area.humidity}%`,
        aqi: `${area.aqi} AQI`,
        gasLevels: {
          co2: `${area.gasLevels.co2} ppm`,
          benzene: `${area.gasLevels.benzene} ppm`,
          ammonia: `${area.gasLevels.ammonia} ppm`,
          alcohol: `${area.gasLevels.alcohol} ppm`,
        },
      });
      setBands(bandsRes.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load live data. Have you run the seed script and started the backend?"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleReportIncident(e) {
    e.preventDefault();
    setIncidentSubmitting(true);
    setIncidentSuccess("");
    try {
      await api.post("/incidents", {
        title: incidentTitle,
        severity: incidentSeverity,
      });
      setIncidentSuccess("Incident reported.");
      setIncidentTitle("");
      setShowIncidentForm(false);
    } catch (err) {
      setIncidentSuccess(
        err.response?.data?.message || "Could not report the incident."
      );
    } finally {
      setIncidentSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex gap-6 p-8 bg-gradient-to-br from-[#521601] via-[#a13c10] to-[#eb994d] text-[#FAF3E0]">
      <WorkAreaCard areaId={AREA_ID} data={workAreaData} />

      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={() => setShowIncidentForm((v) => !v)}
            className="bg-transparent border-2 border-[#E46033] text-white font-semibold rounded-[40px] px-4 py-2 hover:bg-[#E46033] transition-all duration-300"
          >
            Report Incident
          </button>
        </div>

        {error && <p className="text-red-300 mb-3">{error}</p>}
        {incidentSuccess && <p className="text-yellow-200 mb-3">{incidentSuccess}</p>}

        {showIncidentForm && (
          <form
            onSubmit={handleReportIncident}
            className="bg-black/20 rounded-xl p-4 mb-5 flex flex-col gap-3 max-w-md"
          >
            <input
              type="text"
              placeholder="What happened?"
              required
              value={incidentTitle}
              onChange={(e) => setIncidentTitle(e.target.value)}
              className="rounded-md px-3 py-2 text-black"
            />
            <select
              value={incidentSeverity}
              onChange={(e) => setIncidentSeverity(e.target.value)}
              className="rounded-md px-3 py-2 text-black"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            <button
              type="submit"
              disabled={incidentSubmitting}
              className="bg-[#E46033] text-white font-semibold rounded-md px-4 py-2"
            >
              {incidentSubmitting ? "Submitting..." : "Submit report"}
            </button>
          </form>
        )}

        <p className="text-green-400 mb-5">
          • {loading ? "Loading bands..." : `Active Bands (${bands.length})`}
        </p>

        <div className="flex flex-wrap gap-6">
          {bands.map((band) => (
            <BandCard key={band._id || band.name} band={band} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
