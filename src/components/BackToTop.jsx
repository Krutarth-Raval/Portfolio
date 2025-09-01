import React, { useEffect, useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      if (scrolled > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Cleanup the listener on unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-10 right-6 z-10">
      {isVisible && (
        <button
          onClick={goToTop}
          className="back-to-top"
        >
            <BiSolidUpArrow size={25}  className="animate-bounce text-blue-500"/>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
