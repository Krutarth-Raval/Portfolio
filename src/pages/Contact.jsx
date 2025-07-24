import React from "react";
import { IoCall } from "react-icons/io5";
import { RiLinkedinFill } from "react-icons/ri";
import { GrInstagram } from "react-icons/gr";
import { SiGmail } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { IoOpenOutline } from "react-icons/io5";
import ContactForm from "@/UI/ContactForm";

const Contact = () => {
  return (
    <div className="mt-10 mx-2  ">
      <div className="rounded-lg p-2">
        <p className="description-font-size font-bold border-b-1 border-theme-accent">
          Lets's Get In Touch
        </p>
        <p className="normal-font-size font-normal text-center text-theme-secondary mt-5">
          You’ll find me on these platforms
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3  ">
          <div className="mt-5 flex bg-glossy  rounded-md px-3 py-3 justify-center flex-col gap-5">
            <div className="flex items-center relative gap-2">
              <RiLinkedinFill size={20} />

              <span className="ml-2 text-secondary-theme metadata-font-size">
                Krutarth Raval
              </span>
              <a
                href="https://www.linkedin.com/in/raval-krutarth/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-1 flex gap-2 items-center bg-accent px-2 py-1 rounded-md metadata-font-size  "
              >
                View <IoOpenOutline size={20} />
              </a>
            </div>
            <div className="flex items-center relative gap-2">
              <SiGmail size={20} />

              <span className="ml-2 text-secondary-theme metadata-font-size">
                ravalkrutarth95@gmail.com
              </span>
              <a
                href="mailto:ravalkrutarth95@gamil.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-1 flex gap-2 items-center bg-accent px-2 py-1 rounded-md metadata-font-size"
              >
                View <IoOpenOutline size={20} />
              </a>
            </div>
            <div className="flex items-center relative gap-2">
              <IoCall size={20} />
              <span className="ml-2 text-secondary-theme metadata-font-size">
                +91 6355330833
              </span>
              <a
                href="tel:+91 635533033"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-1 flex gap-2 items-center bg-accent px-2 py-1 rounded-md metadata-font-size"
              >
                View <IoOpenOutline size={20} />
              </a>
            </div>
            <div className="flex items-center relative gap-2">
              <IoLocationSharp size={20} />
              <span className="ml-2 text-secondary-theme metadata-font-size">
                Ahmadabad Gujarat India
              </span>
              <a
                href="https://maps.app.goo.gl/VVGJ8iKMzXpnKqzU8"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-1 flex gap-2 items-center bg-accent px-2 py-1 rounded-md metadata-font-size"
              >
                View <IoOpenOutline size={20} />
              </a>
            </div>
          </div>
          <div className="mt-5  flex bg-glossy rounded-md  px-3 py-3 justify-center flex-col gap-5">
            <div className="flex items-center relative gap-2">
              <PiGithubLogoFill size={20} />

              <span className="ml-2 text-secondary-theme metadata-font-size">
                Krutarth-Raval
              </span>
              <a
                href="https://github.com/Krutarth-Raval"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-1 flex gap-2 items-center bg-accent px-2 py-1 rounded-md metadata-font-size"
              >
                View <IoOpenOutline size={20} />
              </a>
            </div>
            <div className="flex items-center relative gap-2">
              <GrInstagram size={20} />

              <span className="ml-2 text-secondary-theme metadata-font-size">
                raval_krutarth
              </span>
              <a
                href="https://www.instagram.com/raval_krutarth"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-1 flex gap-2 items-center bg-accent px-2 py-1 rounded-md metadata-font-size"
              >
                View <IoOpenOutline size={20} />
              </a>
            </div>
            <div className="flex items-center relative gap-2">
              <BsTwitterX size={20} />

              <span className="ml-2 text-secondary-theme metadata-font-size">
                krutarth_raval
              </span>
              <a
                href="https://x.com/_krutarth_raval"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-1 flex gap-2 items-center bg-accent px-2 py-1 rounded-md metadata-font-size"
              >
                View <IoOpenOutline size={20} />
              </a>
            </div>
            <div className="flex items-center relative gap-2">
              <FaPinterestP size={20} />
              <span className="ml-2 text-secondary-theme metadata-font-size">
                krutarth_raval
              </span>
              <a
                href="https://pin.it/5kGuOJuRk"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-1 flex gap-2 items-center bg-accent px-2 py-1 rounded-md metadata-font-size"
              >
                View <IoOpenOutline size={20} />
              </a>
            </div>
          </div>
        </div>
       
        <ContactForm />

        <div className="mt-10 text-center mb-5">
          <p className="normal-font-size text-theme-secondary mb-2">
            Not ready to send a message yet?
          </p>
          <a
            href="/about"
            className="metadata-font-size border-theme-accent border-2 py-2 inline-block px-2 rounded-md "
          >
            <span></span>
            Learn more about me
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
