import { useInView, motion } from "framer-motion";
import React, { useRef } from "react";


const Greeting = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const isView = useInView(ref, { once: true });
  const isView2 = useInView(ref2, { once: true });
  const isView3 = useInView(ref3, { once: true });
  return (
    <div className="mt-5 p-2 pt-5 flex-col items-center ">
      <motion.section
        ref={ref2}
        initial={{ opacity: 0, x: 50 }}
        animate={isView2 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-10 w-full"
      >
        <p className="bg-glossy p-2 rounded-md font-light metadata-font-size  mx-auto">
          Thanks for reading this far — I genuinely appreciate your time. If you
          think we’d be a good fit for a project, job, or just a chat, don’t
          hesitate to reach out.
          <a
            href="/contact"
            className="metadata-font-size ml-1 underline font-bold cursor-pointer hover:text-blue-700 duration-300"
          >
            Contact
          </a>
        </p>
      </motion.section>
      <motion.p
        ref={ref3}
        initial={{ opacity: 0, y: 50 }}
        animate={isView3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="italic text-theme-secondary mt-10 text-center metadata-font-size"
      >
        "Keep building. Keep growing. Stay curious."
      </motion.p>
    </div>
  );
};

export default Greeting;
