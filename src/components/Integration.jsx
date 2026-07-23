import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, Zap, CheckCircle } from "lucide-react";

export default function Integration({ sectionKey }) {
  return (
    <section
      id="integration"
      className="min-h-screen flex flex-col justify-center px-4 py-10 sm:px-6 md:px-12 text-center bg-gradient-to-br from-[#1e1e1e] via-[#2b2b2b] to-[#3a2a20]"
    >
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-[#E3A857] drop-shadow-lg">
        Integration Made Easy
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10 max-w-6xl mx-auto">
        {[
          { title: "Seamless Integration", desc: "SAFE-T works smoothly with your existing safety systems and protocols.", icon: ShieldCheck },
          { title: "Enterprise Ready", desc: "Fully compatible with leading enterprise safety management platforms.", icon: Activity },
          { title: "Quick Setup", desc: "Deploy across your workforce in under 48 hours with minimal downtime.", icon: Zap },
          { title: "Certified", desc: "Meets international safety and compliance standards for trusted operations.", icon: CheckCircle },
        ].map(({ title, desc, icon: Icon }, i) => (
          <motion.div
            key={`${sectionKey.integration}-${i}`}
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 80, damping: 65 }}
            viewport={{ once: false }}
            className="p-4 sm:p-6 md:p-10 rounded-2xl shadow-md sm:shadow-lg md:shadow-xl bg-[#FFF9F5] text-[#2B2B2B] hover:shadow-orange-500/40 transition transform hover:-translate-y-1 sm:hover:-translate-y-2"
          >
            <Icon className="mx-auto mb-3 sm:mb-4 md:mb-6 text-[#CC5500] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
            <h4 className="font-semibold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4 text-[#6F4E37]">
              {title}
            </h4>
            <p className="text-xs sm:text-sm md:text-base text-[#2B2B2B] leading-snug">
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
