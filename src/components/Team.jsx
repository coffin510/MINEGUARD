import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TeamSection() {
  const team = [
    { name: "Apurba Sahu", role: "Project Manager", image: "/team/aprba.jpg" },
    { name: "Dimpal Nayak", role: "Lead Developer", image: "/team/dimpal.jpg" },
    { name: "Ashutosh Sahu", role: "UI/UX Designer", image: "/team/ashutosh.jpg" },
    { name: "Liza Giri", role: "Backend Developer", image: "/team/liza.jpg" },
    { name: "Shaik Sadiq Bux", role: "Frontend Developer", image: "/team/shaik.jpg" },
  ];

  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % team.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + team.length) % team.length);

  const getPosition = (i) => {
    const diff = (i - index + team.length) % team.length;
    if (diff === 0) return { x: 0, scale: 1.2, z: 50, opacity: 1, blur: 0 };
    if (diff === 1) return { x: 250, scale: 0.9, z: 0, opacity: 0.6, blur: 2 };
    if (diff === team.length - 1) return { x: -250, scale: 0.9, z: 0, opacity: 0.6, blur: 2 };
    return { x: 0, scale: 0.8, z: -100, opacity: 0, blur: 4 };
  };

  return (
    <section
      id="team"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gradient-to-b from-[#1E1E1E] to-[#2B2B2B] text-[#FAF3E0] overflow-hidden"
    >
      <h3 className="text-4xl md:text-5xl font-bold mb-4 text-[#CC5500] tracking-wide">
        Meet Our Team
      </h3>
      <p className="text-[#E3A857] mb-10 text-lg">
        The people driving innovation and excellence.
      </p>

      <div className="relative w-full max-w-6xl flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 bg-[#CC5500] text-white p-3 rounded-full hover:bg-[#E3A857] transition"
        >
          <ChevronLeft size={30} />
        </button>

        {/* Carousel with perspective */}
        <div
          className="relative w-[700px] h-[420px] md:w-[900px] flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {team.map((member, i) => {
            const { x, scale, z, opacity, blur } = getPosition(i);
            const isCenter = x === 0;

            return (
              <motion.div
                key={member.name}
                animate={{
                  x,
                  scale,
                  z,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className={`absolute flex flex-col items-center justify-center bg-[#3A3A3A]/80 rounded-2xl p-6 md:p-8 shadow-xl ${
                  isCenter
                    ? "border-2 border-[#CC5500] shadow-[0_0_35px_#CC5500]/70 z-20"
                    : "z-10"
                }`}
                style={{
                  width: isCenter ? 280 : 220,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className={`rounded-full mb-4 object-cover ${
                    isCenter ? "w-36 h-36 md:w-44 md:h-44" : "w-24 h-24 md:w-28 md:h-28"
                  }`}
                  animate={{
                    rotateY: isCenter ? 0 : 15,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <h4
                  className={`font-semibold text-[#E3A857] ${
                    isCenter ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                  }`}
                >
                  {member.name}
                </h4>
                <p
                  className={`text-[#FAF3E0] ${
                    isCenter ? "text-base md:text-lg" : "text-sm md:text-base"
                  }`}
                >
                  {member.role}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-20 bg-[#CC5500] text-white p-3 rounded-full hover:bg-[#E3A857] transition"
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-10 space-x-2">
        {team.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-[#CC5500] scale-125" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
