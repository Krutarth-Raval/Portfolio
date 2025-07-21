import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact"; // Make sure this exists or create a placeholder
import "../src/App.css";
import Introduction from "./components/Introduction";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex justify-center ">
      <div
        className="bg-surface  p-3 max-sm:p-2 md:p-4 rounded-xl
                   mx-auto w-full 
                   max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[800px] xl:max-w-[1000px] 
                   max-sm:my-1 max-sm:mx-2 sm:my-2 md:my-4 lg:my-10 overflow-hidden"
      >
        <Navbar />

        {/* ✅ Routes added here */}
        <Routes>
          <Route path="/" element={<Home/>}/>
        
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
        <Footer/>
      </div>
    </div>
  );
};

export default App;
