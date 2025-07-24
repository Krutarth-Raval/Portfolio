import React, { useRef } from "react";
import { useInView, motion } from "framer-motion";
import {
  RiTailwindCssFill,
  RiReactjsLine,
  RiJavascriptFill,
  RiHtml5Fill,
  RiCss3Fill,
  RiNodejsLine,
  RiGitMergeFill,
  RiGithubLine,
} from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { SiMongodb, SiExpress, SiPostman, SiNetlify } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
const EduAndExpCard = () => {
  const eduRef1 = useRef(null);
  const eduRef2 = useRef(null);
  const eduRef3 = useRef(null);
  const skillRef1 = useRef(null);
  const skillRef2 = useRef(null);
  const skillRef3 = useRef(null);

  const inViewEdu1 = useInView(eduRef1, { once: true });
  const inViewEdu2 = useInView(eduRef2, { once: true });
  const inViewEdu3 = useInView(eduRef3, { once: true });
  const inViewSkill1 = useInView(skillRef1, { once: true });
  const inViewSkill2 = useInView(skillRef2, { once: true });
  const inViewSkill3 = useInView(skillRef3, { once: true });
  return (
    <div className="flex flex-col sm:gap-10 gap-5 items-start mt-10 text-theme">
      {/* Education Section */}
      <div className=" p-2 rounded-lg  w-full">
        <p className="description-font-size  font-semibold mb-5  pb-1 border-b-1 border-theme-accent">
          Education
        </p>
        <div className=" metadata-font-size flex sm:justify-center items-center max-lg:flex-col gap-5 max-sm:gap-5 ">
          <motion.div
            ref={eduRef1}
            initial={{ opacity: 0, y: -50 }}
            animate={inViewEdu1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative p-5  shadow w-full h-45 max-lg:h-auto bg-glossy rounded-lg"
          >
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3  flex items-center gap-2">
              <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                2023
              </span>
              <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                2026
              </span>
            </div>
            <p className="mt-8 font-medium normal-font-size">
              B.Voc in IT & ITES
            </p>
            <p className="mt-1 absolute sm:bottom-3 bottom-2 right-2 sm:right-3 italic text-theme-secondary font-light metadata-font-size flex items-center gap-2 ">
              — Silver Oak University{" "}
              <span className="bg-accent p-2 text-theme rounded-md sm:relative group">
                <FaLocationDot size={20} />
                <i className="absolute bg-accent px-2 py-1 rounded-md font-medium  top-1 left-12 sm:top-13 sm:left-1/2 -translate-x-1/2 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-in-out ">
                  Ahmadabad, Gujarat, India
                </i>
              </span>
            </p>

            <p className="mt-2 font-medium metadata-font-size mb-3 flex items-center max-sm:mb-6">
              <span className="font-light">CGPA (2nd Year)</span>
              <span className="bg-surface py-1 px-3 ml-2 rounded-md font-normal">
                9.00
              </span>
            </p>
          </motion.div>
          <motion.div
            ref={eduRef2}
            initial={{ opacity: 0, y: -50 }}
            animate={inViewEdu2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative p-5 shadow  w-full h-45 max-lg:h-auto bg-glossy rounded-lg"
          >
            <div className=" absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-2">
              <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                2022
              </span>
              <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                2023
              </span>
            </div>
            <p className="mt-8 font-medium normal-font-size ">
              12th Standard (Commerce)
            </p>
            <p className="mt-2 font-medium metadata-font-size mb-3 flex items-center max-sm:mb-6">
              <span className="font-light">Percentile</span>
              <span className="bg-surface py-1 px-3 ml-2 rounded-md font-normal">
                66.66%
              </span>
            </p>
            <p className="mt-1 absolute sm:bottom-3 bottom-2 right-2 sm:right-3 italic  text-theme-secondary font-light metadata-font-size flex items-center gap-2">
              — C.M. Vidyalaya School
              <span className="bg-accent text-theme p-2 rounded-md group sm:relative">
                <FaLocationDot size={20} />
                <i className="absolute bg-accent px-2 py-1 rounded-md font-medium  top-1 left-17 sm:top-13 sm:left-1/2 -translate-x-1/2 w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-in-out ">
                  Palitana, Gujarat, India
                </i>
              </span>
            </p>
          </motion.div>
          <motion.div
            ref={eduRef3}
            initial={{ opacity: 0, y: -50 }}
            animate={inViewEdu3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative p-5 shadow w-full h-45 max-lg:h-auto bg-glossy rounded-lg"
          >
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3  flex items-center gap-2">
              <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                2019
              </span>
              <span className="font-semibold bg-accent px-2 py-1 rounded-sm">
                2020
              </span>
            </div>
            <p className="mt-8 font-medium normal-font-size max-sm:mb-3">
              10th Standard
            </p>

            <p className=" absolute sm:bottom-3  bottom-2 right-2 sm:right-3 italic  text-theme-secondary font-light metadata-font-size flex items-center gap-2">
              — C.M. Vidyalaya School
              <span className="bg-accent  text-theme p-2 rounded-md group sm:relative">
                <FaLocationDot size={20} />
                <i className="absolute bg-accent px-2 py-1 rounded-md top-1 left-17 font-medium sm:top-13 sm:left-[-130px] max-sm:-translate-x-1/2  w-max opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-in-out ">
                  Palitana, Gujarat, India
                </i>
              </span>
            </p>
            <p className="mt-2 font-medium metadata-font-size mb-3 flex items-center max-sm:mb-6">
              <span className="font-light">Percentile</span>
              <span className="bg-surface py-1 px-3 ml-2 rounded-md font-normal">
                89.39%
              </span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="flex flex-col w-full gap-5 p-2 items-start  text-theme">
        <h2 className="description-font-size w-full font-semibold pb-2 border-b-1 border-theme-accent">
          Expertise
        </h2>

        <div className="metadata-font-size w-full flex sm:justify-center  max-lg:flex-col gap-3 max-sm:gap-2">
          {/* Frontend */}
          <motion.div
            ref={skillRef1}
            initial={{ opacity: 0, y: 50 }}
            animate={inViewSkill1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative p-5 shadow w-full flex flex-col items-center  h-auto max-lg:h-auto bg-glossy rounded-lg"
          >
            <p className="normal-font-size justify-center flex  font-normal mb-3">
              Frontend
            </p>
            <ul className="flex flex-wrap  gap-5 justify-center m-2 max-sm:justify-start">
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <RiReactjsLine size={40} />
                <span className="about-skill-icon">React</span>
              </li>
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <RiTailwindCssFill size={40} />
                <span className="about-skill-icon">Tailwind CSS</span>
              </li>
              <li className="bg-surface w-max px-2 py-1 rounded relative group">
                {" "}
                <RiHtml5Fill size={40} />
                <span className="about-skill-icon">HTML5</span>
              </li>
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <RiCss3Fill size={40} />
                <span className="about-skill-icon">CSS3</span>
              </li>
              <li className="bg-surface w-max px-2 py-1 rounded relative group">
                <RiJavascriptFill size={40} />
                <span className="about-skill-icon">JavaScript</span>
              </li>
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <TbBrandFramerMotion size={40} />
                <span className="about-skill-icon">Framer Motion</span>
              </li>
            </ul>
          </motion.div>

          {/* Backend */}
          <motion.div
            ref={skillRef2}
            initial={{ opacity: 0, y: 50 }}
            animate={inViewSkill2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative shadow p-5 w-full flex flex-col items-center  h-auto max-lg:h-auto bg-glossy rounded-lg"
          >
            <p className="normal-font-size font-normal mb-2">Backend</p>
            <ul className="flex flex-wrap  gap-5 justify-center m-2 max-sm:justify-start">
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <RiNodejsLine size={40} />
                <span className="about-skill-icon">Node.js</span>
              </li>
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <SiExpress size={40} />
                <span className="about-skill-icon">Express</span>
              </li>
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <SiMongodb size={40} />
                <span className="about-skill-icon">MongoDB</span>
              </li>
            </ul>
          </motion.div>

          {/* Tools */}
          <motion.div
            ref={skillRef3}
            initial={{ opacity: 0, y: 50 }}
            animate={inViewSkill3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative shadow p-5 w-full flex flex-col items-center  h-auto max-lg:h-auto bg-glossy rounded-lg"
          >
            <p className="normal-font-size font-normal mb-2">Tools</p>
            <ul className="flex flex-wrap   gap-5 justify-center m-2 max-sm:justify-start">
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <RiGitMergeFill size={40} />
                <span className="about-skill-icon">Git</span>
              </li>
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <RiGithubLine size={40} />
                <span className="about-skill-icon">GitHub</span>
              </li>
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <VscVscode size={40} />
                <span className="about-skill-icon">VS Code</span>
              </li>

              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <SiPostman size={40} />
                <span className="about-skill-icon">Postman</span>
              </li>
              <li className="bg-surface w-max  px-2 py-1 rounded relative group">
                <SiNetlify size={40} />
                <span className="about-skill-icon">Netlify</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EduAndExpCard;
