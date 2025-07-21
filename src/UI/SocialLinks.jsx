import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import {
  SiGmail,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiPinterest,
} from "react-icons/si";
const SocialLinks = () => {
  const [showAll, setShowAll] = useState(false);

  const mainLinks = [
    { icon: <SiLinkedin />, url: "https://www.linkedin.com/in/raval-krutarth" },
    { icon: <SiGithub />, url: "https://github.com/Krutarth-Raval" },
    { icon: <SiGmail />, url: "mailto:krutarth@example.com" },
  ];

  const moreLinks = [
    { icon: <SiInstagram />, url: "https://www.instagram.com/raval_krutarth" },
    { icon: <BsTwitterX />, url: "https://x.com/_krutarth_raval" },
    { icon: <SiPinterest />, url: "https://pin.it/5kGuOJuRk" },
  ];

  const iconClass =
    "p-2 bg-accent rounded-md text-xl max-sm:text-base cursor-pointer hover:text-theme-accent";

  return (

    <div className="flex flex-wrap gap-3 items-center justify-start sm:justify-start mt-4 animate-fade-up">
      {(showAll ? [...mainLinks, ...moreLinks] : mainLinks).map(
        (item, index) => (
          <NavLink
            key={index}
            to={item.url}
            target="_blank"
            className={iconClass}
          >
            {item.icon}
          </NavLink>
        )
      )}
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="p-1  bg-accent text-theme-secondary  rounded-md text-xl max-sm:text-base max-sm:px-1.5 font-bold cursor-pointer hover:text-theme-accent "
        >
          +3
        </button>
      )}
    </div>
  );
};

export default SocialLinks;
