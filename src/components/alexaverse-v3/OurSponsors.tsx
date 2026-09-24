import React from "react";
import Image from "next/image";

const OurSponsors = () => {
  return (
    <section
      id="sponsors"
      className="w-full bg-black py-20 px-6 sm:px-10 lg:px-16 flex flex-col items-center overflow-hidden"
    >
      {/* Heading */}
      <div className="w-full max-w-[600px] mb-12 flex justify-center">
        <Image
          src="/alexaverse3.0/oursponser.svg"
          alt="Our Sponsors"
          width={500}
          height={100}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Sponsors Design */}
      <div className="w-full max-w-[800px] flex justify-center relative">
        {/* ========================================= */}
        {/* LARGE CENTRAL GOLDEN GLOW */}
        {/* ========================================= */}
        <div
          className="
            absolute
            inset-0
            pointer-events-none
            z-0
          "
          style={{
            background: `
              radial-gradient(
                ellipse 50% 50% at 50% 50%,
                rgba(251, 216, 165, 0.32) 0%,
                rgba(251, 216, 165, 0.22) 18%,
                rgba(251, 216, 165, 0.13) 35%,
                rgba(251, 216, 165, 0.07) 50%,
                rgba(251, 216, 165, 0.035) 65%,
                transparent 85%
              )
            `,
          }}
        />

        {/* Wider Ambient Glow */}
        <div
          className="
            absolute
            inset-[-10%]
            pointer-events-none
            z-0
          "
          style={{
            background: `
              radial-gradient(
                ellipse 65% 60% at 50% 50%,
                rgba(251, 216, 165, 0.10) 0%,
                rgba(251, 216, 165, 0.055) 35%,
                rgba(251, 216, 165, 0.025) 55%,
                transparent 78%
              )
            `,
          }}
        />

        {/* Main Sponsors Decorative SVG */}
        <Image
          src="/alexaverse3.0/our-sponsers-design.svg"
          alt="Sponsors Design"
          width={1012}
          height={1067}
          className="w-full h-auto object-contain relative z-10"
        />

        {/* ========================================= */}
        {/* SPONSOR PLACEHOLDERS */}
        {/* ========================================= */}

        {/* Top Left */}
        <div
          className="absolute rounded-full border border-dashed border-[#AD9A78]/50 flex items-center justify-center z-20 overflow-hidden bg-white/5"
          style={{
            left: "4.10%",
            top: "21.79%",
            width: "21.34%",
            height: "20.24%",
          }}
        >
          <span className="text-[#AD9A78]/60 text-xs sm:text-sm">Sponsor</span>
        </div>

        {/* Bottom Left */}
        <div
          className="absolute rounded-full border border-dashed border-[#AD9A78]/50 flex items-center justify-center z-20 overflow-hidden bg-white/5"
          style={{
            left: "4.10%",
            top: "55.15%",
            width: "21.34%",
            height: "20.24%",
          }}
        >
          <span className="text-[#AD9A78]/60 text-xs sm:text-sm">Sponsor</span>
        </div>

        {/* Top Center */}
        <div
          className="absolute rounded-full border border-dashed border-[#AD9A78]/50 flex items-center justify-center z-20 overflow-hidden bg-white/5"
          style={{
            left: "39.28%",
            top: "3.23%",
            width: "21.34%",
            height: "20.24%",
          }}
        >
          <span className="text-[#AD9A78]/60 text-xs sm:text-sm">Sponsor</span>
        </div>

        {/* Bottom Center */}
        <div
          className="absolute rounded-full border border-dashed border-[#AD9A78]/50 flex items-center justify-center z-20 overflow-hidden bg-white/5"
          style={{
            left: "39.28%",
            top: "74.55%",
            width: "21.34%",
            height: "20.24%",
          }}
        >
          <span className="text-[#AD9A78]/60 text-xs sm:text-sm">Sponsor</span>
        </div>

        {/* Top Right */}
        <div
          className="absolute rounded-full border border-dashed border-[#AD9A78]/50 flex items-center justify-center z-20 overflow-hidden bg-white/5"
          style={{
            left: "73.27%",
            top: "21.79%",
            width: "21.34%",
            height: "20.24%",
          }}
        >
          <span className="text-[#AD9A78]/60 text-xs sm:text-sm">Sponsor</span>
        </div>

        {/* Bottom Right */}
        <div
          className="absolute rounded-full border border-dashed border-[#AD9A78]/50 flex items-center justify-center z-20 overflow-hidden bg-white/5"
          style={{
            left: "73.27%",
            top: "55.15%",
            width: "21.34%",
            height: "20.24%",
          }}
        >
          <span className="text-[#AD9A78]/60 text-xs sm:text-sm">Sponsor</span>
        </div>
      </div>
    </section>
  );
};

export default OurSponsors;
