"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative z-0 w-full min-h-screen overflow-hidden"
    >
      {/* ── Mobile Background Image ── */}
      <div className="absolute inset-0 -z-20 pointer-events-none md:hidden">
        <Image
          src="/alexaverse3.0/Group 1261153487-cropped.svg"
          alt="AlexaVerse 3.0 Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* ── Mobile Vignette SVG Overlay ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none md:hidden opacity-60">
        <Image
          src="/alexaverse3.0/vingette.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* ── Desktop Background Image ── */}
      <div className="absolute inset-0 -z-20 pointer-events-none hidden md:block">
        <Image
          src="/alexaverse3.0/bg-image-cropped.svg"
          alt="AlexaVerse 3.0 Background"
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-20 w-full px-6 sm:px-10 lg:px-14 py-4 flex justify-between items-center">
        {/* Logo container */}
        <Link
          href="/"
          className="flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          {/* Mobile view: Only the icon */}
          <Image
            src="/alexaverse3.0/Alexa Logo.svg"
            alt="Alexa Developers SRM Icon"
            width={48}
            height={48}
            className="block md:hidden h-8 w-auto object-contain"
          />

          {/* Desktop view: Full logo with wordmark */}
          <Image
            src="/alexaverse3.0/Alexa Logo.svg"
            alt="Alexa Developers SRM"
            width={364}
            height={52}
            className="hidden md:block h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-10 items-center">
          {[
            { label: "Home", href: "/" },
            { label: "Events", href: "#events" },
            { label: "Contact Us", href: "#contact" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-white text-xl hover:text-white/70 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <div
        className={`fixed inset-0 bg-black/85 backdrop-blur-lg z-50 flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-6 text-white"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>

        {/* Mobile Menu Links */}
        {[
          { label: "HOME", href: "/" },
          { label: "OUR EVENTS", href: "#events" },
          { label: "CONTACT US", href: "#contact" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="text-white text-3xl hover:text-white/70 transition-colors"
          >
            {label}
          </Link>
        ))}

        {/* Designed & Developed By */}
        <div className="absolute bottom-10 w-full flex flex-col items-center">
          <p
            className="text-xs tracking-[0.15em] text-center uppercase"
            style={{ color: "#DED2BC" }}
          >
            Designed and Developed by
            <br />
            <span className="font-semibold text-white">
              Alexa Developers SRM.
            </span>
          </p>
        </div>
      </div>

      {/* ── Hero body ── */}
      <div className="relative z-10 flex items-start md:items-center min-h-[calc(100vh-72px)] pt-16 md:pt-0 px-6 sm:px-10 lg:px-16">
        {/* Left — text content */}
        <div className="flex flex-col items-start w-full lg:max-w-[700px] mt-6 md:mt-0">
          {/* ALEXAVERSE title */}
          <div className="w-full mb-5">
            <Image
              src="/alexaverse3.0/alexaverse.svg"
              alt="ALEXAVERSE"
              width={800}
              height={300}
              className="w-full max-w-[650px] h-auto object-contain"
            />
          </div>

          {/* Description — Mobile View */}
          <p
            style={{
              fontFamily: '"Crimson Pro", serif',
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: "1.2",
              letterSpacing: "0",
              textAlign: "center",
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
            className="md:hidden text-white/90 mb-8 w-full max-w-[650px]"
          >
            ALEXAVERSE 3.0 is back - bigger, bolder, and <br />
            unmissable! From 13th to 15th October 2026, dive <br />
            into three electrifying days of innovation and <br />
            imagination.
          </p>

          {/* Description — Desktop View */}
          <p
            style={{
              fontFamily: '"Crimson Pro", serif',
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: "1.2",
              letterSpacing: "0",
              textAlign: "center",
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
            className="hidden md:block text-white/90 mb-8 w-full max-w-[650px]"
          >
            ALEXAVERSE 3.0 is back - bigger, bolder, and unmissable! From 13th{" "}
            <br />
            to 15th October 2026, dive into three electrifying days of
            innovation <br />
            and imagination.
          </p>

          {/* Explore Events Button */}
          <div className="w-full max-w-[650px] flex justify-center">
            <Link href="#events" className="relative group inline-block">
              <Image
                src="/alexaverse3.0/button.svg"
                alt="Explore Events"
                width={325}
                height={68}
                className="w-[220px] sm:w-[260px] h-auto object-contain group-hover:brightness-110 transition-all duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
