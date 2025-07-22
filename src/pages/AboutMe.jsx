import React from "react";
import { NavLink } from "react-router-dom";
import myImage from "../assets/me.jpg";
import { FiDownload } from "react-icons/fi";
import { IoCall } from "react-icons/io5";
const AboutMe = () => {
  return (
    <div className="mt-10 mx-2 flex flex-col justify-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 gap-5 items-center ">
        <div className="relative flex flex-col items-center gap-2 animate-fade-in  ">
          <img
            src={myImage}
            alt=""
            className="h-100 max-md:h-80 select-none w-auto rounded-[20%] grayscale shadow-lg "
          />
          <p className="absolute bottom-2 py-1 px-5 rounded-lg text-theme bg-glossy  text-sm font-light sm:opacity-70">
            Turning ideas into code.
          </p>
        </div>

        <div className="relative bg-glossy p-2 h-max rounded-xl flex flex-col gap-4 max-w-xl text-theme text-wrap animate-fade-left shadow-md">
          <p className="font-light normal-font-size leading-relaxed">
            I'm a dedicated and curious individual with a strong interest in
            front-end development and modern web technologies. With a focus on
            building clean, user-friendly interfaces using React and Tailwind
            CSS, I combine technical skills with a genuine passion for learning
            and problem-solving. I value clarity, consistency, and continuous
            improvement — both in code and in life.
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
              className="px-4 py-2 bg-surface rounded-md font-extrabold sm:font-semibold   transition sm:w-max w-[auto] justify-center flex items-center gap-2 hover:scale-105 metadata-font-size"
            >
              <IoCall /> Contact Me
            </NavLink>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 gap-5 items-start mt-10 text-theme">
        {/* Education Section */}
        <div className="bg-glossy p-2 rounded-lg shadow-md h-full">
          <p className="description-font-size font-semibold mb-3  pb-1 border-b-1 border-theme-surface">
            Education
          </p>
          <div className="space-y-3 text-sm sm:text-base">
            <div className="relative">
              <p className="font-medium normal-font-size">B.Voc in IT & ITES</p>
              <p className="text-theme-secondary font-light metadata-font-size">
                Silver Oak University
                <div className="absolute right-2 top-1 flex items-center gap-2">
                  <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                    2023
                  </span>
                  <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                    2026
                  </span>
                </div>
              </p>
            </div>
            <div className="relative mt-5">
              <p className="font-medium normal-font-size">
                12th Standard (Commerce)
              </p>
              <p className="text-theme-secondary font-light metadata-font-size">
                C.M. Vidyalaya School
                <div className="absolute right-2 top-1 flex items-center gap-2">
                  <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                    2022
                  </span>
                  <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                    2023
                  </span>
                </div>
              </p>
            </div>
            <div className="relative mt-5">
              <p className="font-medium normal-font-size">10th Standard</p>
              <p className="text-theme-secondary font-light metadata-font-size">
                C.M. Vidyalaya School
                <div className="absolute right-2 top-1 flex items-center gap-2">
                  <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                    2019
                  </span>
                  <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                    2020
                  </span>
                </div>
              </p>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="bg-glossy p-2 rounded-lg shadow-md">
          <h2 className="description-font-size font-semibold mb-3  pb-1 border-b-1 border-theme-surface">
            Expertise
          </h2>
          <div className="flex flex-col gap-2">
            <div className="bg-surface p-2">
              <p className="metadata-font-size">Frontend</p>
              <ul className="flex flex-wrap gap-2 m-2"></ul>
            </div>
            <div className="bg-surface p-2">
              <p className="metadata-font-size">Backend</p>
              <ul className="flex flex-wrap gap-2 m-2"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
