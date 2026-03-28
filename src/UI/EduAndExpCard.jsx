import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiTailwindCssFill,
  RiReactjsLine,
  RiJavascriptFill,
  RiHtml5Fill,
  RiCss3Fill,
  RiNodejsLine,
  RiGitMergeFill,
  RiGithubLine,
} from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { SiMongodb, SiExpress, SiPostman, SiTypescript, SiMongoose, SiJsonwebtokens, SiVercel, SiSwagger } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const EduAndExpCard = () => {
  const [activeTab, setActiveTab] = useState("Frontend");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const education = [
    {
      year: "2023 — 2026",
      degree: "B.Voc in IT & ITES",
      school: "Silver Oak University",
      score: "CGPA (3rd Year): 8.44"
    },
    {
      year: "2022 — 2023",
      degree: "12th Standard (Commerce)",
      school: "C.M. Vidyalaya School",
      score: "Percentile: 66.66%"
    },
    {
      year: "2019 — 2020",
      degree: "10th Standard",
      school: "C.M. Vidyalaya School",
      score: "Percentile: 89.39%"
    }
  ];

  const skillGroups = {
    Frontend: [
      { icon: <RiReactjsLine />, name: "React" },
      { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <RiTailwindCssFill />, name: "Tailwind" },
      { icon: <TbBrandFramerMotion />, name: "Framer" },
      { icon: <RiJavascriptFill />, name: "JavaScript" },
      { icon: <RiHtml5Fill />, name: "HTML5" }
    ],
    Backend: [
      { icon: <RiNodejsLine />, name: "Node.js" },
      { icon: <SiExpress />, name: "Express" },
      { icon: <SiMongodb />, name: "MongoDB" },
      { icon: <SiMongoose />, name: "Mongoose" },
      { icon: <SiJsonwebtokens />, name: "JWT" },
      { icon: <SiSwagger />, name: "APIs" }
    ],
    Tools: [
      { icon: <RiGitMergeFill />, name: "Git" },
      { icon: <RiGithubLine />, name: "GitHub" },
      { icon: <SiVercel />, name: "Vercel" },
      { icon: <VscVscode />, name: "VS Code" },
      { icon: <SiPostman />, name: "Postman" }
    ]
  };

  const getPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 150;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full flex flex-col gap-12 text-theme"
    >
      {/* Education Section */}
      <section className="w-full">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="description-font-size font-bold tracking-tight">Education</h2>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-xl bg-glossy border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-bold py-1 px-2 rounded-md bg-accent/10 text-accent uppercase tracking-tighter">
                  {edu.year}
                </span>
                <FaGraduationCap className="text-theme/20 group-hover:text-accent transition-colors duration-300" size={20} />
              </div>
              <h3 className="font-bold text-lg mb-1">{edu.degree}</h3>
              <p className="md:text-sm text-xs text-theme/60 mb-2">{edu.school}</p>
              <div className="md:text-sm text-xs font-medium text-theme/40">{edu.score}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expertise Section */}
      <section className="w-full overflow-visible">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="description-font-size font-bold tracking-tight">Expertise</h2>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 md:mb-5 mb-10 p-1 bg-white/5 w-max mx-auto rounded-xl border border-white/10">
          {Object.keys(skillGroups).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${activeTab === tab
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "text-theme/40 hover:text-theme/80 hover:bg-white/5"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Circular Display */}
        <div className="relative h-[280px] md:h-[420px] flex items-center justify-center">
          {/* Animated Glow in Background */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-48 h-48 bg-accent/10 rounded-full blur-[100px] animate-pulse"></div>
          </div>

          {/* SVG Connector Lines Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="-250 -250 500 500"
              preserveAspectRatio="xMidYMid meet"
            >
              <AnimatePresence mode="wait">
                <motion.g
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {skillGroups[activeTab].map((skill, index) => {
                    const total = skillGroups[activeTab].length;
                    const pos = getPosition(index, total);
                    const isHovered = hoveredSkill?.name === skill.name;
                    const someoneIsHovered = hoveredSkill !== null;

                    // Start the line away from center so it doesn't overlap text
                    const innerRadiusRatio = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.45 : 0.35;
                    const xStart = pos.x * innerRadiusRatio;
                    const yStart = pos.y * innerRadiusRatio;

                    return (
                      <motion.line
                        key={skill.name}
                        x1={xStart}
                        y1={yStart}
                        x2={pos.x}
                        y2={pos.y}
                        stroke="var(--theme-accent)"
                        strokeWidth={isHovered ? "2.5" : "1"}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: someoneIsHovered ? (isHovered ? 1 : 0) : 0.08,
                          stroke: isHovered ? "var(--theme-accent)" : "rgba(255,255,255,0.05)"
                        }}
                        transition={{
                          pathLength: { duration: 0.6, ease: "easeOut" },
                          opacity: { duration: 0.3 }
                        }}
                        strokeLinecap="round"
                      />
                    );
                  })}
                </motion.g>
              </AnimatePresence>
            </svg>
          </div>

          {/* Central Label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (hoveredSkill || "default")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="text-center z-10 pointer-events-none absolute"
            >
              <h3 className="text-2xl md:text-3xl font-black text-theme uppercase tracking-tighter opacity-10 leading-none">
                {hoveredSkill ? hoveredSkill.name : activeTab}
              </h3>
            </motion.div>
          </AnimatePresence>

          {/* Skill Orbit Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center overflow-visible"
            >
              {skillGroups[activeTab].map((skill, index) => {
                const isHovered = hoveredSkill?.name === skill.name;
                const someoneIsHovered = hoveredSkill !== null;
                const total = skillGroups[activeTab].length;
                const pos = getPosition(index, total);

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{
                      x: pos.x,
                      y: pos.y,
                      opacity: someoneIsHovered ? (isHovered ? 1 : 0.15) : 1,
                      scale: someoneIsHovered ? (isHovered ? 1.65 : 0.6) : 1,
                      zIndex: isHovered ? 50 : 10
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 18
                    }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="absolute cursor-pointer p-4 md:p-5 rounded-full bg-glossy border border-white/10 group shadow-lg"
                  >
                    <div className={`text-xl md:text-2xl transition-colors duration-300 ${isHovered ? 'text-accent' : 'text-theme group-hover:text-accent'}`}>
                      {skill.icon}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
};

export default EduAndExpCard;
