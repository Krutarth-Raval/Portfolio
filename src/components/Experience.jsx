import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ExperienceData from "../Data/Experience.json";
import { Globe, MapPin, Building2, Calendar, X } from "lucide-react";
import { Button } from "./ui/button";

const Experience = () => {
  const [selectedExp, setSelectedExp] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const visibleExperiences = showAll ? ExperienceData : ExperienceData.slice(0, 2);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedExp]);

  return (
    <div className="p-2 flex flex-col justify-start mt-6 mb-20">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="description-font-size font-bold tracking-tight">Real-World Experience</h2>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>


      {/* Experience List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" ref={ref}>
        {visibleExperiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-glossy p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pl-1">
                <div className="btn-glossy p-2 rounded-xl shadow-inner group-hover:bg-[var(--theme-accent)]/20 transition-colors">
                  <Building2 className="w-5 h-5 text-theme-secondary" />
                </div>
                <h3 className="text-xl font-bold text-theme tracking-tight truncate">{exp.name}</h3>
              </div>

              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] shrink-0 mt-1.5" />
                  <p className="text-theme-secondary text-[11px] font-bold uppercase tracking-widest break-words leading-relaxed">{exp.role}</p>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 btn-glossy rounded-lg shrink-0">
                  <Calendar className="w-3 h-3 text-theme-secondary opacity-50" />
                  <span className="text-[10px] font-bold text-theme-secondary tracking-wide uppercase whitespace-nowrap">{exp.starting} — {exp.ending}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setSelectedExp(exp)}
              className="w-full mt-2 cursor-pointer btn-glossy rounded-xl py-4 transition-all text-theme font-medium text-sm"
            >
              View Details
            </Button>
          </motion.div>
        ))}
      </div>

      {ExperienceData.length > 2 && !showAll && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="more-btn px-8 py-2.5 bg-accent/20 border border-[var(--theme-accent)] rounded-full hover:bg-[var(--theme-accent)] hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-[12px]"
          >
            More +
          </button>
        </div>
      )}

      {/* Experience Pop-up Modal */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="w-full max-w-lg pop-up-block rounded-2xl relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-[-12px] right-[-12px] z-50 h-6 w-6 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all cursor-pointer shadow-xl flex items-center justify-center px-1 py-2"
              >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-theme">
                    {selectedExp.name}
                  </h2>
                  <span className="text-[12px] bg-[var(--theme-accent)]/20 px-3 py-1 rounded-full text-theme border border-[var(--theme-accent)]/40">
                    {selectedExp.type}
                  </span>
                </div>
                <p className="text-lg text-theme-secondary font-medium tracking-tight">
                  {selectedExp.role}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="btn-glossy p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-theme-secondary opacity-50 text-[10px] uppercase font-bold tracking-widest mb-1.5">
                    <Calendar className="w-3 h-3" /> Duration
                  </div>
                  <p className="text-sm text-theme">{selectedExp.starting} - {selectedExp.ending}</p>
                </div>
                <div className="btn-glossy p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-theme-secondary opacity-50 text-[10px] uppercase font-bold tracking-widest mb-1.5">
                    <MapPin className="w-3 h-3" /> Location
                  </div>
                  <p className="text-sm text-theme">{selectedExp.location}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-theme-secondary opacity-50 text-[10px] uppercase font-bold tracking-widest mb-3">
                  Description
                </p>
                <div className="max-h-[30vh] overflow-y-auto pr-2 text-sm text-theme-secondary leading-relaxed scrollbar-thin">
                  {selectedExp.description}
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-white/10">
                <a
                  href={selectedExp.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black rounded-xl font-bold transition-all hover:bg-white/90"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
};

export default Experience;
