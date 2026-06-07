import React from "react";
import { Star, Quote } from "lucide-react";

const ReviewCard = ({ rev }) => {
  return (
    <div className="relative flex flex-col justify-between group transition-all duration-500 h-full w-full">
      {/* Quote Icon Overlay */}
      <div className="absolute -top-2 -right-2 sm:right-0 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-[var(--theme-text)] rotate-180" />
      </div>

      <div className="relative z-10 flex-1">

        <div className="mb-6 sm:mb-8">
          <p className="text-theme opacity-90 leading-relaxed italic text-xs sm:text-base relative w-full pr-4">
            "{rev.description}"
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 border-t border-[var(--theme-btn-border)] pt-4 sm:pt-6 group-hover:border-[var(--theme-accent)] transition-colors">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--theme-btn-bg)] flex items-center justify-center border border-[var(--theme-btn-border)] font-bold text-theme text-sm sm:text-base">
          {rev.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <h3 className="text-xs sm:text-base font-bold text-theme tracking-tight">
            {rev.name}
          </h3>
          <p className="text-[9px] sm:text-[11px] font-bold text-theme-secondary uppercase tracking-[0.2em] opacity-60">
            {rev.role}
          </p>
          <p className="text-[9px] sm:text-[11px] font-bold text-theme-secondary uppercase tracking-[0.2em] opacity-60">
            @ {rev.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
