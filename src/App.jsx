import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect";
import CursorTrail from "./UI/CursorTrail";
import "../src/App.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2-second minimalist animation duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen relative bg-[var(--theme-bg)] overflow-x-clip flex flex-col justify-between">
      <CursorTrail />
      {/* Minimalist Creative Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] flex flex-col justify-center items-center bg-[var(--theme-bg)] overflow-hidden select-none"
          >
            <div className="flex flex-col items-center gap-4">
              {/* Expanding Spaced Typography */}
              <motion.h1
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.5em", opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-theme font-black text-xl sm:text-2xl uppercase tracking-[0.5em] text-center pl-[0.5em]"
              >
                KRUTARTH
              </motion.h1>

              {/* Minimalist Breathing Line Loader */}
              <div className="w-28 h-[1.5px] bg-[var(--theme-btn-border)] relative overflow-hidden rounded-full border border-[var(--theme-btn-border)]">
                <motion.div
                  className="absolute inset-y-0 bg-accent rounded-full"
                  initial={{ left: "0%", right: "100%" }}
                  animate={{
                    left: ["0%", "0%", "100%"],
                    right: ["100%", "0%", "0%"]
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ripple Effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <BackgroundRippleEffect />
      </div>

      {/* Main Single Page Content */}
      <main className="w-full flex-grow flex flex-col items-center">
        <Home />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
