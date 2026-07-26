import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiLinkExternal } from "react-icons/bi";
import { SiGithub } from "react-icons/si";
import projectData from "../Data/Projects.json";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

const AcademicProjects = () => {
  const projects = projectData;
  const skillLogos = {
    React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Tailwind CSS": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1280px-Tailwind_CSS_Logo.svg.png",
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "TMDB API": "https://img.icons8.com/?size=512&id=AxHFXpfUuWsm&format=png",
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "Custom JSON": "https://cdn-icons-png.flaticon.com/512/136/136525.png",
    "Express.js": "https://cdn.hashnode.com/res/hashnode/image/upload/v1675637255386/f3a9a38b-116d-4b35-8f46-8d8abb78166f.png",
    "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "Drizzle ORM": "https://avatars.githubusercontent.com/u/108468352?v=4",
    "Better Auth": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKWK0MLkM5pzW-uULfdP5ynajXiuFm2GyqBA&s",
    Neon: "https://avatars.githubusercontent.com/u/77690634?s=200&v=4",
    PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    Prisma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    Clerk: "https://avatars.githubusercontent.com/u/49538330?s=200&v=4",
    Razorpay: "https://avatars.githubusercontent.com/u/7713209?s=200&v=4",
    "Gemini AI": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    Laravel: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
    PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <div id="projects" className="lg:min-h-screen flex flex-col justify-center py-24 lg:py-16 px-6 max-w-7xl mx-auto w-full select-none">
      <div className="flex flex-col items-center w-full">
        {/* Centered Title Section Details */}
        <motion.div
          className="flex flex-col items-center justify-center text-center w-full mb-12 md:mb-20 z-40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-theme leading-none tracking-tight">
            My Projects
          </h2>
        </motion.div>

        {/* Project List */}
        <div className="w-full flex flex-col">
          {projects.map((project, index) => {
            return (
              <div
                key={index}
                className="group relative cursor-pointer border-t border-b border-[var(--theme-btn-border)] -mt-px py-10 md:py-14 transition-all duration-500 hover:bg-surface/30 rounded-none"
                onClick={() => setSelectedProject(project)}
                style={{ "--hover-color": project.color || "var(--theme-accent)" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4 transition-all duration-500"
                >
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-4xl font-extrabold text-theme tracking-tight group-hover:text-[var(--hover-color)] transition-colors duration-300">
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {project.techSkill && project.techSkill.slice(0, 4).map((skill, i) => (
                        <span key={i} className="flex items-center text-[10px] md:text-xs text-theme-secondary opacity-80 uppercase tracking-widest font-bold">
                          {skill}{i < 3 && i < project.techSkill.length - 1 ? <span className="mx-2 text-accent/50">•</span> : ''}
                        </span>
                      ))}
                      {project.techSkill && project.techSkill.length > 4 && (
                        <span className="flex items-center text-[10px] md:text-xs text-theme-secondary opacity-80 uppercase tracking-widest font-bold">
                          <span className="mx-2 text-accent/50">•</span>+{project.techSkill.length - 4} MORE
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 relative z-10 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-surface border border-[var(--theme-btn-border)] rounded-full transition-all text-theme-secondary hover:text-theme hover:scale-110 active:scale-95 shadow-sm hover:shadow-accent/20"
                        title="Github"
                      >
                        <SiGithub className="w-5 h-5" />
                      </a>
                      {project.live && project.live.trim() !== "" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-surface border border-[var(--theme-btn-border)] rounded-full transition-all text-theme-secondary hover:text-theme hover:scale-110 active:scale-95 shadow-sm hover:shadow-accent/20"
                          title="Live Demo"
                        >
                          <BiLinkExternal className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <div className="md:hidden text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      Details
                      <span className="text-lg leading-none">→</span>
                    </div>
                  </div>
                </motion.div>


              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] w-full h-full overflow-hidden pointer-events-auto">
            {/* The shrinking full-screen content */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={
                isClosing 
                  ? { scale: 0, opacity: 0, rotate: -90, x: "50vw", y: "-50vh" } 
                  : { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: isClosing ? 0.7 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full bg-[var(--theme-bg)] flex flex-col-reverse md:flex-row shadow-2xl"
            >
              {/* Left Side: Information (Bottom on mobile) */}
              <div className="w-full flex-1 md:flex-none md:w-[40%] md:h-full p-6 pt-4 md:p-12 lg:p-16 flex flex-col overflow-y-auto no-scrollbar relative z-10 bg-[var(--theme-bg)]/80 backdrop-blur-2xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-theme leading-tight mb-4 md:mb-8">
                  {selectedProject.name}
                </h2>

                <div className="flex flex-wrap gap-2 md:gap-4 shrink-0 mb-6 md:mb-10">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-4 bg-surface border border-[var(--theme-btn-border)] rounded-full transition-all text-theme hover:bg-[var(--theme-accent)] hover:border-transparent hover:text-white"
                  >
                    <SiGithub className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="font-bold tracking-wider uppercase text-[10px] md:text-xs">GitHub Repository</span>
                  </a>
                  {selectedProject.live && selectedProject.live.trim() !== "" && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-4 bg-surface border border-[var(--theme-btn-border)] rounded-full transition-all text-theme hover:bg-[var(--theme-accent)] hover:border-transparent hover:text-white"
                    >
                      <BiLinkExternal className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="font-bold tracking-wider uppercase text-[10px] md:text-xs">Live Demo</span>
                    </a>
                  )}
                </div>

                <div className="text-base sm:text-lg md:text-xl text-theme-secondary/90 leading-relaxed mb-6 md:mb-12 max-w-3xl">
                  {selectedProject.description}
                </div>

                <div className="border-t border-[var(--theme-btn-border)] pt-6 md:pt-8 mt-auto">
                  <p className="text-[10px] md:text-xs text-theme-secondary opacity-50 uppercase tracking-[0.3em] font-bold mb-4 md:mb-6">
                    Technologies Used
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {selectedProject.techSkill.map((skill, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-[var(--theme-btn-bg)] backdrop-blur-md border border-[var(--theme-btn-border)] px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl"
                      >
                        {skillLogos[skill] && (
                          <img
                            src={skillLogos[skill]}
                            alt={skill}
                            className="h-4 w-4 md:h-5 md:w-5 object-contain"
                          />
                        )}
                        <span className="text-[10px] md:text-xs text-theme opacity-90 uppercase tracking-widest font-bold">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Image Banner (Top on mobile) */}
              <div className="w-full h-auto md:w-[60%] md:h-full relative overflow-hidden bg-[var(--theme-bg)] flex-shrink-0 flex items-center justify-center p-6 pt-20 pb-4 md:p-8">
                <img
                   src={selectedProject.image && selectedProject.image !== "" ? selectedProject.image : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"}
                   alt={selectedProject.name}
                   className="max-w-full max-h-[35vh] md:max-h-full object-contain rounded-2xl md:rounded-3xl border border-[var(--theme-btn-border)] shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Close Button - Acts as the black hole singularity */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isClosing 
                  ? { rotate: 1080, scale: [1, 4, 0], backgroundColor: "black", color: "transparent", borderColor: "transparent" } 
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: isClosing ? 0.8 : 0.3, ease: "easeInOut" }}
              onClick={() => {
                setIsClosing(true);
                setTimeout(() => { setSelectedProject(null); setIsClosing(false); }, 750);
              }}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] h-12 w-12 md:h-16 md:w-16 bg-black/50 hover:bg-red-600 backdrop-blur-md border border-white/20 text-white rounded-full transition-colors cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center font-bold text-xl md:text-2xl"
            >
              {!isClosing && "✕"}
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AcademicProjects;
