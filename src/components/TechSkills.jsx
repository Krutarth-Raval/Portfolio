import React from "react";
import skillData from "../Data/TechSkill.json";
import { motion } from "framer-motion";

const TechSkills = () => {
  return (
    <div className="p-2 flex flex-col justify-start mt-10 mb-20 overflow-visible">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="description-font-size font-bold tracking-tight">Tech Stacks</h2>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 sm:gap-3 lg:gap-4">
        {skillData.map((skill, index) => (
          <motion.a
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            whileHover={{
              scale: 1.1,
              zIndex: 30
            }}
            className="group relative flex items-center justify-center aspect-square btn-glossy rounded-xl sm:rounded-[20px] p-1.5 transition-all duration-300 hover:shadow-lg hover:border-[var(--theme-accent)]/50 cursor-pointer"
          >
            {/* Simple Glow on Hover */}
            <div className="absolute inset-0 bg-[var(--theme-accent)]/5 opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-[20px] transition-opacity" />

            <div className="relative flex items-center justify-center w-full h-full">
              <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                {skill.image.startsWith("http") ? (
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <i className={`${skill.image} text-lg sm:text-2xl text-theme-secondary group-hover:text-theme transition-colors`}></i>
                )}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default TechSkills;
