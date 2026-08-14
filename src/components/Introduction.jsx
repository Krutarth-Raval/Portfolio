import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShare2 } from "react-icons/fi";
import SocialLinks from "../UI/SocialLinks";

const roles = [
  "Full-Stack Engineer",
  "Building Scalable Web Apps",
  "Backend & API Architect",
  "Crafting User Experiences",
];

const Introduction = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 3200); // switch every 3.2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative w-full overflow-hidden select-none">
      
      {/* Share Button */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-50"
      >
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Krutarth Raval - Full-Stack Developer',
                url: window.location.href,
              }).catch(console.error);
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }
          }}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-theme-secondary hover:text-theme hover:bg-white/5 hover:border-white/20 transition-all shadow-xl backdrop-blur-md cursor-pointer"
        >
          <FiShare2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </motion.div>

      {/* Redesigned Auto-Sizing Animated Pill Badge */}
      <motion.div 
        layout
        className="relative h-10 bg-[var(--theme-btn-bg)] rounded-full px-6 py-2 mb-6 flex justify-center items-center overflow-hidden shadow-lg mx-auto max-w-[90vw]"
      >
        {/* Continuous Shimmer Sweep Animation */}
        <motion.div 
          animate={{ x: ["-200%", "300%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[var(--theme-text)] to-transparent opacity-[0.12] skew-x-12 pointer-events-none"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex items-center gap-2 text-theme-secondary font-black text-[9px] sm:text-xs uppercase tracking-widest whitespace-nowrap"
          >
            <span>{roles[currentIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Giant Responsive Name Banner */}
      <motion.h1
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl sm:text-7xl md:text-8xl lg:text-[9.5vw] font-black uppercase tracking-tighter select-none leading-none mb-3"
        style={{ color: "var(--theme-text)" }}
      >
        Krutarth Raval
      </motion.h1>

      {/* Social Links */}
      <div className="mt-2 scale-105 flex justify-center items-center">
        <SocialLinks />
      </div>
    </div>
  );
};

export default Introduction;
