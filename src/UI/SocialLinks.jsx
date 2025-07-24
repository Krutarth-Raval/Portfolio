import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import {
  SiGmail
} from "react-icons/si";
import { GrInstagram  } from "react-icons/gr";
import { PiGithubLogoFill } from "react-icons/pi";
import {RiLinkedinFill   } from "react-icons/ri";
import { FaPinterestP } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const SocialLinks = () => {
  const [showAll, setShowAll] = useState(false);

  const mainLinks = [
    {name:"LickedIn", icon: <RiLinkedinFill />, url: "https://www.linkedin.com/in/raval-krutarth" },
    {name:"GitHub", icon: <PiGithubLogoFill />, url: "https://github.com/Krutarth-Raval" },
    {name:"Gmail", icon: <SiGmail />, url: "mailto:krutarth@example.com" },
  ];

  const moreLinks = [
    {name:"Instagram", icon: <GrInstagram    />, url: "https://www.instagram.com/raval_krutarth" },
    {name:'X', icon: <BsTwitterX />, url: "https://x.com/_krutarth_raval" },
    {name:"Pinterest", icon: <FaPinterestP />, url: "https://pin.it/5kGuOJuRk" },
    {name:"Ahmadabad, India", icon: <FaLocationDot />, url: "https://maps.app.goo.gl/VVGJ8iKMzXpnKqzU8" },
  ];

  const iconClass =
    "p-2 bg-accent rounded-md text-xl max-sm:text-base cursor-pointer hover:text-theme-accent relative group";

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
            <span className="absolute bg-accent px-2 py-1 rounded-md top-10 left-1/2 -translate-x-1/2 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-in-out metadata-font-size">{item.name}</span>
          </NavLink>
        )
      )}
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="p-1 relative bg-accent text-theme-secondary  rounded-md text-xl max-sm:text-base max-sm:px-1.5 font-bold cursor-pointer hover:text-theme-accent group"
        >
          +4
          <span className="absolute bg-accent px-2 py-1 rounded-md top-10 left-1/2 -translate-x-1/2 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-in-out metadata-font-size">More</span>
        </button>
      )}
    </div>
  );
};

export default SocialLinks;
