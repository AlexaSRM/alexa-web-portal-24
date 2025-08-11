"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "@/components/alexaverse-v2/HeroSection";
import OurEvents from "@/components/alexaverse-v2/OurEvents";
import Sponsers from "@/components/alexaverse-v2/Sponsers"
import ContactUs from "@/components/alexaverse-v2/ContactUs"

export default function AlexaVersePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="animate-in fade-in duration-1000">
        <HeroSection />
      </div>

      {/* Main Content with Gradient Background */}
      <div className="relative bg-gradient-to-br from-[#030645] via-[#1A052A] to-[#511e5b]">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-pulse"></div>
        
        {/* Events Section */}
        <div className="relative z-10 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          <OurEvents />
        </div>

        {/* Sponsors Section */}
        <div className="relative z-10 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Sponsers />
        </div>

        {/* Contact Section */}
        <div className="relative z-10 animate-in slide-in-from-bottom-8 duration-1000 delay-700">
          <ContactUs />
        </div>
      </div>
    </main>
  );
}
