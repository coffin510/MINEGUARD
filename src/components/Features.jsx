import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Activity,
  Thermometer,
  Cloud,
  Droplet,
  AlertTriangle,
} from "lucide-react";

export default function Features() {
  const [sectionKey, setSectionKey] = useState({ features: 0 });

  return (
    <section
      id="features"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-12 bg-gradient-to-br from-[#1e1e1e] via-[#2b2b2b] to-[#3a2a20] text-center"
    >
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-12 text-[#CC5500]">
        Features
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {[
          {
            Icon: Heart,
            title: "Heart Rate Monitoring",
            desc: "Continuously monitor miners' heart rates to detect fatigue or stress and ensure worker safety.",
          },
          {
            Icon: Activity,
            title: "SpO2 Levels",
            desc: "Measure blood oxygen saturation in real-time to prevent hypoxia in underground environments.",
          },
          {
            Icon: Thermometer,
            title: "Body Temperature",
            desc: "Detect abnormal body temperature to quickly identify health risks and prevent heat-related incidents.",
          },
          {
            Icon: Cloud,
            title: "Air Quality Index",
            desc: "Monitor levels of gases and particulates to maintain a safe and breathable environment in mines.",
          },
          {
            Icon: Droplet,
            title: "Humidity Level",
            desc: "Track humidity inside the mines to maintain optimal working conditions and prevent equipment damage.",
          },
          {
            Icon: AlertTriangle,
            title: "Hazard Alerts",
            desc: "Receive real-time notifications for gas leaks, high temperatures, or other mining hazards to ensure rapid response.",
          },
        ].map(({ Icon, title, desc }, i) => {
          const initialX = i < 3 ? -200 : 200; // first 3 slide from left, last 3 from right
          return (
            <motion.div
              key={`${sectionKey.features}-${i}`}
              initial={{ opacity: 0, x: initialX }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.2,
                type: "spring",
                stiffness: 80,
                damping: 65,
              }}
              viewport={{ once: false }}
              className="p-4 sm:p-5 md:p-6 rounded-2xl shadow-md sm:shadow-lg md:shadow-xl bg-[#FFF9F5] text-[#2B2B2B] 
                        hover:shadow-orange-500/40 transition transform hover:-translate-y-1 sm:hover:-translate-y-2"
            >
              <Icon className="mx-auto mb-3 sm:mb-4 md:mb-4 text-[#CC5500] w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12" />
              <h4 className="font-semibold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-3 text-[#6F4E37]">
                {title}
              </h4>
              <p className="text-sm sm:text-base md:text-base text-[#2B2B2B] leading-snug">
                {desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
