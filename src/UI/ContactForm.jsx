import { Mail, Copy, Check, Send } from "lucide-react";
import { RiLinkedinFill } from "react-icons/ri";
import { PiGithubLogoFill } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import { GrInstagram } from "react-icons/gr";
import { motion } from "framer-motion";
import { useState } from "react";
import { Map, MapMarker, MarkerContent, MapControls } from "@/components/ui/Map";

const cartoDarkRaster = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      ],
      tileSize: 256,
      attribution: "&copy; CARTO",
    },
  },
  layers: [
    {
      id: "carto",
      type: "raster",
      source: "carto",
    },
  ],
};

const ContactBox = () => {
  const email = "ravalkrutarth95@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="contact" className="min-h-[90vh] flex flex-col justify-center py-20 px-6 max-w-7xl mx-auto w-full select-none">
      <div className="flex flex-col gap-12 lg:gap-16">
        
        {/* Header Section */}
        <motion.div 
          className="flex flex-col gap-4 text-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-theme leading-none tracking-tight">
            Contact Me
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full">
          
          {/* Left Column - Gorgeous Map */}
          <motion.div 
            className="order-last lg:order-first lg:col-span-7 w-full min-h-[400px] lg:min-h-[500px] rounded-[32px] overflow-hidden border border-[var(--theme-btn-border)] relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] group flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),var(--theme-accent)/10,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            
            <Map
              styles={{ dark: cartoDarkRaster, light: cartoDarkRaster }}
              viewport={{ center: [72.5714, 23.0225], zoom: 11, pitch: 45, bearing: -15 }}
              className="w-full h-full flex-1"
            >
              <MapControls position="bottom-right" showCompass={false} />
              
              {/* Pinging Marker on Ahmedabad */}
              <MapMarker longitude={72.5714} latitude={23.0225}>
                <MarkerContent>
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    {/* Ping Animation */}
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--theme-accent)] opacity-75"></span>
                    {/* Inner Dot */}
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-[var(--theme-accent)] border-2 border-[var(--theme-bg)] shadow-[0_0_15px_rgba(var(--theme-accent-rgb),0.5)]"></span>
                  </div>
                </MarkerContent>
              </MapMarker>
            </Map>
            
            {/* Overlay Badge */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <div className="bg-[var(--theme-bg)]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[var(--theme-btn-border)] shadow-lg flex items-center gap-3">
                 <span className="relative flex h-2.5 w-2.5">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                 </span>
                 <span className="text-[10px] font-bold text-theme uppercase tracking-widest">Ahmedabad, India</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="w-full relative group"
            >
              <div className="btn-glossy p-8 sm:p-10 rounded-[32px] flex flex-col gap-8 relative overflow-hidden group-hover:border-[var(--theme-accent)]/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),var(--theme-accent)/10,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col text-left gap-2 relative z-10">
                  <span className="text-[var(--theme-accent)] font-bold text-[10px] uppercase tracking-widest opacity-80 mb-1">
                    Direct Email
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--theme-text-secondary)] tracking-tight group-hover:text-[var(--theme-text)] transition-colors duration-300">
                    {email}
                  </h3>
                  <p className="text-theme-secondary text-xs sm:text-sm font-medium opacity-60">
                    Send me a message anytime. I'll get back to you ASAP.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full">
                  <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glossy p-3 px-4 rounded-xl group/btn hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer flex-1 justify-center"
                    title="Copy Email"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 opacity-60 group-hover/btn:opacity-100" />
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover/btn:opacity-100">Copy</span>
                      </>
                    )}
                  </motion.button>
                  
                  <motion.a
                    href={`mailto:${email}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-theme text-theme p-3 px-5 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] shadow-lg hover:shadow-[0_0_15px_var(--theme-accent)]/20 transition-all duration-300 flex-1 cursor-pointer"
                  >
                    Send Mail
                    <Send className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 btn-glossy p-8 sm:p-10 rounded-[32px] group relative overflow-hidden hover:border-[var(--theme-accent)]/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),var(--theme-accent)/5,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col gap-1 text-center sm:text-left relative z-10">
                <span className="text-[var(--theme-accent)] font-bold text-[10px] uppercase tracking-widest opacity-80">
                  Connect
                </span>
                <h3 className="text-lg font-bold text-[var(--theme-text-secondary)] tracking-tight">
                  Social Networks
                </h3>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <a href="https://www.linkedin.com/in/raval-krutarth" target="_blank" rel="noopener noreferrer" className="p-4 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-xl text-xl cursor-pointer hover:text-accent hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-md">
                  <RiLinkedinFill />
                </a>
                <a href="https://github.com/Krutarth-Raval" target="_blank" rel="noopener noreferrer" className="p-4 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-xl text-xl cursor-pointer hover:text-accent hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-md">
                  <PiGithubLogoFill />
                </a>
                <a href="https://www.instagram.com/raval_krutarth" target="_blank" rel="noopener noreferrer" className="p-4 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-xl text-xl cursor-pointer hover:text-accent hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-md">
                  <GrInstagram />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBox;
