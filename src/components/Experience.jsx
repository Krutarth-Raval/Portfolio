import React, { useState } from "react";
import { motion } from "framer-motion";
import ExperienceData from "../Data/Experience.json";
import { Globe, MapPin, Building2, Calendar } from "lucide-react";

const Experience = () => {
  const visibleExperiences = ExperienceData;

  return (
    <div className="lg:min-h-screen flex flex-col justify-center py-24 lg:py-16 px-6 max-w-7xl mx-auto w-full select-none">
      <div className="flex flex-col items-center w-full">
        {/* Centered Title Section */}
        <motion.div
          className="flex flex-col items-center justify-center text-center w-full mb-12 md:mb-20 z-40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-theme leading-none tracking-tight">
            Real-World Exp
          </h2>
        </motion.div>

        {/* Experience List */}
        <div className="w-full flex flex-col">
          {visibleExperiences.map((exp, index) => {
            return (
              <div
                key={index}
                className="group relative border-t border-b border-[var(--theme-btn-border)] -mt-px py-10 md:py-14 transition-all duration-500 hover:bg-surface/30 rounded-none"
                style={{ "--hover-color": exp.color || "var(--theme-accent)" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="flex flex-col w-full gap-6 px-4 transition-all duration-500"
                >
                  <div className="flex-1 w-full">
                    {/* Top Row: Role Title */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none w-full">
                        <h3 className="text-2xl md:text-4xl font-extrabold text-theme tracking-tight group-hover:text-[var(--hover-color)] transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-full max-w-max shrink-0 self-start sm:self-center">
                          <Calendar className="w-4 h-4 text-[var(--hover-color)] transition-colors duration-300" />
                          <span className="text-[10px] font-black uppercase tracking-wider text-theme">
                            {exp.starting} — {exp.ending}
                          </span>
                        </div>
                      </div>

                      {/* Subtitle Row: Company & Location */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-theme-secondary opacity-90 select-none mt-2">
                        <span className="text-[var(--hover-color)] font-extrabold text-sm uppercase tracking-widest transition-colors duration-300">{exp.name}</span>
                        <span className="text-[var(--theme-btn-border)]">•</span>
                        <span className="text-[11px] uppercase tracking-wider">{exp.type}</span>
                        <span className="text-[var(--theme-btn-border)]">•</span>
                        <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          <MapPin className="w-3.5 h-3.5 opacity-80" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Job Description */}
                      <p className="text-sm md:text-base text-theme-secondary/80 leading-relaxed pt-4 max-w-4xl">
                        {exp.description}
                      </p>

                      {/* Company Website Link */}
                      <div className="flex items-center shrink-0 relative z-10 mt-4 md:mt-6" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={exp.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-surface border border-[var(--theme-btn-border)] rounded-full transition-all text-theme-secondary hover:text-[var(--hover-color)] hover:border-[var(--hover-color)] shadow-sm group/link w-max"
                        >
                          <span className="font-bold tracking-wider uppercase text-xs">Website</span>
                          <Globe className="w-4 h-4 transition-transform duration-300 group-hover/link:rotate-12" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
