import React from "react";
import { NavLink } from "react-router-dom";
import myImage from "../assets/me.png";
import { FiDownload } from "react-icons/fi";
import { IoCall } from "react-icons/io5";
import SocialLinks from "@/UI/SocialLinks";

const AboutCard = () => {
  return (
    <div> 
      {" "}
      <div className="flex flex-col items-center sm:grid-cols-2 sm:gap-10 gap-5   ">
        <div className="relative flex bg-glossy w-full rounded-lg h-full py-2 flex-col items-center gap-2 animate-fade-in  ">
          <img
            src={myImage}
            alt=""
            className="object-cover max-md:h-30 max-md:w-30 bg-none  shadow h-50 w-50 rounded-[50%] select-none"
          />
          {/* <p className="absolute top-2 py-1 px-5 rounded-lg text-theme   text-sm font-light sm:opacity-70 ">
            Turning ideas into code.
          </p> */}
          <div >
          <SocialLinks/>
          </div>
          <div className="relative p-4 h-max rounded-lg flex flex-col gap-4 text-theme  text-wrap animate-fade-left">
            <p className="font-light normal-font-size leading-relaxed text-start p-2">
              Hey, my name is{" "}
              <span className="text-theme font-bold">Krutarth Raval</span> a
              passionate individual who loves building and creating with intent.
              I find purpose in learning, growing, and shaping ideas into
              something real and impactful. Whether it’s a project or a
              conversation, I show up with clarity, curiosity, and a desire to
              leave things better than I found them.
              <br />
              <br />
              I’m currently{" "}
              <span className="font-semibold text-accent">
                open to opportunities
              </span>{" "}
               if you think we can collaborate, feel free to reach out or
              explore my CV.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/krutarthraval-resume.pdf"
                download
                className="bg-accent sm:w-max w-auto px-4 py-2 rounded-md font-extrabold sm:font-semibold hover:scale-105 transition text-center flex items-center gap-2 metadata-font-size"
              >
                <FiDownload /> Download CV
              </a>
              <NavLink
                to="/contact"
                className="px-4 py-2 bg-surface rounded-md font-extrabold sm:font-semibold transition sm:w-max w-[auto] justify-center flex items-center gap-2 hover:scale-105 metadata-font-size"
              >
                <IoCall /> Contact Me
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
