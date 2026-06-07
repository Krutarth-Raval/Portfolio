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

  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

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
    <div id="projects" className="min-h-screen flex flex-col justify-center py-16 px-6 max-w-6xl mx-auto w-full select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column - Sticky Section Details */}
        <motion.div
          className="lg:col-span-5 sticky top-0 lg:top-16 z-40 flex flex-col gap-4 text-left pt-8 pb-20 -mt-8 -mx-6 px-6 mb-[40vh] lg:mb-0 lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:mt-0 bg-gradient-to-b from-[var(--theme-bg)] via-[var(--theme-bg)] via-75% to-transparent lg:bg-none"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">01 / Featured Projects</span>
            <div className="h-px bg-accent/20 flex-1"></div>
          </div>
          <h2 className="title-font-size font-extrabold text-theme leading-none tracking-tight">
            My Projects
          </h2>
          <p className="normal-font-size text-theme-secondary/80 font-medium leading-relaxed max-w-md mt-2">
            A selection of modern web applications and solutions built with performance, responsive design, and robust code architectures in mind.
          </p>
        </motion.div>

        {/* Right Column - Project List */}
        <div className="lg:col-span-7 flex flex-col gap-10 -mt-[40vh] lg:mt-0">
          {visibleProjects.map((project, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="premium-glow-card bg-glossy group shadow-2xl relative"
              >

                <div
                  className="relative aspect-video w-full overflow-hidden cursor-crosshair border-b border-[var(--theme-btn-border)]"
                  onMouseMove={(e) => {
                    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - left) / width) * 100;
                    const y = ((e.clientY - top) / height) * 100;
                    e.currentTarget.style.setProperty("--x", `${x}%`);
                    e.currentTarget.style.setProperty("--y", `${y}%`);
                  }}
                >
                  <div className="absolute inset-0 z-30 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
                  <img
                    src={project.image && project.image !== "" ? project.image : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"}
                    alt={project.name}
                    style={{ transformOrigin: "var(--x, center) var(--y, center)" }}
                    className="relative z-10 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                <CardHeader className="p-8">
                  <div className="flex justify-between items-center gap-4">
                    <CardTitle className="text-xl font-bold text-theme tracking-tight group-hover:text-accent transition-colors duration-300">
                      {project.name}
                    </CardTitle>
                    <div className="flex gap-2 shrink-0 z-40">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 btn-glossy rounded-xl transition-all text-theme-secondary hover:text-theme hover:scale-105 active:scale-95"
                        title="Github"
                      >
                        <SiGithub className="w-5 h-5" />
                      </a>
                      {project.live && project.live.trim() !== "" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 btn-glossy rounded-xl transition-all text-theme-secondary hover:text-theme hover:scale-105 active:scale-95"
                          title="Live Demo"
                        >
                          <BiLinkExternal className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button
                      onClick={() => setSelectedProject(project)}
                      className="w-full cursor-pointer btn-glossy rounded-xl py-5 transition-all text-theme font-bold tracking-wide hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-[0.98]"
                    >
                      View Details
                    </Button>
                  </div>
                </CardHeader>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="w-full max-w-lg pop-up-block rounded-3xl relative shadow-2xl overflow-hidden"
            >
              <Button
                onClick={() => setSelectedProject(null)}
                className="absolute top-[12px] right-[12px] z-50 h-8 w-8 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all cursor-pointer shadow-xl flex items-center justify-center font-bold"
              >
                ✕
              </Button>

              <div
                className="aspect-video w-full overflow-hidden bg-surface relative group cursor-crosshair"
                onMouseMove={(e) => {
                  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - left) / width) * 100;
                  const y = ((e.clientY - top) / height) * 100;
                  e.currentTarget.style.setProperty("--x", `${x}%`);
                  e.currentTarget.style.setProperty("--y", `${y}%`);
                }}
              >
                <img
                  src={selectedProject.image && selectedProject.image !== "" ? selectedProject.image : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"}
                  alt={selectedProject.name}
                  style={{ transformOrigin: "var(--x, center) var(--y, center)" }}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.8]"
                />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-theme leading-tight">
                    {selectedProject.name}
                  </h2>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 btn-glossy rounded-xl transition-all text-theme-secondary hover:text-theme"
                      title="Github"
                    >
                      <SiGithub className="w-5 h-5" />
                    </a>
                    {selectedProject.live && selectedProject.live.trim() !== "" && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 btn-glossy rounded-xl transition-all text-theme-secondary hover:text-theme"
                        title="Live Demo"
                      >
                        <BiLinkExternal className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="max-h-[20vh] overflow-y-auto pr-2 text-sm text-theme-secondary leading-relaxed mb-6 scrollbar-thin">
                  {selectedProject.description}
                </div>

                <div className="overflow-hidden pause-on-hover py-4 border-t border-[var(--theme-btn-border)]">
                  <p className="text-[10px] text-theme-secondary opacity-50 uppercase tracking-[0.2em] font-bold mb-3">
                    Tech Stack
                  </p>
                  <div className="animate-marquee flex gap-4 w-max">
                    {[...selectedProject.techSkill, ...selectedProject.techSkill, ...selectedProject.techSkill].map((skill, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] px-3 py-1.5 rounded-lg shrink-0"
                      >
                        {skillLogos[skill] && (
                          <img
                            src={skillLogos[skill]}
                            alt={skill}
                            className="h-4 w-4 object-contain"
                          />
                        )}
                        <span className="text-[10px] text-theme opacity-80 uppercase tracking-wider font-bold">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {projects.length > 2 && !showAll && (
        <div className="text-center md:ml-[44%] mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="more-btn px-8 py-3 bg-accent/20 rounded-full hover:bg-[var(--theme-accent)] hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-[11px]"
          >
            More +
          </button>
        </div>
      )}
    </div>
  );
};

export default AcademicProjects;
