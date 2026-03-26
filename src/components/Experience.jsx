import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ExperienceData from "../Data/Experience.json";
import { Globe, MapPin, Building2, Calendar, X } from "lucide-react";
import { Button } from "./ui/button";

const Experience = () => {
  const [selectedExp, setSelectedExp] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="p-2 flex flex-col justify-start mt-6">
      <p className="description-font-size font-bold border-b border-[var(--theme-accent)] w-full py-2">
        Real-World Experience
      </p>

      {/* Experience List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" ref={ref}>
        {ExperienceData.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-glossy p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pl-1">
                <div className="bg-white/5 p-2 rounded-xl border border-white/10 shadow-inner group-hover:bg-[var(--theme-accent)]/20 transition-colors">
                  <Building2 className="w-5 h-5 text-white/70" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight truncate">{exp.name}</h3>
              </div>

              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] shrink-0 mt-1.5" />
                  <p className="text-theme-secondary text-[11px] font-bold uppercase tracking-widest break-words leading-relaxed">{exp.role}</p>
                </div>
                
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg shrink-0">
                  <Calendar className="w-3 h-3 text-white/30" />
                  <span className="text-[10px] font-bold text-white/50 tracking-wide uppercase whitespace-nowrap">{exp.starting} — {exp.ending}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setSelectedExp(exp)}
              className="w-full mt-2 cursor-pointer bg-white/5 border border-white/10 rounded-xl py-4 hover:bg-white/10 transition-all text-white font-medium text-sm"
            >
              View Details
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Experience Pop-up Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
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
                  <h2 className="text-2xl font-bold text-white">
                    {selectedExp.name}
                  </h2>
                  <span className="text-[12px] bg-[var(--theme-accent)]/20 px-3 py-1 rounded-full text-white border border-[var(--theme-accent)]/40">
                    {selectedExp.type}
                  </span>
                </div>
                <p className="text-lg text-theme-secondary font-medium tracking-tight">
                  {selectedExp.role}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1.5">
                    <Calendar className="w-3 h-3" /> Duration
                  </div>
                  <p className="text-sm text-white/90">{selectedExp.starting} - {selectedExp.ending}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1.5">
                    <MapPin className="w-3 h-3" /> Location
                  </div>
                  <p className="text-sm text-white/90">{selectedExp.location}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-3">
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
        </div>
      )}
    </div>
  );
};

export default Experience;
