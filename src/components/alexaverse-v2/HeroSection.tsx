"use client";

import React, { useEffect, useState } from "react";
import { HiMenu, HiX, HiSparkles, HiArrowDown } from "react-icons/hi";

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-transparent p-0 m-0 overflow-visible flex items-center justify-center"
    >
      {/* Enhanced Animated Background */}
      <div
        className="absolute inset-0 -z-10 animate-pulse"
        style={{
          background: `
            linear-gradient(214.78deg, #563AFF 6.26%, #AA44BB 32.5%, #FF4E78 68.75%, #663e0a 81%, #130025 95%),
            linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #130025 100%)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 animate-pulse"></div>

      {/* Navigation */}
      <nav
        className="absolute left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[1500px] px-6 animate-in slide-in-from-top-8 duration-1000"
        style={{ top: "25px" }}
      >
        <div className="flex justify-between items-center h-[74px]">
          {/* Logo with Animation */}
          <div className="animate-in slide-in-from-left-8 duration-1000 delay-300">
            <img
              src="/alexaverse2.0/alexa-logo-navbar.svg"
              alt="Alexa Logo"
              className="h-10 sm:h-12 w-auto hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-[32px] items-center animate-in slide-in-from-right-8 duration-1000 delay-500">
            <a
              href="/alexaverse-v2"
              className="text-white font-audiowide text-[24px] leading-[100%] hover:text-purple-300 transition-all duration-300 hover:scale-110 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#events"
              className="text-white font-audiowide text-[24px] leading-[100%] hover:text-purple-300 transition-all duration-300 hover:scale-110 relative group"
            >
              Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              className="text-white font-audiowide text-[24px] leading-[100%] hover:text-purple-300 transition-all duration-300 hover:scale-110 relative group"
            >
              Contact Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-white text-4xl hover:text-purple-300 transition-colors duration-300 animate-in slide-in-from-right-8 duration-1000 delay-500"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <HiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu with Enhanced Animation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#511e5b] via-[#1A052A] to-[#030645] z-50 flex flex-col justify-between items-center animate-in fade-in duration-300">
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-purple-300 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <HiX />
          </button>

          <div className="flex-grow flex flex-col items-center justify-center gap-10 mt-20">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-audiowide text-4xl hover:text-purple-300 transition-all duration-300 hover:scale-110 animate-in slide-in-from-top-8 duration-500 delay-200"
            >
              HOME
            </a>
            <a
              href="#events"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-audiowide text-4xl hover:text-purple-300 transition-all duration-300 hover:scale-110 animate-in slide-in-from-top-8 duration-500 delay-400"
            >
              OUR EVENTS
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-audiowide text-4xl hover:text-purple-300 transition-all duration-300 hover:scale-110 animate-in slide-in-from-top-8 duration-500 delay-600"
            >
              CONTACT US
            </a>
          </div>

          <p className="text-center text-[14px] sm:text-xl font-nunito text-white font-semibold px-4 whitespace-nowrap mb-6 animate-in slide-in-from-bottom-8 duration-500 delay-800">
            Designed and Developed by{" "}
            <span className="bg-gradient-to-r from-[#C5126C] via-[#7942FF] to-[#CAFB12] bg-clip-text text-transparent font-bold">
              Alexa Developers SRM.
            </span>
          </p>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title with Enhanced Animation */}
        <div className="animate-in slide-in-from-bottom-8 duration-1000 delay-700">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-audiowide text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#563AFF] via-[#AA44BB] to-[#FF4E78] bg-clip-text text-transparent animate-pulse">
              ALEXAVERSE
            </span>
            <br />
            <span className="text-4xl sm:text-6xl md:text-7xl font-audiowide text-white/80">
              2.0
            </span>
          </h1>
        </div>

        {/* Subtitle with Sparkle Animation */}
        <div className="animate-in slide-in-from-bottom-8 duration-1000 delay-900">
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-inter mb-8 max-w-3xl mx-auto leading-relaxed">
            <HiSparkles className="inline-block text-purple-400 animate-pulse mr-2" />
            Where Innovation Meets Imagination
            <HiSparkles className="inline-block text-purple-400 animate-pulse ml-2" />
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in slide-in-from-bottom-8 duration-1000 delay-1100">
          <a
            href="#events"
            className="group relative px-8 py-4 bg-gradient-to-r from-[#563AFF] to-[#FF4E78] rounded-full text-white font-audiowide text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#AA44BB] to-[#563AFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              Explore Events
              <HiSparkles className="text-xl animate-pulse" />
            </span>
          </a>
          
          <a
            href="#contact"
            className="group px-8 py-4 border-2 border-white/30 rounded-full text-white font-audiowide text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-in slide-in-from-bottom-8 duration-1000 delay-1300">
          <HiArrowDown className="text-white text-3xl" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-float">
        <div className="w-4 h-4 bg-purple-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-1/3 right-20 animate-float-delayed">
        <div className="w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-1/4 left-20 animate-float">
        <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
      </div>
    </section>
  );
};

export default HeroSection;