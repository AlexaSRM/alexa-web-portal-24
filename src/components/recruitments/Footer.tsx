import React from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    (
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center px-8 md:px-16">

          {/* Left Side - Embrace the FUTURE */}
          <div className="text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold leading-tight">
              Embrace the <br />
              <span className="text-blue-400 text-[50px]">FUTURE.</span>
            </h2>
          </div>

          {/* Right Side - Contact Information */}
          <div className="text-left md:text-right">
            <p className="text-gray-400 mb-4">Got any queries? Contact us at</p>

            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-6">
              {/* Instagram */}
              <div className="flex items-center space-x-2">
                <FaInstagram className="text-blue-400" />
                <span>@alexadevsrm</span>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-400" />
                <a href="mailto:hello@alexadevsrm.com" className="hover:text-blue-400">
                  hello@alexadevsrm.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
