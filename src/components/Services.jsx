import React from "react";
import { motion } from "framer-motion";

const servicesData = [
  {
    title: "Web Application Development",
    description: "Custom web applications tailored to business requirements."
  },
  {
    title: "SaaS Product Development",
    description: "Building subscription-based platforms, internal tools, and customer portals."
  },
  {
    title: "Business Process Automation",
    description: "Digitizing workflows, task management, approvals, and operational processes."
  },
  {
    title: "E-Commerce Solutions",
    description: "Online stores, product management systems, and order workflows."
  },
  {
    title: "API Development & Integration",
    description: "Custom APIs and integration with third-party services and platforms."
  },
  {
    title: "Dashboard & Management Systems",
    description: "Admin panels, analytics dashboards, CRM-like systems, and internal management tools."
  }
];

const Services = () => {
  return (
    <div id="services" className="min-h-screen flex flex-col justify-center py-16 px-6 max-w-6xl mx-auto w-full select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column - Sticky Details */}
        <motion.div
          className="lg:col-span-5 sticky top-0 lg:top-16 z-40 flex flex-col gap-4 text-left pt-8 pb-20 -mt-8 -mx-6 px-6 mb-[40vh] lg:mb-0 lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:mt-0 bg-gradient-to-b from-[var(--theme-bg)] via-[var(--theme-bg)] via-75% to-transparent lg:bg-none"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">04 / Services</span>
            <div className="h-px bg-accent/20 flex-1"></div>
          </div>
          <h2 className="title-font-size font-extrabold text-theme leading-none tracking-tight">
            What I Do
          </h2>
          <p className="normal-font-size text-theme-secondary/80 font-medium leading-relaxed max-w-md mt-2">
            Delivering high-quality software solutions that drive business growth, optimize workflows, and enhance digital experiences.
          </p>
        </motion.div>

        {/* Right Column - Services List */}
        <div className="lg:col-span-7 flex flex-col gap-6 -mt-[40vh] lg:mt-0">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 6 }}
              className="premium-glow-card bg-glossy p-6 sm:p-8 flex flex-col justify-center group relative"
            >
              <h3 className="text-xl font-extrabold text-theme tracking-tight group-hover:text-accent transition-colors duration-300 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-theme-secondary/90 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
