import React from "react";
import skillData from "../Data/TechSkill.json";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const TechSkills = () => {
  const skills = skillData;
 const ref = useRef(null);
        const isInView = useInView(ref, { once: true });
  return (
    <div className="p-2 flex flex-col justify-start mt-6 mb-6">
      <p className="description-font-size font-bold  border-b border-[var(--theme-accent)] w-full py-2">
        Tech Stack
      </p>

      <div className="flex flex-wrap mx-2 max-sm:mx-2 md:mx-40 justify-center   sm:justify-start gap-4 mt-4">
        {skills.map((skill,index) => (
          <motion.div   ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={skill.name}
            className="relative group bg-gray-800  p-3 rounded-md grid gird-cols w-max h-auto items-center justify-center  gap-2 "
          >
            <a href={skill.url} target="_blank" rel="noopener noreferrer " >
              <div className="hover:animate-bounce hover:scale-3d w-10  flex
              justify-center">
                {skill.image.startsWith("http") ? (
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-7 h-7 object-contain "
                  />
                ) : (
                  <i className={`${skill.image} tech-skill-size `}></i>
                )}
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 top-16 opacity-0 text-theme font-semibold group-hover:opacity-100 bg-accent text-white  rounded-md py-1 px-2 text-sm transition-all duration-300 whitespace-nowrap z-10 ">
                {skill.name}
              </span>
            </a>
          </motion.div>
        ))}
      </div>


    </div>
  );
};

export default TechSkills;
