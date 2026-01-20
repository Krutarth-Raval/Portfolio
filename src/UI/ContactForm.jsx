import { Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ContactBox = () => {
  const email = "ravalkrutarth95@gmail.com";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="p-2 flex flex-col justify-start mt-6">
      <p className="description-font-size font-bold  border-b border-[var(--theme-accent)] w-full py-2">
        Email Me
      </p>
      <p className="normal-font-size text-theme font-light ">
        Have a project, opportunity, or collaboration in mind?
      </p>
      <div className="flex justify-center">
        <motion.a
          ref={ref}
          href={`mailto:${email}`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="
        relative
        flex items-center gap-4 justify-center
        w-full max-w-md
        p-4 mt-6
        rounded-xl
        bg-glossy
        border border-[var(--theme-accent)]
        cursor-pointer
        group
        overflow-hidden
      "
        >
          {/* Glow accent */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top_left,var(--theme-accent),transparent_70%)]" />
          {/* Text */}
          <div className="relative z-10 flex flex-col">
            <span className="normal-font-size font-light text-theme opacity-80">
              {email}
            </span>
          </div>{" "}
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-lg bg-accent">
            <Mail className="w-6 h-6 text-theme-secondary" />
          </div>
        </motion.a>
      </div>
    </div>
  );
};

export default ContactBox;
