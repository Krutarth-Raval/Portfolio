import { Mail, Copy, Check, Send } from "lucide-react";
import { RiLinkedinFill } from "react-icons/ri";
import { PiGithubLogoFill } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import { GrInstagram } from "react-icons/gr";
import { motion } from "framer-motion";
import { useState } from "react";

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
    <div id="contact" className="min-h-[90vh] flex flex-col justify-center py-10 px-6 max-w-6xl mx-auto w-full select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column - Sticky Details */}
        <motion.div 
          className="lg:col-span-5 lg:sticky lg:top-16 flex flex-col gap-4 text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">06 / Get In Touch</span>
            <div className="h-px bg-accent/20 flex-1"></div>
          </div>
          <h2 className="title-font-size font-extrabold text-theme leading-none tracking-tight">
            Contact Me
          </h2>
          <p className="normal-font-size text-theme-secondary/80 font-medium leading-relaxed max-w-md mt-2">
            Ready to build something extraordinary together? Whether you have a specific project in mind or just want to say hello, my inbox is always open.
          </p>
        </motion.div>

        {/* Right Column - Contact Card */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full gap-8 relative mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full relative group"
          >
            {/* Main Card */}
            <div className="btn-glossy p-6 sm:p-10 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group-hover:border-[var(--theme-accent)]/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">

              {/* Background Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),var(--theme-accent)/10,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 relative z-10">
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

              <div className="flex flex-col items-center gap-3 relative z-10 shrink-0">
                <div className="flex items-center gap-3 w-full">
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
                </div>
                
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-theme text-theme p-3 px-5 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] shadow-lg hover:shadow-[0_0_15px_var(--theme-accent)]/20 transition-all duration-300 w-full cursor-pointer"
                >
                  Send Mail
                  <Send className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full border border-[var(--theme-btn-border)] opacity-20 hidden sm:block pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full border border-[var(--theme-btn-border)] opacity-10 hidden sm:block pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex flex-col md:flex-row items-center justify-between gap-6 btn-glossy p-6 sm:p-8 rounded-[32px] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),var(--theme-accent)/5,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex flex-col gap-1 text-center md:text-left relative z-10">
              <span className="text-[var(--theme-accent)] font-bold text-[10px] uppercase tracking-widest opacity-80">
                Connect
              </span>
              <h3 className="text-lg font-bold text-[var(--theme-text-secondary)] tracking-tight">
                Social Networks
              </h3>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <a href="https://www.linkedin.com/in/raval-krutarth" target="_blank" rel="noopener noreferrer" className="p-3.5 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-xl text-xl cursor-pointer hover:text-accent hover:-translate-y-1 transition-all duration-300">
                <RiLinkedinFill />
              </a>
              <a href="https://github.com/Krutarth-Raval" target="_blank" rel="noopener noreferrer" className="p-3.5 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-xl text-xl cursor-pointer hover:text-accent hover:-translate-y-1 transition-all duration-300">
                <PiGithubLogoFill />
              </a>
              <a href="https://www.instagram.com/raval_krutarth" target="_blank" rel="noopener noreferrer" className="p-3.5 bg-[var(--theme-btn-bg)] border border-[var(--theme-btn-border)] rounded-xl text-xl cursor-pointer hover:text-accent hover:-translate-y-1 transition-all duration-300">
                <GrInstagram />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactBox;
