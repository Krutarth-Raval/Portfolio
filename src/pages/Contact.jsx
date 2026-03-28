import React from "react";
import { motion } from "framer-motion";
import { IoLocationSharp, IoOpenOutline } from "react-icons/io5";
import { RiLinkedinFill } from "react-icons/ri";
import { GrInstagram } from "react-icons/gr";
import { PiGithubLogoFill } from "react-icons/pi";
import ContactForm from "@/UI/ContactForm";

const contactInfo = [
  {
    icon: <RiLinkedinFill size={24} />,
    label: "LinkedIn",
    value: "Krutarth Raval",
    href: "https://www.linkedin.com/in/raval-krutarth/",
    color: "#0077B5",
  },
  {
    icon: <PiGithubLogoFill size={24} />,
    label: "GitHub",
    value: "Krutarth-Raval",
    href: "https://github.com/Krutarth-Raval",
    color: "#333",
  },
  {
    icon: <GrInstagram size={24} />,
    label: "Instagram",
    value: "raval_krutarth",
    href: "https://www.instagram.com/raval_krutarth",
    color: "#E4405F",
  },
  {
    icon: <IoLocationSharp size={24} />,
    label: "Location",
    value: "Ahmedabad, India",
    href: "https://maps.app.goo.gl/VVGJ8iKMzXpnKqzU8",
    color: "#EA4335",
  },
];

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="mt-2 px-4 max-w-5xl mx-auto flex flex-col gap-24 overflow-visible">

      {/* Main Large Call to Action / Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ContactForm />
      </motion.div>

      {/* Redesigned Intro & Links Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="description-font-size font-black uppercase tracking-widest text-theme">
              Connect With Me
            </h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold text-theme leading-tight tracking-tighter"
          >
            Let's turn your <span className="text-accent underline underline-offset-8 decoration-accent/20">vision</span> into reality.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="normal-font-size text-theme/60 font-medium leading-relaxed max-w-lg"
          >
            I'm always open to discussing new projects, creative ideas or original opportunities to be part of your visions.
          </motion.p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-glossy border border-white/5 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl -z-10 group-hover:bg-accent/10 transition-colors duration-500" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white/5 text-theme/40 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
                    {info.icon}
                  </div>
                  <IoOpenOutline className="text-theme/20 group-hover:text-accent transition-colors duration-300" size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-theme/30 mb-1">
                    {info.label}
                  </p>
                  <h3 className="text-sm font-bold text-theme group-hover:text-accent transition-colors duration-300">
                    {info.value}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>


      {/* Minimalist Footer Navigation */}
      <div className="pt-16 pb-8 flex flex-col items-center gap-4 border-t border-white/5 opacity-60">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-theme/40 text-center">
          Want to learn more?
        </p>
        <a
          href="/about"
          className="text-xs font-bold py-2 px-6 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all duration-300"
        >
          Explore About Me
        </a>
      </div>
    </section>
  );
};

export default Contact;
