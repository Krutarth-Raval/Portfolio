import React from "react";
import Card from "@/UI/Card";
const Testimonials = () => {
  return (
    <div className="p-2 flex flex-col justify-start mt-6">
      <p className="description-font-size font-bold  border-b border-[var(--theme-accent)] w-full py-2">
        What They Say About Me
      </p>

      <div className=" justify-center mt-2 flex flex-nowrap ">
        <Card />
      </div>
    </div>
  );
};

export default Testimonials;
