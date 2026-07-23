import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Zap, Smile } from "lucide-react";

import safeMiningImg from "../assets/safe-mining-practice.webp";
import RealTimeMonitoring from "../assets/RealTimeMonitoring.jpg";
import fast from "../assets/fast.webp";
import confident from "../assets/confident.jpg";

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="min-h-screen flex flex-col justify-center px-4 py-10 sm:px-6 md:px-12 bg-gradient-to-br from-[#2f2116] via-[#8d603e] to-[#f9a15d] text-center text-[#FFF9F5]"
    >
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-[#E3A857]">
        Transform Workplace Safety
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        {[
          {
            Icon: ShieldCheck,
            title: "Reduction in Accidents",
            img: safeMiningImg,
            desc: "Our system helps minimize risks and prevent accidents by analyzing real-time safety data.",
          },
          {
            Icon: Clock,
            title: "Real-time Monitoring",
            img: RealTimeMonitoring,
            desc: "Track miner health and environmental conditions 24/7 with instant alerts.",
          },
          {
            Icon: Zap,
            title: "Faster Response Time",
            img: fast,
            desc: "Emergency teams are notified instantly, reducing average response time to 15 minutes.",
          },
          {
            Icon: Smile,
            title: "Worker Confidence",
            img: confident,
            desc: "Enhanced safety boosts worker trust, morale, and overall productivity.",
          },
        ].map(({ Icon, title, img, desc }, i) => (
          <motion.div
            key={`benefits-${i}`}
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 80, damping: 65 }}
            viewport={{ once: false }}
            className="rounded-2xl overflow-hidden shadow-md sm:shadow-lg md:shadow-xl bg-[#FFF9F5] text-[#2B2B2B] hover:shadow-orange-500/40 transition transform hover:-translate-y-1 sm:hover:-translate-y-2"
          >
            <div className="h-32 sm:h-36 md:h-40 w-full">
              <img src={img} alt={title} className="h-full w-full object-cover" />
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6">
              <Icon className="text-[#CC5500]" size={36} />
              <div className="text-left">
                <h4 className="text-lg sm:text-xl md:text-xl font-bold text-[#6F4E37] mb-1 sm:mb-2 md:mb-3">
                  {title}
                </h4>
                <p className="text-xs sm:text-sm md:text-sm text-[#2B2B2B] leading-snug">
                  {desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
