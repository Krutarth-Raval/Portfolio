import React from "react";
import ThemeToggle from "../UI/ThemeToggle";
import { NavLink } from "react-router-dom";
import { IoHome, IoCall } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiShareLine } from "react-icons/ri";

import logo from "../assets/logo.png";

const Navbar = () => {
  const activeStyle = ({ isActive }) => {
    return {
      transition: "all 0.4s ease",
      color: isActive ? "var(--theme-text)" : "var(--theme-accent)",
      fontSize: isActive ? "1.2rem" : "1rem"
    };
  };

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: "Krutarth Raval | Portfolio",
      text: "Discover the work of Krutarth Raval - a frontend developer crafting fast, scalable, and seamless digital experiences.",
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.origin);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-3 animate-fade-left">
      <div className="h-15 w-15 sm:h-20 sm:w-20 shadow flex-shrink-0 bg-theme rounded-xl">
        <a href="/" rel="noopener noreferrer">
          <img src={logo} className="object-cover " alt="KR" />
        </a>
      </div>

      <div className="flex gap-6 items-center ml-auto bg-button p-3 rounded-lg ">
        <NavLink
          to="/"
          className="relative group max-sm:text-base md:text-xl cursor-pointer flex items-center gap-1 text-theme "
          style={activeStyle}
        >
          <IoHome />
          <span className="tooltip md:block hidden">Home</span>
        </NavLink>

        <NavLink
          to="/about"
          className="relative group text-theme max-sm:text-base md:text-xl cursor-pointer flex items-center gap-1 "
          style={activeStyle}
        >
          <FaUser />
          <span className="tooltip md:block hidden">About</span>
        </NavLink>

        <NavLink
          to="/contact"
          className="relative group text-theme max-sm:text-base md:text-xl cursor-pointer flex items-center gap-1 "
          style={activeStyle}
        >
          <IoCall />
          <span className="tooltip md:block hidden">Contact</span>
        </NavLink>
      </div>

      <div className="relative group flex-shrink-0">
        <ThemeToggle />
        <span className="absolute left-1/2 -translate-x-1/2 top-11 opacity-0 text-theme font-semibold group-hover:opacity-100 bg-accent rounded-md py-1 px-2 text-sm transition-all duration-300 whitespace-nowrap z-10 max-sm:group-hover:opacity-0">
          Theme
        </span>
      </div>

      {/* Share Button */}
      <div className="relative group flex-shrink-0">
        <button
          onClick={handleShare}
          className="bg-button  p-2.5 rounded-lg text-theme hover:text-accent transition-all duration-300 cursor-pointer flex items-center justify-center"
        >
          <RiShareLine />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 top-12 opacity-0 text-theme font-semibold group-hover:opacity-100 bg-accent rounded-md py-1 px-2 text-sm transition-all duration-300 whitespace-nowrap z-10 max-sm:group-hover:opacity-0">
          Share
        </span>
      </div>


    </div>
  );
};

export default Navbar;
