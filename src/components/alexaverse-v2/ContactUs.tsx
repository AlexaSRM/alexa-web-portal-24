"use client";

import React, { useEffect, useState } from "react";
import { HiSparkles, HiHeart, HiArrowUp } from "react-icons/hi";

const ContactUs: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialIcons = [
    {
      src: "/alexaverse2.0/Instagram.svg",
      alt: "Instagram",
      link: "https://www.instagram.com/alexadevsrm/",
      color: "from-pink-500 to-purple-600",
      hoverColor: "from-pink-400 to-purple-500"
    },
    {
      src: "/alexaverse2.0/Mail.svg",
      alt: "Mail",
      link: "mailto:alexadevsrm@gmail.com",
      color: "from-blue-500 to-cyan-600",
      hoverColor: "from-blue-400 to-cyan-500"
    },
    {
      src: "/alexaverse2.0/Linkedin.svg",
      alt: "LinkedIn",
      link: "https://www.linkedin.com/company/alexadevsrm/posts/",
      color: "from-blue-600 to-blue-800",
      hoverColor: "from-blue-500 to-blue-700"
    },
    {
      src: "/alexaverse2.0/X.svg",
      alt: "X",
      link: "https://x.com/alexadevsrm",
      color: "from-gray-700 to-black",
      hoverColor: "from-gray-600 to-gray-800"
    },
    {
      src: "/alexaverse2.0/Youtube.svg",
      alt: "YouTube",
      link: "https://www.youtube.com/@alexadevsrm",
      color: "from-red-500 to-red-700",
      hoverColor: "from-red-400 to-red-600"
    },
    {
      src: "/alexaverse2.0/Facebook.svg",
      alt: "Facebook",
      link: "https://www.facebook.com/alexadevsrm",
      color: "from-blue-600 to-blue-800",
      hoverColor: "from-blue-500 to-blue-700"
    },
  ];

  if (!mounted) return null;

  return (
    <section
      id="contact"
      className="w-full min-h-screen text-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Section Header */}
      <div className="text-center mb-12 animate-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-3 mb-4">
          <HiSparkles className="text-4xl text-purple-400 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-audiowide">
            <span className="bg-gradient-to-r from-[#563AFF] via-[#AA44BB] to-[#FF4E78] bg-clip-text text-transparent">
              Get in
            </span>{" "}
            <span className="bg-gradient-to-r from-[#FF4E78] via-[#AA44BB] to-[#563AFF] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <HiSparkles className="text-4xl text-purple-400 animate-pulse" />
        </div>
        <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto">
          Connect with us and be part of the Alexaverse community
        </p>
      </div>

      {/* 🖼️ Alexa Logo for Mobile */}
      <div className="animate-in slide-in-from-bottom-8 duration-1000 delay-300">
        <img
          src="/alexaverse2.0/alexa-logo-contact.svg"
          alt="Alexa Logo"
          className="w-[180px] h-[180px] object-contain mb-4 sm:hidden hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* 📝 Heading (only for mobile) */}
      <h1 className="text-3xl font-audiowide text-center mb-6 sm:hidden animate-in slide-in-from-bottom-8 duration-1000 delay-400">
        Contact Us
      </h1>

      {/* Enhanced Social Icons Section */}
      <div className="w-full max-w-[1600px] px-4 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
        <div className="hidden sm:flex justify-center items-center gap-[6rem] flex-wrap mb-12">
          {/* Left Side Social Icons */}
          {socialIcons.slice(0, 3).map((icon, index) => (
            <a
              key={index}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hover:scale-110 transition-all duration-300 animate-in slide-in-from-left-8 duration-1000"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <div className={`w-[80px] h-[80px] rounded-full bg-gradient-to-br ${icon.color} group-hover:bg-gradient-to-br ${icon.hoverColor} flex items-center justify-center cursor-pointer shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="w-[40px] h-[40px] object-contain translate-y-1 relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
                {/* Floating Sparkles */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <HiSparkles className="text-white text-sm animate-pulse" />
                </div>
              </div>
            </a>
          ))}

          {/* Center Logo */}
          <div className="animate-in slide-in-from-bottom-8 duration-1000 delay-700">
            <img
              src="/alexaverse2.0/alexa-logo-contact.svg"
              alt="Alexa Logo"
              className="w-[280px] h-[280px] object-contain hover:scale-110 transition-transform duration-500 animate-pulse"
            />
          </div>

          {/* Right Side Social Icons */}
          {socialIcons.slice(3).map((icon, index) => (
            <a
              key={index + 3}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hover:scale-110 transition-all duration-300 animate-in slide-in-from-right-8 duration-1000"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <div className={`w-[80px] h-[80px] rounded-full bg-gradient-to-br ${icon.color} group-hover:bg-gradient-to-br ${icon.hoverColor} flex items-center justify-center cursor-pointer shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="w-[40px] h-[40px] object-contain translate-y-1 relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
                {/* Floating Sparkles */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <HiSparkles className="text-white text-sm animate-pulse" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Social Icons Grid */}
        <div className="sm:hidden grid grid-cols-3 gap-6 mb-8 animate-in slide-in-from-bottom-8 duration-1000 delay-600">
          {socialIcons.map((icon, index) => (
            <a
              key={index}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hover:scale-110 transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className={`w-[60px] h-[60px] rounded-full bg-gradient-to-br ${icon.color} group-hover:bg-gradient-to-br ${icon.hoverColor} flex items-center justify-center cursor-pointer shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden mx-auto`}>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="w-[30px] h-[30px] object-contain translate-y-1 relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="text-center animate-in slide-in-from-bottom-8 duration-1000 delay-800">
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-4xl mx-auto">
          <p className="text-center text-[14px] sm:text-xl font-nunito text-white font-semibold px-4 whitespace-nowrap mb-4">
            Designed and Developed with{" "}
            <HiHeart className="inline-block text-red-500 animate-pulse mx-1" />
            by{" "}
            <span className="bg-gradient-to-r from-[#C5126C] via-[#7942FF] to-[#CAFB12] bg-clip-text text-transparent font-bold">
              Alexa Developers SRM.
            </span>
          </p>
          <p className="text-gray-300 text-sm sm:text-base font-inter">
            Join our community and stay updated with the latest tech innovations!
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 right-8 animate-in slide-in-from-bottom-8 duration-1000 delay-1000">
        <a
          href="#home"
          className="group w-12 h-12 bg-gradient-to-r from-[#563AFF] to-[#FF4E78] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 hover:shadow-2xl"
        >
          <HiArrowUp className="text-xl group-hover:-translate-y-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
};

export default ContactUs;
