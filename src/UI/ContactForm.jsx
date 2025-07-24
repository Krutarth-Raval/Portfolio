import { keyframes, motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";

const ContactForm = () => {
  const [result, setResult] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult(
        "Thanks for reaching out! I'll get in touch with you as soon as possible."
      );

      event.target.reset();
    } else {
      setResult("Failed to submit. Please try again.");
    }

    setIsDialogOpen(true);
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="p-2 flex flex-col mt-6">
      <p className="description-font-size font-bold border-b border-[var(--theme-accent)] w-full py-2">
        Quick Message
      </p>
 <p className="normal-font-size font-normal text-center text-theme-secondary mt-10 ">
          <span className="font-semibold">Got something to say?</span> Send a
          quick message below.
        </p>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4 }}
        className=" mt-5 bg-glossy rounded-lg flex justify-center "
      >
        <motion.form
          onSubmit={onSubmit}
          ref={ref}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex  flex-col gap-4 mt-4 mb-10 max-sm:mb-1 form "
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 font-normal">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              required
              className="input-field placeholder:font-light"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-normal">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              required
              className="input-field placeholder:font-light"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="mb-1 font-normal">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="4"
              autoComplete="off"
              required
              className="input-field placeholder:font-light"
              placeholder="Let me know how I can help you..."
            />
          </div>

          <div className="relative flex justify-center mb-3">
            <button
              type="submit"
              className="absolute p-2 w-max border send right-0 max-sm:relative rounded-md font-semibold cursor-pointer bg-accent px-10"
            >
              Send
            </button>
          </div>
        </motion.form>
      </motion.div>

      {/* Popup Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 pop-up flex items-center justify-center z-50">
          <div className="pop-up-block p-6 rounded-xl shadow-lg max-sm:w-[350px] max-w-md text-center">
            <p className=" metadata-font-size mb-4 font-medium">{result}</p>
            <button
              onClick={() => setIsDialogOpen(false)}
              className=" more-btn font-bold px-6 py-2 mt-4 rounded-md"
            >
              OKAY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
