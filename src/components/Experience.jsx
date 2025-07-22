import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ExperienceData from "../Data/Experience.json";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="p-2 flex flex-col justify-start mt-6 ">
      <p className="description-font-size font-bold border-b border-[var(--theme-accent)] w-full py-2">
        Real-World Experience
      </p>

      <div className="mt-4 space-y-2 relative">
        {ExperienceData.map((exp, index) => (
          <motion.div
            key={index}
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-glossy rounded-xl py-4 px-2"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b-1 border-theme-surface w-full py-1 pb-2">
              <p className="normal-font-size font-semibold">{exp.name}</p>
            </div>

            <div className="absolute top-2 right-3 metadata-font-size text-theme-secondary mt-1 flex items-center gap-2.5 max-sm:gap-1.5">
              <p className="bg-accent w-max p-1  rounded-md metadata-font-size text-theme">
                {exp.starting}
              </p>
              <p className="description-font-size font-bold"></p>
              <p className="bg-accent w-max p-1 rounded-md  metadata-font-size text-theme">
                {exp.ending}
              </p>
            </div>

            <p className="metadata-font-size text-theme-secondary mt-3 leading-relaxed">
              {exp.description}
            </p>

            <div className="metadata-font-size text-theme-secondary mt-2 sm:mt-2 flex justify-end gap-4  ">
              <p className="w-max text-theme font-medium ">{exp.role}</p>
              <p className="w-max text-theme font-medium">{exp.type}</p>
              <p className="w-max text-theme font-medium">{exp.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
