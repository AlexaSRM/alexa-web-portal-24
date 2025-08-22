"use client";

import React from "react";
import Image from "next/image";

const ContactUs: React.FC = () => {
  const socialIcons = [
    {
      src: "/alexaverse2.0/Instagram.svg",
      alt: "Instagram",
      link: "https://www.instagram.com/alexadevsrm/",
    },
    {
      src: "/alexaverse2.0/Mail.svg",
      alt: "Mail",
      link: "mailto:alexadevsrm@gmail.com",
    },
    {
      src: "/alexaverse2.0/Linkedin.svg",
      alt: "LinkedIn",
      link: "https://www.linkedin.com/company/alexadevsrm/posts/",
    },
    {
      src: "/alexaverse2.0/X.svg",
      alt: "X",
      link: "https://x.com/alexadevsrm",
    },
    {
      src: "/alexaverse2.0/Youtube.svg",
      alt: "YouTube",
      link: "https://www.youtube.com/@alexadevsrm",
    },
    {
      src: "/alexaverse2.0/Facebook.svg",
      alt: "Facebook",
      link: "https://www.facebook.com/alexadevsrm",
    },
  ];

  return (
    <section
      id="contact"
      className="w-full min-h-screen text-white flex flex-col items-center justify-center px-4 py-16"
    >
      {/* 🖼️ Alexa Logo for Mobile */}
      <Image
        src="/alexaverse2.0/alexa-logo-contact.svg"
        alt="Alexa Logo"
        width={180}
        height={180}
        className="w-[180px] h-[180px] object-contain mb-4 sm:hidden"
      />

      {/* 📝 Heading (only for mobile,) */}
      <h1 className="text-3xl font-audiowide text-center mb-6 sm:hidden">
        Contact Us
      </h1>

      {/* Social Icons Section */}
      <div className="w-full max-w-[1600px] px-4">
        <div className="hidden sm:flex justify-center items-center gap-[6rem] flex-wrap mb-12">
         
          {socialIcons.slice(0, 3).map((icon, index) => (
            <a
              key={index}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
            >
              <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#563AFF] to-[#FF4E78] flex items-center justify-center cursor-pointer">
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] object-contain translate-y-1"
                />
              </div>
            </a>
          ))}

          
          <Image
            src="/alexaverse2.0/alexa-logo-contact.svg"
            alt="Alexa Logo"
            width={280}
            height={280}
            className="w-[280px] h-[280px] object-contain"
          />

          
          {socialIcons.slice(3).map((icon, index) => (
            <a
              key={index + 3}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
            >
              <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#563AFF] to-[#FF4E78] flex items-center justify-center cursor-pointer">
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] object-contain translate-y-1"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Mobile view */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-6 sm:hidden mb-10 justify-items-center">
          {socialIcons.map((icon, index) => (
            <a
              key={index}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
            >
              <div className="w-[65px] h-[65px] rounded-full bg-gradient-to-br from-[#563AFF] to-[#FF4E78] flex items-center justify-center cursor-pointer">
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={32}
                  height={32}
                  className="w-[32px] h-[32px] object-contain translate-y-1"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 📝 Heading (for desktop) */}
      <h1 className="hidden sm:block text-5xl font-audiowide text-center mb-12 mt-6">
        Contact Us
      </h1>

      {/* Footer */}
      <p className="text-center text-[14px] sm:text-xl font-nunito text-white font-semibold mt-6 whitespace-nowrap">
        Designed and Developed by{" "}
        <span className="bg-gradient-to-r from-[#C5126C] via-[#7942FF] to-[#306EF9] bg-clip-text text-transparent font-bold">
          Alexa Developers SRM.
        </span>
      </p>
    </section>
  );
};

export default ContactUs;
