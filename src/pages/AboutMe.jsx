import React, { useRef } from "react";

import AboutCard from "@/UI/AboutCard";
import EduAndExpCard from "@/UI/EduAndExpCard";
import Greeting from "@/UI/Greeting";
const AboutMe = () => {
  return (
    <div className="mt-10 mx-2 flex flex-col justify-center ">
      <AboutCard />
      <EduAndExpCard />
      <Greeting/>
    </div>
  );
};

export default AboutMe;
