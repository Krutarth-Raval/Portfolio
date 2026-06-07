import React, { useState } from "react";
import { SiGmail } from "react-icons/si";
import { GrInstagram } from "react-icons/gr";
import { PiGithubLogoFill } from "react-icons/pi";
import { RiLinkedinFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";

const SocialLinks = () => {
  const [showAll, setShowAll] = useState(false);

  const mainLinks = [
    { name: "LinkedIn", icon: <RiLinkedinFill />, url: "https://www.linkedin.com/in/raval-krutarth" },
    { name: "GitHub", icon: <PiGithubLogoFill />, url: "https://github.com/Krutarth-Raval" },
    { name: "Gmail", icon: <SiGmail />, url: "mailto:krutarth@example.com" },
  ];

  const moreLinks = [
    { name: "Instagram", icon: <GrInstagram />, url: "https://www.instagram.com/raval_krutarth" },
    { name: "Ahmedabad, India", icon: <FaLocationDot />, url: "https://maps.app.goo.gl/VVGJ8iKMzXpnKqzU8" },
    { name: "Download CV", icon: <FiFileText />, url: "/krutarthraval-resume.pdf", isDownload: true },
  ];

  const iconClass =
    "p-2 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-md text-xl max-sm:text-base cursor-pointer hover:text-accent relative group transition-all duration-300";

  const handleLinkClick = (e, item) => {
    if (item.isDownload) {
      const confirmDownload = window.confirm("Would you like to download Krutarth's CV?");
      if (!confirmDownload) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-start sm:justify-start mt-4 animate-fade-up">
      {(showAll ? [...mainLinks, ...moreLinks] : mainLinks).map(
        (item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleLinkClick(e, item)}
            download={item.isDownload ? "Krutarth_Raval_CV.pdf" : undefined}
            className={iconClass}
          >
            {item.icon}
            <span className="absolute bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] px-2 py-1 rounded-md top-10 left-1/2 -translate-x-1/2 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-in-out metadata-font-size">{item.name}</span>
          </a>
        )
      )}
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="py-1 px-2 relative bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] text-theme-secondary rounded-md text-xl max-sm:text-base max-sm:px-1.5 font-bold cursor-pointer hover:text-accent group transition-all duration-300"
        >
          +3
          <span className="absolute bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] px-2 py-1 rounded-md top-10 left-1/2 -translate-x-1/2 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-in-out metadata-font-size">More</span>
        </button>
      )}
    </div>
  );
};

export default SocialLinks;

