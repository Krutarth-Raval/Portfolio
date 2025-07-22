import React from "react";
import { NavLink } from "react-router-dom";
import myImage from "../assets/me.jpg";
const AboutMe = () => {
  return (
    <div className="mt-10 mx-2 flex flex-col justify-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 gap-5 items-center">
        <div className="relative flex flex-col items-center gap-2 animate-fade-in ">
          <img
            src={myImage}
            alt=""
            className="h-100 max-md:h-80 select-none w-auto rounded-[20%] grayscale shadow-lg "
          />
          <p className="absolute bottom-2 py-1 px-5 rounded-lg text-theme bg-glossy  text-sm font-light sm:opacity-70">
            Turning ideas into code.
          </p>
        </div>

        <div className="relative bg-glossy p-4 h-max rounded-xl flex flex-col gap-4 max-w-xl text-theme text-wrap animate-fade-left">
          <p className="font-light normal-font-size leading-relaxed">
            I'm a dedicated and curious individual with a strong interest in
            front-end development and modern web technologies. With a focus on
            building clean, user-friendly interfaces using React and Tailwind
            CSS, I combine technical skills with a genuine passion for learning
            and problem-solving. I value clarity, consistency, and continuous
            improvement — both in code and in life.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
