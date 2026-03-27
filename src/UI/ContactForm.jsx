import { Mail, Copy, Check, Send } from "lucide-react";
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
    <section className="p-2 flex flex-col justify-start mt-20 mb-20 relative overflow-visible">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-[var(--theme-accent)] text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
        >
          Get In Touch
        </motion.div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme tracking-tighter leading-tight max-w-2xl px-4">
          Ready to build something <span className="text-[var(--theme-accent)]">extraordinary</span> together?
        </h2>
        <p className="text-theme-secondary opacity-60 max-w-lg text-sm sm:text-base px-6">
          Whether you have a specific project in mind or just want to say hello, my inbox is always open.
        </p>
      </div>

      <div className="flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl relative group"
        >
          {/* Main Card */}
          <div className="btn-glossy p-6 sm:p-10 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group-hover:border-[var(--theme-accent)]/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),var(--theme-accent)/10,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 relative z-10">
              <span className="text-[var(--theme-accent)] font-bold text-[10px] uppercase tracking-widest opacity-80 mb-1">
                Direct Email
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-theme tracking-tight group-hover:text-[var(--theme-accent)] transition-colors duration-300">
                {email}
              </h3>
              <p className="text-theme-secondary text-xs sm:text-sm font-medium opacity-60">
                Send me a message anytime. I'll get back to you ASAP.
              </p>
            </div>

            <div className="flex items-center gap-3 relative z-10 shrink-0">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glossy p-3 px-4 rounded-xl group/btn hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
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
                className="bg-theme text-theme p-3 px-5 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] shadow-lg hover:shadow-[0_0_15px_var(--theme-accent)]/20 transition-all duration-300 whitespace-nowrap"
              >
                Send Mail
                <Send className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full border border-white/5 opacity-20 hidden sm:block" />
          <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full border border-white/5 opacity-10 hidden sm:block" />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactBox;
