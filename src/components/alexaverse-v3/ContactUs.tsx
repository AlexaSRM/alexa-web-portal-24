"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="w-full bg-black py-20 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center"
    >
      {/* ── DESKTOP VIEW: Socials on sides ── */}
      <div className="hidden md:flex flex-row items-center justify-center gap-16 mb-10 w-full max-w-[800px]">
        {/* Left Socials */}
        <div className="flex flex-row gap-10">
          <Link
            href="https://www.instagram.com/alexadevsrm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/alexaverse3.0/insta.png"
              alt="Instagram"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
          </Link>

          <Link
            href="https://www.linkedin.com/company/alexadevsrm/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/alexaverse3.0/linkedin.png"
              alt="LinkedIn"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
          </Link>
        </div>

        {/* Central Logo */}
        <div className="w-[240px] h-[240px] flex-shrink-0 mx-6">
          <Image
            src="/alexaverse3.0/alexa-icon.svg"
            alt="Alexa Developers SRM Logo"
            width={240}
            height={240}
            className="w-full h-full object-contain"
            style={{
              filter: "drop-shadow(0 4px 20px rgba(253,232,200,0.2))",
            }}
          />
        </div>

        {/* Right Socials */}
        <div className="flex flex-row gap-10">
          <Link
            href="https://www.facebook.com/alexadevsrm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/alexaverse3.0/facebook.png"
              alt="Facebook"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
          </Link>

          <Link
            href="mailto:alexadevsrm@gmail.com"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/alexaverse3.0/gmail.png"
              alt="Email"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
          </Link>
        </div>
      </div>

      {/* ── MOBILE VIEW: Logo on top, Socials in a row below ── */}
      <div className="flex md:hidden flex-col items-center justify-center gap-8 mb-10 w-full">
        {/* Central Logo */}
        <div className="w-[200px] h-[200px] flex-shrink-0">
          <Image
            src="/alexaverse3.0/alexa-icon.svg"
            alt="Alexa Developers SRM Logo"
            width={200}
            height={200}
            className="w-full h-full object-contain"
            style={{
              filter: "drop-shadow(0 4px 20px rgba(253,232,200,0.2))",
            }}
          />
        </div>

        {/* All Socials in a 2x2 grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-10 w-fit mx-auto px-4">
          <Link
            href="https://www.instagram.com/alexadevsrm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity flex justify-center"
          >
            <Image
              src="/alexaverse3.0/insta.png"
              alt="Instagram"
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />
          </Link>

          <Link
            href="https://www.linkedin.com/company/alexadevsrm/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity flex justify-center"
          >
            <Image
              src="/alexaverse3.0/linkedin.png"
              alt="LinkedIn"
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />
          </Link>

          <Link
            href="https://www.facebook.com/alexadevsrm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity flex justify-center"
          >
            <Image
              src="/alexaverse3.0/facebook.png"
              alt="Facebook"
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />
          </Link>

          <Link
            href="mailto:alexadevsrm@gmail.com"
            className="hover:opacity-80 transition-opacity flex justify-center"
          >
            <Image
              src="/alexaverse3.0/gmail.png"
              alt="Email"
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Contact Us Title */}
      <h2
        className="text-[#DBCCB7] text-4xl sm:text-5xl md:text-6xl tracking-wider mb-8"
        style={{
          textShadow: "0 2px 10px rgba(0,0,0,0.8)",
        }}
      >
        CONTACT US
      </h2>

      {/* Footer text */}

      {/* Desktop: single line */}
      <p className="hidden sm:block text-xs sm:text-sm md:text-base tracking-[0.15em] text-center uppercase">
        <span style={{ color: "#DED2BC" }}>Designed and Developed by </span>

        <span className="font-semibold text-white">Alexa Developers SRM.</span>
      </p>

      {/* Mobile: two lines */}
      <p className="block sm:hidden text-xs tracking-[0.15em] text-center uppercase">
        <span style={{ color: "#DED2BC" }}>Designed and Developed by</span>

        <br />

        <span className="font-semibold text-white">Alexa Developers SRM.</span>
      </p>
    </section>
  );
};

export default ContactUs;
