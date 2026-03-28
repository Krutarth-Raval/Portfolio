import React from "react";
import { NavLink } from "react-router-dom";
import myImage from "../../assets/me.png";
import { FiDownload } from "react-icons/fi";
import { IoCall } from "react-icons/io5";
import SocialLinks from "@/UI/SocialLinks";

const AboutCard = () => {
  return (
    <div className="mx-2 py-2">
      <div className="relative overflow-hidden rounded-2xl bg-glossy border border-white/10 shadow-xl transition-all duration-500 hover:border-white/20">
        {/* Subtler decorative element */}
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-accent/15 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left Column: Focused Profile */}
          <div className="md:w-[35%] p-6 md:p-8 flex flex-col items-center justify-center bg-white/5 border-b md:border-b-0 md:border-r border-white/10 animate-fade-in text-center">
            <div className="relative group mb-6">
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent/50 to-transparent rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <img
                src={myImage}
                alt="Krutarth Raval"
                className="relative object-cover w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-white/10 shadow-lg select-none transform transition duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <h2 className="text-2xl font-black text-theme tracking-tight">Krutarth Raval</h2>
            <p className="text-accent font-bold mt-1 uppercase tracking-widest text-[10px]">Full Stack Dev</p>

            <div className="mt-4 scale-90">
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Minimalist Bio */}
          <div className="flex-1 p-6 md:p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left animate-fade-left">
            <div className="mb-4 flex flex-col items-center md:items-start w-full">

              <h1 className="text-3xl md:text-4xl font-extrabold text-theme leading-tight mb-4">
                Building with <br className="md:hidden" />
                <span className="text-accent underline underline-offset-4 decoration-accent/30">Purpose</span>.
              </h1>

              <div className="text-theme/80 space-y-4 max-w-lg">
                <p className="normal-font-size leading-relaxed text-pretty">
                  Passionate developer dedicated to shaping ideas into impactful digital experiences.
                  I focus on clarity, efficiency, and building solutions that truly matter.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6 w-full">
              <a
                href="/krutarthraval-resume.pdf"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-white font-bold rounded-lg overflow-hidden transition-all duration-300 md:w-auto w-full text-sm"
              >
                <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></div>
                <FiDownload className="relative" />
                <span className="relative">CV</span>
              </a>

              <NavLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-surface/50 border border-white/10 font-bold rounded-lg backdrop-blur-md hover:border-white/20 transition-all duration-300 md:w-auto w-full text-sm"
              >
                <IoCall className="text-accent" />
                <span>Contact</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;


