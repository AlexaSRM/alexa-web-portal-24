import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-black py-10 px-20 mt-12">
      {/* Top blue line */}
      <div className="border-t-4 border-[#00B5FF] mb-10"></div>
      
      <div className="flex justify-between items-center">
        {/* Left side: Text content */}
        <div className="text-white ml-30">
          <h1 className="text-4xl font-bold">
          Embrace the <br />
          <span className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-[50px]">FUTURE.</span>
          </h1>
        </div>

        {/* Right side: Contact info */}
        <div className="text-white text-[20px] text-right mr-30">
          <p className="mb-4">Got any queries? Contact us at</p>
          <p className="mb-3">
            <a href="https://www.instagram.com/alexadevsrm/" className="flex items-center space-x-2">
              <img src="/recruitment/insta.png" alt="Instagram" className="w-6 h-6" />
              <span>alexadevsrm</span>
            </a>
          </p>
          <p className="mb-3">
            <a href="mailto:alexadevsrm@gmail.com" className="flex items-center space-x-2">
              <img src="/recruitment/mail.png" alt="Email" className="w-6 h-6" />
              <span>hello@alexadevsrm.com</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
