import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import "../src/App.css";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect";
const App = () => {
  return (
    <div className="flex justify-center">
      <div className="absolute inset-0 -z-0 overflow-hidden ">
        <BackgroundRippleEffect />
      </div>
      <div className="relative flex justify-center w-max">
        <div
          className="bg-surface  p-3 max-sm:p-2 md:p-4 rounded-xl
                   mx-auto w-full 
                   max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[800px] xl:max-w-[1000px] 
                   max-sm:my-1 max-sm:mx-2 sm:my-2 md:my-4 lg:my-10 overflow-hidden"
        >
          <Navbar />

          {/* ✅ Routes added here */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
