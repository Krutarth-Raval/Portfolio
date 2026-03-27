import { BiLinkExternal } from "react-icons/bi";
import { SiGithub } from "react-icons/si";
import projectData from "../Data/Projects.json";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

const AcademicProjects = () => {
  const projects = projectData;
  const skillLogos = {
    React:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Tailwind CSS":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1280px-Tailwind_CSS_Logo.svg.png",
    "Node.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    MongoDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "TMDB API": "https://img.icons8.com/?size=512&id=AxHFXpfUuWsm&format=png",
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    JavaScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "Custom JSON": "https://cdn-icons-png.flaticon.com/512/136/136525.png",

    "Express.js":
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1675637255386/f3a9a38b-116d-4b35-8f46-8d8abb78166f.png",

    "Next.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "TypeScript":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",

    "Drizzle ORM":
      "https://avatars.githubusercontent.com/u/108468352?v=4",

    "Better Auth":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKWK0MLkM5pzW-uULfdP5ynajXiuFm2GyqBA&s",

    Neon:
      "https://avatars.githubusercontent.com/u/77690634?s=200&v=4",

    PostgreSQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",

    Prisma:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",

    Clerk:
      "https://avatars.githubusercontent.com/u/49538330?s=200&v=4",

    Razorpay:
      "https://avatars.githubusercontent.com/u/7713209?s=200&v=4",

    "Gemini AI":
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",

  };

  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="p-2 flex flex-col justify-start mt-6">
      <p className="description-font-size font-bold  border-b border-[var(--theme-accent)] w-full py-2">
        Hands-on Experience
      </p>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6" ref={ref}>
        {visibleProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="relative h-full p-0 gap-0 overflow-hidden border border-white/5 bg-glossy shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-500 group rounded-3xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
                <div className="absolute inset-0 z-30 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                <img
                  src={project.image && project.image !== "" ? project.image : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"}
                  alt={project.name}
                  className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-t-3xl"
                />
              </div>

              <CardHeader className="p-6">
                <div className="flex justify-between items-center gap-4">
                  <CardTitle className="text-lg font-bold text-theme tracking-tight">
                    {project.name}
                  </CardTitle>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 btn-glossy rounded-xl transition-all text-theme-secondary hover:text-theme"
                      title="Github"
                    >
                      <SiGithub className="w-4 h-4" />
                    </a>
                    {project.live && project.live.trim() !== "" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 btn-glossy rounded-xl transition-all text-theme-secondary hover:text-theme"
                        title="Live Demo"
                      >
                        <BiLinkExternal className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={() => setSelectedProject(project)}
                    className="w-full cursor-pointer btn-glossy rounded-xl py-5 transition-all text-theme font-semibold tracking-wide hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] active:scale-[0.98]"
                  >
                    View Details
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Projects end */}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg pop-up-block rounded-xl relative shadow-2xl"
          >
            <Button
              onClick={() => setSelectedProject(null)}
              className="absolute top-[-15px] right-[-15px] z-50 h-6 w-6 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all cursor-pointer shadow-xl flex items-center justify-center px-1 py-2"
            >
              <span className="text-sm font-bold leading-none">✕</span>
            </Button>

            <div className="aspect-video w-full overflow-hidden bg-surface rounded-xl">
              <img
                src={selectedProject.image && selectedProject.image !== "" ? selectedProject.image : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"}
                alt={selectedProject.name}
                className="w-full h-full object-cover p-1 rounded-xl"
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-theme leading-tight">
                  {selectedProject.name}
                </h2>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 btn-glossy rounded-xl transition-all text-theme-secondary hover:text-theme"
                    title="Github"
                  >
                    <SiGithub className="w-4 h-4" />
                  </a>
                  {selectedProject.live && selectedProject.live.trim() !== "" && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 btn-glossy rounded-xl transition-all text-theme-secondary hover:text-theme"
                      title="Live Demo"
                    >
                      <BiLinkExternal className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="max-h-[25vh] overflow-y-auto pr-2 text-sm text-theme-secondary/90 leading-relaxed mb-6 scrollbar-thin">
                {selectedProject.description}
              </div>

              <div className="overflow-hidden pause-on-hover py-4 border-t border-white/10">
                <p className="text-[10px] text-theme-secondary opacity-50 uppercase tracking-[0.2em] font-bold mb-4">
                  Tech Stack
                </p>
                <div className="animate-marquee flex gap-4 w-max">
                  {[...selectedProject.techSkill, ...selectedProject.techSkill, ...selectedProject.techSkill, ...selectedProject.techSkill].map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 bg-theme border border-white/10 px-3 py-1.5 rounded-md shrink-0"
                    >
                      <img
                        src={skillLogos[skill]}
                        alt={skill}
                        className="h-4 w-4 object-contain"
                      />
                      <span className="text-[11px] text-theme opacity-80 uppercase tracking-wider font-bold">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {projects.length > 2 && !showAll && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="more-btn px-8 py-2.5 bg-accent/20 border border-[var(--theme-accent)] rounded-full hover:bg-[var(--theme-accent)] hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-[12px]"
          >
            More +
          </button>
        </div>
      )}
    </div>
  );
};

export default AcademicProjects;
