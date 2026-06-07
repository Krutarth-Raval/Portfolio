import React from "react";
import ThemeToggle from "../UI/ThemeToggle";
import { RiShareLine } from "react-icons/ri";

const Footer = () => {
  const handleShare = async () => {
    const shareData = {
      title: "Krutarth Raval | Portfolio",
      text: "Discover the work of Krutarth Raval - a developer crafting modern, scalable web applications.",
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <footer className="w-full h-[10vh] min-h-[60px] border-t border-[var(--theme-btn-border)] bg-[var(--theme-bg)] px-6 md:px-12 flex justify-between items-center select-none z-50 relative mt-auto">
      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-theme opacity-60">
        Krutarth Raval © {new Date().getFullYear()}
      </span>
      
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-theme opacity-60 hidden sm:inline-block">
            Theme
          </span>
          <ThemeToggle />
        </div>
        
        <button onClick={handleShare} className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-theme opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
          <span className="hidden sm:inline-block">Share</span>
          <RiShareLine className="text-lg" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
