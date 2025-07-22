import React from "react";
import ThemeToggle from "../UI/ThemeToggle";
import { NavLink } from "react-router-dom";
import { IoHome, IoCall } from "react-icons/io5";
import { FaUser,FaPenAlt} from "react-icons/fa";

import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full  gap-4  animate-fade-left">
      <div className="h-15 w-15 sm:h-20 sm:w-20 flex-shrink-0 bg-theme rounded-xl">
        <a href="/" rel="noopener noreferrer">
          <img src={logo} className="object-cover " alt="KR" />
        </a>
      </div>

      <div className="flex gap-6 items-center ml-auto bg-button p-3 rounded-lg">
        <NavLink
          to="/"
          className="relative group max-sm:text-base md:text-xl cursor-pointer flex items-center gap-1 text-theme"
        >
          <IoHome />
          <span className="tooltip">Home</span>
        </NavLink>

        <NavLink
          to="/about"
          className="relative group text-theme max-sm:text-base md:text-xl cursor-pointer flex items-center gap-1"
        >
          <FaUser />
          <span className="tooltip">About</span>
        </NavLink>
        <NavLink
          to="/blog"
          className="relative group text-theme max-sm:text-base md:text-xl cursor-pointer flex items-center gap-1"
        >
          <FaPenAlt />
          <span className="tooltip">Blog</span>
        </NavLink>

        <NavLink
          to="/contact"
          className="relative group text-theme max-sm:text-base md:text-xl cursor-pointer flex items-center gap-1"
        >
          <IoCall />
          <span className="tooltip">Contact</span>
        </NavLink>
      </div>

      <div className="relative group flex-shrink-0">
        <ThemeToggle />
        <span className="absolute left-1/2 -translate-x-1/2 top-11 opacity-0 text-theme font-semibold group-hover:opacity-100 bg-accent text-white rounded-md py-1 px-2 text-sm transition-all duration-300 whitespace-nowrap z-10 max-sm:group-hover:opacity-0">
          Theme
        </span>
      </div>
    </div>
  );
};

export default Navbar;
