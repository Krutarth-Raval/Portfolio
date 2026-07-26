import React, { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMonitor, FiCloud, FiSettings, FiShoppingCart, FiCpu } from "react-icons/fi";

const servicesData = [
  {
    title: "WEB APPS",
    description: "Architecting lightning-fast, highly scalable custom web applications tailored precisely to your complex business requirements.",
    icon: FiMonitor
  },
  {
    title: "SAAS PLATFORMS",
    description: "Building robust subscription-based platforms, internal tools, and customer portals with intuitive user experiences.",
    icon: FiCloud
  },
  {
    title: "AUTOMATIONS",
    description: "Digitizing workflows, task management, approvals, and operational processes to save time and reduce errors.",
    icon: FiSettings
  },
  {
    title: "E-COMMERCE",
    description: "Developing highly converting online stores, robust product management systems, and frictionless end-to-end order workflows.",
    icon: FiShoppingCart
  },
  {
    title: "INTEGRATIONS",
    description: "Seamlessly connecting third-party services, APIs, and platforms to unify your digital ecosystem.",
    icon: FiCpu
  }
];

const Services = () => {
  const [activeItem, setActiveItem] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // There are 5 items, so each gets 20% of the scroll progress
    const index = Math.min(servicesData.length - 1, Math.floor(latest * servicesData.length));
    if (index !== activeItem) {
      setActiveItem(index);
    }
  });

  return (
    <div id="services" ref={containerRef} className="w-full relative h-[300vh] select-none">
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center py-24 lg:py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center w-full">
        {/* Centered Title Section */}
        <motion.div
          className="flex flex-col items-center justify-center text-center w-full mb-12 md:mb-20 z-40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-theme leading-none tracking-tight">
            What I Do
          </h2>
        </motion.div>

        {/* Services Accordion List */}
        <div className="w-full max-w-6xl h-[650px] md:h-[550px] flex flex-col md:flex-row gap-3 md:gap-4 relative mt-4">
          {servicesData.map((service, index) => (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                opacity: { duration: 0.6, delay: index * 0.15, ease: "easeOut" },
                y: { duration: 0.6, delay: index * 0.15, ease: "easeOut" },
                layout: { type: "spring", stiffness: 250, damping: 30 }
              }}
              onClick={() => setActiveItem(index)}
              className={`relative cursor-pointer rounded-[1.5rem] md:rounded-[2rem] border border-[var(--theme-btn-border)] overflow-hidden group backdrop-blur-xl
                ${activeItem === index 
                  ? "flex-[6] md:flex-[5] bg-[var(--theme-btn-bg)] shadow-[0_0_30px_rgba(255,255,255,0.02)]" 
                  : "flex-[1] bg-transparent hover:bg-[var(--theme-btn-bg)]"}
              `}
            >
              {/* Inactive Content */}
              <div 
                className={`absolute inset-0 flex items-center md:items-start md:justify-center
                  ${activeItem === index ? "opacity-0 transition-none pointer-events-none" : "opacity-100 transition-opacity duration-500 delay-300"}
                `}
              >
                <div className="flex items-center md:flex-col md:justify-between gap-6 md:gap-0 md:h-full w-full px-6 md:px-0 py-0 md:py-8">
                  {/* Number */}
                  <span className="text-sm md:text-base font-black text-indigo-500">
                    0{index + 1}
                  </span>
                  {/* Title (Horizontal on mobile, Vertical on desktop) */}
                  <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-theme-secondary md:[writing-mode:vertical-rl] md:rotate-180 whitespace-nowrap">
                    {service.title}
                  </span>
                </div>
              </div>

              {/* Active Content */}
              <div 
                className={`absolute inset-0 flex flex-col justify-between p-4 md:p-8
                  ${activeItem === index ? "opacity-100 transition-opacity duration-500 delay-300" : "opacity-0 transition-none pointer-events-none"}
                `}
              >
                {/* Top: Number */}
                <div className="w-full flex justify-center mt-2 md:mt-0">
                  <span className="text-base md:text-lg font-black text-indigo-500">
                    0{index + 1}
                  </span>
                </div>
                
                {/* Middle: Icon */}
                <div className="flex-1 flex items-center justify-center">
                  <service.icon className="w-16 h-16 md:w-32 md:h-32 text-indigo-500/40 md:text-indigo-500/20" strokeWidth={1.5} />
                </div>

                {/* Bottom: Title & Desc Card */}
                <div className="w-full bg-[var(--theme-bg)]/60 backdrop-blur-xl border border-[var(--theme-btn-border)] rounded-2xl p-4 md:p-6 shadow-xl">
                  <h3 className="text-xl md:text-3xl font-extrabold text-theme tracking-tight mb-2 md:mb-3">
                    {service.title}
                  </h3>
                  <div className="w-8 md:w-12 h-1 bg-indigo-500 rounded-full mb-3 md:mb-4"></div>
                  <p className="text-xs md:text-sm text-theme-secondary/90 leading-relaxed md:leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Services;
