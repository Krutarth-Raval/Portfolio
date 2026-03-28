import React, { useRef } from "react";
import AboutCard from "@/components/ui/AboutCard";
import EduAndExpCard from "@/UI/EduAndExpCard";
import Greeting from "@/UI/Greeting";
const AboutMe = () => {
  return (
    <div className="mt-4 mb-20 flex flex-col space-y-12">
      <AboutCard />
      <EduAndExpCard />
      <Greeting />
    </div>
  );
};

export default AboutMe;
