import React, { useState } from "react";
import { motion } from "framer-motion";
import ExperienceData from "../Data/Experience.json";
import { Globe, MapPin, Building2, Calendar } from "lucide-react";

const Experience = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleExperiences = showAll ? ExperienceData : ExperienceData.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col justify-center py-16 px-6 max-w-6xl mx-auto w-full select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column - Sticky Details */}
        <motion.div
          className="lg:col-span-5 sticky top-0 lg:top-16 z-40 flex flex-col gap-4 text-left pt-8 pb-20 -mt-8 -mx-6 px-6 mb-[40vh] lg:mb-0 lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:mt-0 bg-gradient-to-b from-[var(--theme-bg)] via-[var(--theme-bg)] via-75% to-transparent lg:bg-none"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">02 / Work History</span>
            <div className="h-px bg-accent/20 flex-1"></div>
          </div>
          <h2 className="title-font-size font-extrabold text-theme leading-none tracking-tight">
            Real-World Exp
          </h2>
          <p className="normal-font-size text-theme-secondary/80 font-medium leading-relaxed max-w-md mt-2">
            My professional journey working with tech companies, helping engineer scalable backend infrastructures, robust architectures, and interactive digital interfaces.
          </p>
        </motion.div>

        {/* Right Column - Experience List */}
        <div className="lg:col-span-7 flex flex-col gap-10 relative -mt-[40vh] lg:mt-0">
          {visibleExperiences.map((exp, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 6 }}
                className="premium-glow-card bg-glossy p-6 sm:p-8 flex flex-col justify-between group relative"
              >
                <div className="flex flex-col gap-4">
                  {/* Top Row: Role Title & Duration Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
                    <h3 className="text-xl font-extrabold text-theme tracking-tight group-hover:text-accent transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-full max-w-max shrink-0">
                      <Calendar className="w-3 h-3 text-theme-secondary opacity-60" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-theme-secondary">
                        {exp.starting} — {exp.ending}
                      </span>
                    </div>
                  </div>

                  {/* Subtitle Row: Company & Location */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-theme-secondary opacity-80 select-none">
                    <span className="text-accent font-extrabold">{exp.name}</span>
                    <span className="text-theme-secondary/30">•</span>
                    <span className="text-[11px] uppercase tracking-wider">{exp.type}</span>
                    <span className="text-theme-secondary/30">•</span>
                    <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider">
                      <MapPin className="w-3 h-3 opacity-60" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Job Description */}
                  <p className="text-sm text-theme-secondary/90 leading-relaxed pt-2">
                    {exp.description}
                  </p>
                </div>

                {/* Company Website Link */}
                <div className="mt-6 border-t border-[var(--theme-btn-border)] pt-4 select-none">
                  <a
                    href={exp.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent hover:text-theme transition-colors duration-300 group/link"
                  >
                    <span>Visit Website</span>
                    <Globe className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {ExperienceData.length > 2 && !showAll && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="more-btn px-8 py-3 bg-accent/20 rounded-full transition-all duration-300 font-bold uppercase tracking-widest text-[11px]"
          >
            More +
          </button>
        </div>
      )}
    </div>
  );
};

export default Experience;
