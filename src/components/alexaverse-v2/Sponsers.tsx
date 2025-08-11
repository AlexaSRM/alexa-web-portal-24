"use client";

import React, { useEffect, useState } from "react";
import { HiSparkles, HiStar, HiHeart } from "react-icons/hi";

const Sponsors: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="sponsors"
      className="w-full min-h-screen text-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse"
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
      <div className="text-center mb-16 animate-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-3 mb-4">
          <HiStar className="text-4xl text-yellow-400 animate-pulse" />
          <h1 className="whitespace-nowrap text-[7vw] sm:text-6xl font-audiowide">
            <span className="bg-gradient-to-r from-[#CAFB12] via-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              Meet
            </span>{" "}
            <span className="bg-gradient-to-r from-[#306EF9] via-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
              Our
            </span>{" "}
            <span className="bg-gradient-to-r from-[#FF4E78] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent">
              Sponsors
            </span>
          </h1>
          <HiStar className="text-4xl text-yellow-400 animate-pulse" />
        </div>
        <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto">
          Amazing partners who make Alexaverse 2.0 possible
        </p>
      </div>

      {/* Enhanced Sponsors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-12 sm:gap-y-16 sm:gap-x-16 md:gap-x-40 justify-items-center items-center animate-in slide-in-from-bottom-8 duration-1000 delay-300">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="group relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center text-gray-400 text-lg hover:scale-110 hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10 transition-all duration-500 hover:border-white/40 hover:shadow-2xl animate-in slide-in-from-bottom-8 duration-1000"
            style={{
              animationDelay: `${index * 200}ms`
            }}
          >
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#CAFB12] via-[#306EF9] to-[#FF4E78] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#1A052A] via-[#511e5b] to-[#030645] flex items-center justify-center">
              <div className="text-center">
                <HiHeart className="text-3xl text-pink-400 mx-auto mb-2 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-sm font-audiowide text-white/80 group-hover:text-white transition-colors duration-300">
                  Sponsor {index + 1}
                </span>
              </div>
            </div>
            
            {/* Floating Sparkles */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <HiSparkles className="text-yellow-400 text-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-16 animate-in slide-in-from-bottom-8 duration-1000 delay-700">
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
          <HiSparkles className="text-4xl text-purple-400 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-audiowide text-white mb-4">
            Want to Become a Sponsor?
          </h3>
          <p className="text-gray-300 mb-6 font-inter">
            Join us in making Alexaverse 2.0 an unforgettable experience. Partner with us and be part of the innovation!
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#CAFB12] to-[#FF4E78] rounded-full text-black font-audiowide text-lg hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
            <span className="flex items-center gap-2">
              <HiStar className="text-xl" />
              Partner With Us
              <HiStar className="text-xl" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;