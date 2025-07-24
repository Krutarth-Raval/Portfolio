import React from "react";
import { IoCall, IoLocationSharp, IoOpenOutline } from "react-icons/io5";
import { RiLinkedinFill } from "react-icons/ri";
import { GrInstagram } from "react-icons/gr";
import { SiGmail } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import ContactForm from "@/UI/ContactForm";

const contactInfo = [
  {
    icon: <RiLinkedinFill size={20} />,
    label: "Krutarth Raval",
    href: "https://www.linkedin.com/in/raval-krutarth/",
  },
  {
    icon: <SiGmail size={20} />,
    label: "ravalkrutarth95@gmail.com",
    href: "mailto:ravalkrutarth95@gmail.com",
  },
  {
    icon: <IoCall size={20} />,
    label: "+91 6355330833",
    href: "tel:+916355330833",
  },
  {
    icon: <IoLocationSharp size={20} />,
    label: "Ahmadabad, Gujarat, India",
    href: "https://maps.app.goo.gl/VVGJ8iKMzXpnKqzU8",
  },
  {
    icon: <PiGithubLogoFill size={20} />,
    label: "Krutarth-Raval",
    href: "https://github.com/Krutarth-Raval",
  },
  {
    icon: <GrInstagram size={20} />,
    label: "raval_krutarth",
    href: "https://www.instagram.com/raval_krutarth",
  },
  {
    icon: <BsTwitterX size={20} />,
    label: "krutarth_raval",
    href: "https://x.com/_krutarth_raval",
  },
  {
    icon: <FaPinterestP size={20} />,
    label: "krutarth_raval",
    href: "https://pin.it/5kGuOJuRk",
  },
];

const ContactLink = ({ icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center py-2 px-2 rounded-md gap-3 group hover:opacity-80 transition hover:scale-101 hover:bg-[var(--theme-bg)]"
  >
    <span className="text-theme-secondary">{icon}</span>
    <span className="metadata-font-size text-theme-secondary group-hover:underline">
      {label}
    </span>
    <IoOpenOutline
      size={20}
      className="ml-auto text-theme opacity-90"
    />
  </a>
);

const Contact = () => {
  return (
    <section className="mt-16 px-4  mx-auto flex flex-col gap-12">
      {/* Intro */}
      <div>
        <h2 className="description-font-size font-bold mb-2 border-b-1 border-theme-accent pb-2">
          Let’s Get In Touch
        </h2>
        <p className="normal-font-size text-theme-secondary ">
          Whether it’s a project idea, collaboration, or just a friendly
          hello—feel free to reach out. I’m always open to meaningful
          connections.
        </p>
      </div>

      {/* Contact Links */}
      <div className="flex flex-col gap-3">
        {contactInfo.map((item, index) => (
          <ContactLink key={index} {...item} />
        ))}
      </div>

      {/* Contact Form without heading */}
      <div>
        <ContactForm />
      </div>

      {/* Footer line with button */}
      <div className=" flex gap-3 flex-col items-center">
        <p className="metadata-font-size text-theme-secondary">
          Want to learn more before we connect?
        </p>
        <a
          href="/about"
          className="metadata-font-size  py-2 px-3 border rounded-md hover:scale-103 hover:opacity-90 hover:bg-theme duration-200 "
        >
          Learn About Me
        </a>
      </div>
    </section>
  );
};

export default Contact;
