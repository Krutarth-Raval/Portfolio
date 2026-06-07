import React, { useState } from "react";
import { motion } from "framer-motion";
import ReviewCard from "@/UI/ReviewCard";
import reviewData from "../Data/Review.json";

const Testimonials = () => {
  const reviews = reviewData;
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div id="testimonials" className="min-h-screen flex flex-col justify-center py-16 px-6 max-w-6xl mx-auto w-full relative select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column - Sticky Details & Navigation Controls */}
        <motion.div
          className="lg:col-span-5 sticky top-0 lg:top-16 z-40 flex flex-col gap-4 text-left pt-8 pb-20 -mt-8 -mx-6 px-6 mb-[40vh] lg:mb-0 lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:mt-0 bg-gradient-to-b from-[var(--theme-bg)] via-[var(--theme-bg)] via-75% to-transparent lg:bg-none"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">05 / Recommendations</span>
            <div className="h-px bg-accent/20 flex-1"></div>
          </div>
          <h2 className="title-font-size font-extrabold text-theme leading-none tracking-tight">
            What They Say
          </h2>
          <p className="normal-font-size text-theme-secondary/80 font-medium leading-relaxed max-w-md mt-2">
            Feedback and stories from clients, colleagues, and collaborators about my contribution, work ethics, and developer capabilities.
          </p>
        </motion.div>

        {/* Right Column - Reviews List */}
        <div className="lg:col-span-7 flex flex-col gap-10 -mt-[40vh] lg:mt-0">
          {visibleReviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="premium-glow-card bg-glossy group relative p-6 md:p-8 rounded-3xl w-full"
            >
              <ReviewCard rev={rev} />
            </motion.div>
          ))}

          {reviews.length > 3 && !showAll && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(true)}
                className="more-btn px-8 py-3 bg-accent/20 rounded-full transition-all duration-300 font-bold uppercase tracking-widest text-[11px] cursor-pointer"
              >
                More +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
