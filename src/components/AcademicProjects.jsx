
import { BiLinkExternal } from "react-icons/bi";
import { SiGithub } from "react-icons/si";
import projectData from "../Data/Projects.json";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AcademicProjects = () => {
  const projects = projectData;
  const skillLogos = {
    React:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Tailwind CSS": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png",
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
  };

  return (
    <div className="p-2 flex flex-col justify-start mt-6">
      <p className="description-font-size font-bold  border-b border-[var(--theme-accent)] w-full py-2">
        Hands-on Experience
      </p>

      {/* Project List */}
      {projects.map((project, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });

        return (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mt-5 bg-accent p-2 rounded-md relative"
            key={index}
          >
            <div className="absolute right-2 top-3.5 flex justify-end gap-5 max-sm:gap-3 items-center">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="metadata-font-size flex flex-row justify-center items-center gap-2 max-sm:gap-1 hover:text-theme-accent bg-surface p-1 rounded-md"
              >
                GitHub <SiGithub />
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="metadata-font-size flex flex-row justify-center items-center gap-2 max-sm:gap-1 hover:text-theme-accent bg-surface p-1 rounded-md cursor-pointer"
              >
                View <BiLinkExternal />
              </a>
            </div>

            <p className="normal-font-size py-2 max-sm:py-1 font-semibold">
              {project.name}
            </p>
            <p className="metadata-font-size text-theme-secondary mt-2">
              {project.description}
            </p>

            <motion.div
              className="w-full mt-4 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.techSkill.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center h-auto justify-center bg-surface p-1 rounded group "
                >
                  <img
                    src={skillLogos[skill]}
                    alt={skill}
                    className="h-8 w-8 object-contain p-1 "
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AcademicProjects;
