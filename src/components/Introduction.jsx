import React, { useEffect, useState } from "react";
import SocialLinks from "../UI/SocialLinks";

const roles = [
  "React.js Developer",
  "Full-Stack Developer (MERN)",
  "UI/UX-Focused Front-End Engineer",
];

const Introduction = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 2000); // switch every 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-10 mx-2  ">
      <p className="title-font-size font-bold text-theme  animate-fade-in">
        I'm, Krutarth Raval
      </p>

      <div className="relative h-10 mt-1 ">
        <p className="absolute text-theme-secondary  py-1 description-font-size font-semibold bg-surface w-full rounded-sm  animate-fade  ">
          {roles[currentIndex]}
        </p>
      </div>

      <div className="max-sm:my-1 md:my-3 lg:my-5 bg-surface px-0  py-4 border-t-1 border-b-1 border-[var(--theme-accent)]  animate-fade-in overflow-hidden">
        <p className=" max-sm:p-1 metadata-font-size text-theme-secondary max-sm:font-normal font-medium text-pretty animate-fade-in">
          I'm a passionate and detail-oriented Frontend Developer with hands-on
          experience in building modern, responsive, and scalable web
          applications using the MERN stack. I specialize in crafting clean
          UI/UX with React, Tailwind CSS, and a focus on performance and
          accessibility. My goal is to turn ideas into seamless digital
          experiences.
        </p>
      </div>

      
       <SocialLinks/>
     
    </div>
  );
};

export default Introduction;
