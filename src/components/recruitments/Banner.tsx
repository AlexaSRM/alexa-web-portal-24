import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div id="banner" className="flex flex-col md:flex-row justify-between items-center px-5 md:px-10 py-20 bg-black h-[calc(100vh-80px)]">
      {/* Left side: Text content */}
      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
        <h1 className="text-5xl md:text-8xl font-extrabold bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent">
          Recruitments <span className="text-white">‘24</span>
        </h1>
        <p className="text-white text-xl md:text-2xl mt-5 max-w-[600px]">
          The official developers’ club of Amazon Alexa at SRMIST is now open to recruiting first and second year students!
        </p>
        <a
          href="https://lu.ma/event/evt-EQTXfYbxktqOuHt"
          data-luma-action="checkout"
          data-luma-event-id="evt-EQTXfYbxktqOuHt"
          className="luma-checkout--button mt-10 max-w-[200px] bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] text-white py-4 px-10 rounded-full text-[16px] md:text-[20px] font-bold no-underline transition-all duration-300 hover:bg-gradient-to-r hover:from-[#00CDC1] hover:to-[#00B5FF] flex justify-center items-center"
        >
          Apply Now
        </a>
      </div>

      {/* Right side: Background image */}
      <div className="relative w-full md:w-[400px] h-[400px] mt-10 md:mt-0">
        <img
          src="/recruitment/Vector.png"
          alt="Alexa Background"
          className="absolute right-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
