import React, { useState, useRef } from "react";
import { Star, Quote } from "lucide-react";
import reviewData from "../Data/Review.json";
import { motion, useInView } from "framer-motion";

const Card = () => {
  const reviews = reviewData;
  const [showAll, setShowAll] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="relative w-full py-6" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
        {visibleReviews.map((rev, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ y: -5 }}
            className={`btn-glossy p-8 rounded-3xl relative flex flex-col justify-between group transition-all duration-500 overflow-hidden ${expandedIdx === index ? 'min-h-max' : 'min-h-[250px]'}`}
          >
            {/* Quote Icon Overlay */}
            <div className="absolute top-4 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote className="w-16 h-16 text-[var(--theme-accent)] rotate-180" />
            </div>

            <div className="relative z-10">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[var(--theme-accent)] text-transparent group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>

              <div className="mb-8">
                <p className={`text-theme opacity-90 leading-relaxed italic text-sm sm:text-base relative ${expandedIdx === index ? "" : "line-clamp-4"}`}>
                  "{rev.description}"
                </p>
                {rev.description.length > 150 && (
                  <button 
                    onClick={() => setExpandedIdx(expandedIdx === index ? null : index)}
                    className="mt-2 text-[10px] font-black uppercase tracking-widest text-accent hover:underline cursor-pointer"
                  >
                    {expandedIdx === index ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-[var(--theme-btn-border)] pt-6 group-hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-accent/20 flex items-center justify-center border border-[var(--theme-btn-border)] font-bold text-theme">
                {rev.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-bold text-theme tracking-tight">
                  {rev.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-bold text-theme-secondary uppercase tracking-[0.2em] opacity-60">
                  {rev.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {reviews.length > 2 && !showAll && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="more-btn px-12 py-3 bg-accent/20 border border-[var(--theme-accent)] rounded-full hover:bg-[var(--theme-accent)] hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-[12px]"
          >
            Read More +
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
