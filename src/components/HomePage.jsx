// src/components/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Team from "./Team"; 
import Features from "./Features";
import Benefits from "./Benefits";
import Integration from "./Integration";
import {
  Heart,
  Activity,
  Thermometer,
  Cloud,
  AlertTriangle,
  Droplet,
  ShieldCheck,
  Clock,
  Zap,
  Smile,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo (2).png";
import bgvdo from "../assets/bgvideo.mp4"

export default function HomePage() {
  const [sectionKey, setSectionKey] = useState({
    features: 0,
    benefits: 0,
    integration: 0,
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    setSectionKey((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-[#FAF3E0] bg-[#2B2B2B] scroll-smooth">
      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-8 py-4 shadow-lg bg-[#2c1c0f] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Project Logo"
            className="h-24 w-40 sm:h-14 sm:w-14 scale-150"
          />
          <h1 className="text-2xl font-bold text-[#E3A857]">MineGuard</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xl font-bold">
          <button
            onClick={() => handleNavClick("features")}
            className="hover:text-[#CC5500] transition"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("benefits")}
            className="hover:text-[#CC5500] transition"
          >
            Benefits
          </button>
          <button
            onClick={() => handleNavClick("integration")}
            className="hover:text-[#CC5500] transition"
          >
            Integration
          </button>
          <Link
  to="/login"
  className="px-4 py-2 bg-[#CC5500] text-[#FFF9F5] font-semibold rounded-lg hover:bg-[#E3A857] transition"
>
  Enter Dashboard
</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#FAF3E0]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full right-0 left-0 bg-[#6F4E37] flex flex-col items-center space-y-4 py-6 shadow-lg z-50"
            >
              <button
                onClick={() => handleNavClick("features")}
                className="text-lg hover:text-[#CC5500] transition"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick("benefits")}
                className="text-lg hover:text-[#CC5500] transition"
              >
                Benefits
              </button>
              <button
                onClick={() => handleNavClick("integration")}
                className="text-lg hover:text-[#CC5500] transition"
              >
                Integration
              </button>
            <Link
              to="/login"
              className="px-4 py-2 bg-[#CC5500] text-[#FFF9F5] font-semibold rounded-lg hover:bg-[#E3A857] transition"
            >
              Enter Dashboard
            </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
<section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12">
  {/* Background Video */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    src={bgvdo}
    autoPlay
    loop
    muted
  />

   <div className="absolute inset-0 bg-gradient-to-br from-[#f94200]/20 via-[#e87b4d]/20 to-[#ff4101]/20"></div>
    <div className="absolute inset-0 bg-black/30"></div>


  {/* Content */}
  <div className="relative z-10 text-[#FAF3E0] flex flex-col items-center px-4 md:px-0">
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
      Safe Mines, Warm Futures
    </h2>
    <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl">
      Harnessing IoT & AI for safety, trust, and efficiency underground
    </p>
    <Link
  to="/login"
  className="px-4 py-2 bg-[#CC5500] text-[#FFF9F5] font-semibold rounded-lg hover:bg-[#E3A857] transition"
>
  Enter Dashboard
</Link>

  </div>
</section>


      {/* Features Section */}
      <div>
    
      <Features sectionKey={sectionKey} />
      </div>

      {/* Benefits Section */}
      <div>
      <Benefits sectionKey={sectionKey} />
      </div>

      {/* Integration Section */}
      <div>
      <Integration sectionKey={sectionKey} />
      </div>

      {/* How It Works Section */} 
      <section
  id="how-it-works"
  className="flex flex-col justify-center px-4 py-10 sm:px-6 md:px-12 bg-[#6F4E37] text-center text-[#FFF9F5]"
>
  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-[#E3A857] drop-shadow-lg">
    How It Works
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10 max-w-6xl mx-auto relative">
    {[
      {
        step: "01",
        title: "Data Collection",
        desc: "IoT sensors track air quality, health, and environmental conditions underground.",
        icon: Cloud,
      },
      {
        step: "02",
        title: "Cloud Processing",
        desc: "Collected data is securely transmitted to the cloud for analysis and storage.",
        icon: Activity,
      },
      {
        step: "03",
        title: "AI Analysis",
        desc: "AI models detect risks, predict hazards, and trigger safety alerts in real time.",
        icon: AlertTriangle,
      },
      {
        step: "04",
        title: "Action & Alerts",
        desc: "Supervisors and miners receive instant alerts on dashboards and devices.",
        icon: Zap,
      },
    ].map(({ step, title, desc, icon: Icon }, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: i * 0.2,
          type: "spring",
          stiffness: 80,
          damping: 65,
        }}
        viewport={{ once: false }}
        className="p-4 sm:p-6 md:p-8 rounded-2xl shadow-md sm:shadow-lg md:shadow-xl bg-[#FFF9F5] text-[#2B2B2B] hover:shadow-orange-500/40 transition transform hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col items-center relative"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#E3A857] text-[#2B2B2B] font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-5 md:mb-6 shadow-md">
          {step}
        </div>

        <Icon className="mb-3 sm:mb-4 md:mb-5 text-[#CC5500]" size={36} sm={40} md={50} />

        <h4 className="font-semibold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4 text-[#6F4E37]">
          {title}
        </h4>

        <p className="text-xs sm:text-sm md:text-sm text-[#2B2B2B] leading-snug">
          {desc}
        </p>

        {i < 3 && (
          <div className="hidden md:block absolute top-1/2 right-[-30px] transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-[#E3A857]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </motion.div>
    ))}
  </div>
</section>

      {/* Team Section */}
      <Team />

      {/* Footer */}
      <footer className="py-6 text-center bg-[#614531] text-[#FAF3E0]">
        © 2025 Smart Mines Safety System. All rights reserved.
      </footer>
    </div>
  );
}
