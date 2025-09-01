import React from "react";

const Footer = () => {
  return (
    <div className="mt-10 bg-theme p-2 rounded-xl pt-6 pb-4 text-center text-theme-secondary text-sm flex flex-wrap sm:justify-between justify-center">
      <p className="mb-2 metadata-font-size">
        Let's connect and build something great.
      </p>
      <div className="flex flex-col items-center">
        <p className="metadata-font-size">
          Portfolio by{" "}
          <span className="logo-name font-bold">Krutarth Raval</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
