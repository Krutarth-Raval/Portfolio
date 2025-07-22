import React, { useState } from "react";
import { Star } from "lucide-react";
import reviewData from "../Data/Review.json";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const Card = () => {
  const review = reviewData;
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? review : review.slice(0, 2);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="relative w-full  ">
      {/* Card Container */}
      <div className="flex gap-4 max-sm:justify-start justify-start flex-wrap p-2 ">
        {visibleReviews.map((rev, index) => (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={index}
            className="relative w-full  bg-glossy p-2 rounded-lg  shrink-0 snap-center    transition-all duration-500 bg-accent"
          >
            <div className="mb-2 border-b-1  flex justify-between items-center border-theme-surface py-2  ">
              <h3 className="text-lg font-semibold  ">{rev.name}</h3>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="goldenrod" stroke="none" />
                ))}
              </div>
            </div>
            <p className="metadata-font-size text-theme-secondary mb-5">
              {rev.description}
            </p>
            <p className="absolute bottom-1 right-2 metadata-font-size font-light text-theme-secondary italic">
              — {rev.position || "Contributor"}, {rev.company}
            </p>
          </motion.div>
        ))}
      </div>

      {/* More+ Button */}
      {review.length > 2 && !showAll && (
        <div className="text-center mt-2">
          <button
            onClick={() => setShowAll(true)}
            className="more-btn "
          >
            More +
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
