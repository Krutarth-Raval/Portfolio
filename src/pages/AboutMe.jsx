import React, { useRef } from "react";

import AboutCard from "@/UI/AboutCard";
import EduAndExpCard from "@/UI/EduAndExpCard";
import AcademicProjects from "@/components/AcademicProjects";
import Experience from "@/components/Experience";
import Greeting from "@/UI/Greeting";
const AboutMe = () => {
  return (
    <div className="mt-10 mx-2 flex flex-col justify-center ">
      <AboutCard />
      <EduAndExpCard />
      <AcademicProjects/>
      <Experience/>
      <Greeting/>
    </div>
  );
};

export default AboutMe;
