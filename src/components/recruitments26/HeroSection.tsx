'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ── Mobile Full-Screen Menu Overlay (rendered outside section to avoid overflow:hidden clipping) ── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-between py-16 px-8 lg:hidden"
          style={{ background: 'radial-gradient(ellipse at center, #6b0000 0%, #1a0000 50%, #000000 100%)' }}
        >
          {/* Close (X) button — top right */}
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="text-white"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <line x1="5" y1="5" x2="27" y2="27" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <line x1="27" y1="5" x2="5" y2="27" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav Links — vertically centered */}
          <div className="flex flex-col items-center justify-center flex-1 gap-12">
            <Link href="/" className="text-3xl font-bold tracking-wide text-white hover:text-red-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/domain" className="text-3xl font-bold tracking-wide text-white hover:text-red-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Domain</Link>
            <Link href="/roadmap" className="text-3xl font-bold tracking-wide text-white hover:text-red-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Roadmap</Link>
          </div>

          {/* Register Now button — pinned to bottom */}
          <button
            className="w-full max-w-[260px] bg-[#C32325] hover:bg-[#a01c1e] text-white py-4 rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(195,35,37,0.5)]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Register Now
          </button>
        </div>
      )}

      {/* ── Main Hero Section ── */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-black text-white font-sans selection:bg-red-500 selection:text-white">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/recruitments26/bg image.svg"
            alt="Background"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 w-full px-4 sm:px-8 md:px-12 py-4 sm:py-6 flex justify-between items-center">

          {/* Left: Logo + Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/recruitments26/Vector.svg"
              alt="Alexa Logo"
              width={32}
              height={32}
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-base sm:text-lg font-medium tracking-wide">
              Alexa Developers SRM
            </span>
          </div>

          {/* Right: Desktop Nav Links SVG */}
          <div className="hidden lg:block relative w-[420px] xl:w-[520px] h-[26px] xl:h-[32px]">
            <Image
              src="/recruitments26/Nav buttons.svg"
              alt="Navigation links"
              fill
              className="object-contain"
            />
            <Link href="/" className="absolute left-0 top-0 w-[12.5%] h-full cursor-pointer" aria-label="Home" />
            <Link href="/domain" className="absolute left-[19.8%] top-0 w-[16.4%] h-full cursor-pointer" aria-label="Domain" />
            <Link href="/roadmap" className="absolute left-[43.1%] top-0 w-[21.1%] h-full cursor-pointer" aria-label="Roadmap" />
            <button
              onClick={() => console.log('Nav Register Clicked')}
              className="absolute right-0 top-0 w-[29.4%] h-full cursor-pointer rounded-full hover:bg-white/10 transition-colors"
              aria-label="Register Now"
            />
          </div>

          {/* Mobile: Hamburger button (3 white bars) */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-[6px] w-10 h-10"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-7 h-[3px] bg-white rounded-full" />
            <span className="block w-7 h-[3px] bg-white rounded-full" />
            <span className="block w-7 h-[3px] bg-white rounded-full" />
          </button>

        </nav>

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full mt-[-5vh]">

          {/* Large Red Alexa Logo */}
          <div className="relative mb-4 sm:mb-6 transform hover:scale-105 transition-transform duration-500 mt-8 sm:mt-12">
            <Image
              src="/recruitments26/ALEXA logo.svg"
              alt="Alexa Large Logo"
              width={128}
              height={128}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-[0_0_35px_rgba(195,35,37,0.4)]"
              priority
            />
          </div>

          {/* Recruitments '26 Text */}
          <div className="relative mb-auto mt-2 px-4 w-[80vw] max-w-[250px] md:max-w-[300px] flex justify-center">
            <Image
              src="/recruitments26/Recruitments26.svg"
              alt="Recruitments '26"
              width={300}
              height={60}
              className="w-full h-auto drop-shadow-[0_0_15px_rgba(195,35,37,0.3)]"
            />
          </div>

        </div>

        {/* Bottom Register Now Button */}
        <div className="relative z-10 pb-32 sm:pb-48 flex justify-center w-full">
          <button
            onClick={() => console.log('Bottom Register Clicked')}
            className="hover:scale-105 hover:brightness-110 active:scale-95 transition-all cursor-pointer group"
          >
            <Image
              src="/recruitments26/Register Now button.svg"
              alt="Register Now"
              width={260}
              height={58}
              className="w-[200px] sm:w-[260px] drop-shadow-[0_0_15px_rgba(195,35,37,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(195,35,37,0.8)]"
            />
          </button>
        </div>

      </section>
    </>
  );
}
