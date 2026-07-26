import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReviewCard from "@/UI/ReviewCard";
import reviewData from "../Data/Review.json";

const Testimonials = () => {
  const visibleReviews = reviewData;
  const scrollRef = useRef(null);
  const firstHalfRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    const firstHalf = firstHalfRef.current;
    if (!el || !firstHalf) return;

    // Initialize scroll position to the start of the 2nd set 
    // to allow backward manual scrolling.
    if (el.scrollLeft === 0) {
      el.scrollLeft = firstHalf.offsetWidth;
    }

    let animationId;
    let exactScrollLeft = el.scrollLeft;

    const scroll = () => {
      // Regardless of paused or playing, keep exactScrollLeft synced with actual scroll 
      // in case the user is scrolling manually.
      if (isPaused) {
        exactScrollLeft = el.scrollLeft;
      } else {
        exactScrollLeft += 0.8; // auto-scroll speed
      }

      // Infinite loop bounds check
      // If they scrolled past set 2 (into set 3), or backwards into set 1,
      // silently jump them back into set 2 perfectly once auto-scroll resumes.
      // We don't jump during `isPaused` to avoid cancelling native touch momentum on iOS.
      if (!isPaused) {
        if (exactScrollLeft >= firstHalf.offsetWidth * 2) {
          exactScrollLeft = firstHalf.offsetWidth + (exactScrollLeft % firstHalf.offsetWidth);
        } else if (exactScrollLeft < firstHalf.offsetWidth) {
          // Javascript modulo of negative numbers is weird, so we ensure it's positive.
          exactScrollLeft = firstHalf.offsetWidth + ((exactScrollLeft % firstHalf.offsetWidth) + firstHalf.offsetWidth) % firstHalf.offsetWidth;
        }
        el.scrollLeft = Math.floor(exactScrollLeft);
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const handleInteractionStart = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    // Resume after 5 seconds
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000); 
  };

  const numReviews = visibleReviews.length;
  let containerClasses = "max-w-6xl px-6";
  let titlePadding = "";
  
  if (numReviews === 4) {
    containerClasses = "max-w-[1400px] px-6 md:px-12";
  } else if (numReviews >= 5) {
    containerClasses = "max-w-full px-0"; // Full width edge-to-edge
    titlePadding = "px-6"; // Ensure title still has padding on mobile
  }

  return (
    <div id="testimonials" className={`lg:min-h-screen flex flex-col justify-center py-24 lg:py-16 mx-auto w-full relative select-none ${containerClasses}`}>
      <div className="flex flex-col items-center w-full">
        {/* Centered Title Section */}
        <motion.div
          className={`flex flex-col items-center justify-center text-center w-full mb-12 md:mb-20 z-40 ${titlePadding}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-theme leading-none tracking-tight">
            What They Say
          </h2>
        </motion.div>

        {/* Infinite Marquee Reviews List */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          ref={scrollRef}
          className="w-full flex overflow-x-auto no-scrollbar pb-10 pt-4 cursor-grab active:cursor-grabbing"
          style={{ 
            scrollBehavior: 'auto',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
          onMouseEnter={() => {
            if (typeof window !== 'undefined' && window.innerWidth >= 768) setIsPaused(true);
          }}
          onMouseLeave={() => {
            if (typeof window !== 'undefined' && window.innerWidth >= 768) {
               setIsPaused(false);
               if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
            }
          }}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onMouseDown={handleInteractionStart}
          onMouseUp={handleInteractionEnd}
        >
          {/* We render 4 identical sets to give massive space for endless manual scrolling. */}
          {/* Set 1 */}
          <div ref={firstHalfRef} className="flex gap-6 md:gap-10 pr-6 md:pr-10 w-max flex-nowrap">
            {visibleReviews.map((rev, index) => (
              <div
                key={`a-${index}`}
                className="bg-[var(--theme-bg)]/60 backdrop-blur-xl border border-[var(--theme-btn-border)] shadow-xl group relative p-6 md:p-8 rounded-3xl w-[320px] md:w-[450px] lg:w-[500px] flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <ReviewCard rev={rev} />
              </div>
            ))}
          </div>
          {/* Set 2 */}
          <div className="flex gap-6 md:gap-10 pr-6 md:pr-10 w-max flex-nowrap">
            {visibleReviews.map((rev, index) => (
              <div
                key={`b-${index}`}
                className="bg-[var(--theme-bg)]/60 backdrop-blur-xl border border-[var(--theme-btn-border)] shadow-xl group relative p-6 md:p-8 rounded-3xl w-[320px] md:w-[450px] lg:w-[500px] flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <ReviewCard rev={rev} />
              </div>
            ))}
          </div>
          {/* Set 3 */}
          <div className="flex gap-6 md:gap-10 pr-6 md:pr-10 w-max flex-nowrap">
            {visibleReviews.map((rev, index) => (
              <div
                key={`c-${index}`}
                className="bg-[var(--theme-bg)]/60 backdrop-blur-xl border border-[var(--theme-btn-border)] shadow-xl group relative p-6 md:p-8 rounded-3xl w-[320px] md:w-[450px] lg:w-[500px] flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <ReviewCard rev={rev} />
              </div>
            ))}
          </div>
          {/* Set 4 */}
          <div className="flex gap-6 md:gap-10 pr-6 md:pr-10 w-max flex-nowrap">
            {visibleReviews.map((rev, index) => (
              <div
                key={`d-${index}`}
                className="bg-[var(--theme-bg)]/60 backdrop-blur-xl border border-[var(--theme-btn-border)] shadow-xl group relative p-6 md:p-8 rounded-3xl w-[320px] md:w-[450px] lg:w-[500px] flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <ReviewCard rev={rev} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
