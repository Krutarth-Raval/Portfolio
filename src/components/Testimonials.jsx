import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Quote, Star } from "lucide-react";
import ReviewCard from "@/UI/ReviewCard";
import reviewData from "../Data/Review.json";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const reviews = reviewData;
  const [selectedReview, setSelectedReview] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedReview]);

  // Calculate the maximum index we can slide to
  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Only show navigation if there are more reviews than items per view
  const showNav = reviews.length > itemsPerView;

  return (
    <div className="p-2 flex flex-col justify-start mt-4 mb-12 relative w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 sm:mb-8">
        <h2 className="description-font-size font-bold tracking-tight">What They Say</h2>
        <div className="flex-1 h-px bg-white/10"></div>

        {/* Navigation Buttons (Desktop Corner) */}
        {showNav && (
          <div className="hidden md:flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-accent/10 transition-all text-theme cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-accent/10 transition-all text-theme cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Viewport */}
      <div className="w-full relative overflow-visible" ref={containerRef}>
        <motion.div
          animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="flex transition-all duration-300"
        >
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="px-1.5 sm:px-2 shrink-0 h-full"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <ReviewCard
                rev={rev}
                onClick={() => setSelectedReview(rev)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Controls (Mobile / Bottom) */}
      {showNav && (
        <div className="flex items-center justify-between mt-6 md:hidden px-1">
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-white/5 border border-white/5 text-theme active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-white/5 border border-white/5 text-theme active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex gap-1 overflow-hidden">
            {reviews.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-4 bg-accent' : 'w-1 bg-white/10'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Full Review Modal */}
      <AnimatePresence>
        {selectedReview && (
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
              className="w-full max-w-lg pop-up-block rounded-2xl relative shadow-2xl p-8 sm:p-10"
            >
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-[-10px] right-[-10px] sm:top-[-15px] sm:right-[-15px] z-50 h-8 w-8 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all cursor-pointer shadow-xl flex items-center justify-center"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <div className="relative">
                <div className="absolute -top-6 -right-2 opacity-5">
                  <Quote className="w-24 h-24 text-accent rotate-180" />
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-transparent" />
                  ))}
                </div>

                <p className="text-theme opacity-90 leading-relaxed italic text-base sm:text-lg mb-10 relative z-10">
                  "{selectedReview.description}"
                </p>

                <div className="flex items-center gap-5 border-t border-white/5 pt-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-accent/20 flex items-center justify-center border border-white/5 font-bold text-lg text-theme">
                    {selectedReview.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-theme tracking-tight">
                      {selectedReview.name}
                    </h3>
                    <p className="text-[12px] font-bold text-theme-secondary uppercase tracking-[0.2em] opacity-60">
                      {selectedReview.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots (Desktop) */}
      {showNav && (
        <div className="hidden md:flex justify-center gap-1.5 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === i ? 'w-10 bg-accent' : 'w-2 bg-white/10 hover:bg-white/20'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
