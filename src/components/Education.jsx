import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, Building2 } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor of Vocation in IT & IT Enabled Services",
    institution: "Silver Oak University",
    location: "Ahmedabad, India",
    duration: "2023 — 2026",
    score: "8.48 CGPA",
    color: "#8b5cf6"
  },
  {
    degree: "12th Standard (Commerce)",
    institution: "C.M. Vidhyalaya",
    location: "Palitana, India",
    duration: "2023",
    score: "66.66%",
    color: "#3b82f6"
  }
];

const Education = () => {
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
            Education
          </h2>
        </motion.div>

        {/* Education List */}
        <div className="w-full flex flex-col">
          {educationData.map((edu, index) => {
            return (
              <div
                key={index}
                className="group relative border-t border-b border-[var(--theme-btn-border)] -mt-px py-10 md:py-14 transition-all duration-500 hover:bg-surface/30 rounded-none"
                style={{ "--hover-color": edu.color }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="flex flex-col w-full gap-6 px-4 transition-all duration-500"
                >
                  <div className="flex-1 w-full">
                    {/* Top Row: Degree Title */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none w-full">
                        <h3 className="text-2xl md:text-4xl font-extrabold text-theme tracking-tight group-hover:text-[var(--hover-color)] transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-full max-w-max shrink-0 self-start sm:self-center">
                          <Calendar className="w-4 h-4 text-[var(--hover-color)] transition-colors duration-300" />
                          <span className="text-[10px] font-black uppercase tracking-wider text-theme">
                            {edu.duration}
                          </span>
                        </div>
                      </div>

                      {/* Subtitle Row: Institution, Score, Location */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-theme-secondary opacity-90 select-none mt-2">
                        <div className="flex items-center gap-1.5 text-[var(--hover-color)] font-extrabold text-sm uppercase tracking-widest transition-colors duration-300">
                           <Building2 className="w-4 h-4" />
                           <span>{edu.institution}</span>
                        </div>
                        <span className="text-[var(--theme-btn-border)] md:block hidden">•</span>
                        
                        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                          <Award className="w-4 h-4 opacity-80" />
                          <span>{edu.score}</span>
                        </div>
                        <span className="text-[var(--theme-btn-border)] hidden md:block">•</span>
                        
                        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                          <GraduationCap className="w-4 h-4 opacity-80" />
                          <span>{edu.location}</span>
                        </div>
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

export default Education;
