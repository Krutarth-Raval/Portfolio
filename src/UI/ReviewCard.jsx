import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const ReviewCard = ({ rev, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="btn-glossy p-5 sm:p-8 rounded-2xl sm:rounded-3xl relative flex flex-col justify-between group transition-all duration-500 overflow-hidden h-full min-h-[180px] sm:min-h-[250px] cursor-pointer"
    >
      {/* Quote Icon Overlay */}
      <div className="absolute top-4 right-4 sm:right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-[var(--theme-accent)] rotate-180" />
      </div>

      <div className="relative z-10 flex-1">
        <div className="flex gap-1 mb-4 sm:mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="sm:size-14 fill-[var(--theme-accent)] text-transparent group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
          ))}
        </div>

        <div className="mb-4 sm:mb-8">
          <p className="text-theme opacity-90 leading-relaxed italic text-xs sm:text-lg relative line-clamp-3">
            "{rev.description}"
          </p>
          {rev.description.length > 150 && (
            <p className="mt-2 text-[9px] font-black uppercase tracking-widest text-accent opacity-60">
              Tap to read full review
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 border-t border-white/5 pt-4 sm:pt-6 group-hover:border-[var(--theme-accent)]/20 transition-colors">
        <div className="w-10 h-10 sm:w-12 h:12 rounded-full bg-gradient-to-tr from-[var(--theme-accent)]/20 via-transparent to-[var(--theme-accent)]/20 flex items-center justify-center border border-white/5 font-bold text-theme text-sm sm:text-base">
          {rev.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <h3 className="text-xs sm:text-base font-bold text-theme tracking-tight">
            {rev.name}
          </h3>
          <p className="text-[9px] sm:text-[11px] font-bold text-theme-secondary uppercase tracking-[0.2em] opacity-60">
            {rev.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
