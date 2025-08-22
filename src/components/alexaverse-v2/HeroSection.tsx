"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (message: string, event: string) => {
    setModalMessage(message);
    setEventName(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleEventClick = (eventName: string, e: React.MouseEvent) => {
    e.preventDefault();
    switch (eventName) {
      case "Workshop":
        router.push("/alexaverse-v2/RegisterWorkshop");
        break;
      case "Ideathon":
        router.push("https://forms.gle/P8PdoBQvTJoNdK51A");
        break;
      case "Vlogit":
        router.push("/alexaverse-v2/RegisterVlogit");
        break;
      case "Debug the Campus":
        router.push("/alexaverse-v2/RegisterDebug");
        break;
      // case "Hangman":
      //   router.push("/alexaverse-v2/RegisterHangman");
      //   break;
      default:
        openModal(`Registration for ${eventName} will open soon!`, eventName);
    }
  };

  if (!mounted) return null;

  return (
    <section
      id="home"
      className="relative w-full h-fit bg-transparent p-0  m-0 overflow-visible"
    >
      
<div
  className="absolute inset-0 -z-10"
  style={{
    backgroundImage: `url('/alexaverse2.0/ALexaverse2.0_Main_bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
/>

     
      <nav
        className="absolute left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[1500px] px-6"
        style={{ top: "15px" }}
      >
        <div className="flex justify-between items-center h-[74px]">
          
          <Image
            src="/alexaverse2.0/alexa-logo-navbar.svg"
            alt="Alexa Logo"
            width={120}
            height={48}
            className="h-10 sm:h-12 w-auto"
          />

         
          <div className="hidden md:flex gap-[32px] items-center">
            <a
              href="/"
              className="text-white font-audiowide text-[24px] leading-[100%] hover:text-purple-300 transition-colors"
            >
              Home
            </a>
            <a
              href="#events"
              className="text-white font-audiowide text-[24px] leading-[100%] hover:text-purple-300 transition-colors"
            >
              Events
            </a>
            <a
              href="#contact"
              className="text-white font-audiowide text-[24px] leading-[100%] hover:text-purple-300 transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-white text-4xl"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <HiMenu />
          </button>
        </div>
      </nav>

      {/* Flyer-Style Event Navigation Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[1200px] px-6 mt-20">
        <div className="hidden lg:flex justify-center items-center gap-8 bg-black/30 backdrop-blur-sm  px-8 py-4 border border-white/10 backdrop-blur-md rounded-2xl px-12 py-6 border-2 border-cyan-400/30 shadow-2xl shadow-purple-500/20">
          <button
            onClick={(e) => handleEventClick("Ideathon", e)}
            className="font-black text-2xl tracking-wider hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            style={{ 
              color: '#FF1493',
              textShadow: '0 0 10px rgba(255, 20, 147, 0.5)',
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            IDEATHON
          </button>
          <button
            onClick={(e) => handleEventClick("Workshop", e)}
            className="font-black text-2xl tracking-wider hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            style={{ 
              color: '#00BFFF',
              textShadow: '0 0 10px rgba(0, 191, 255, 0.5)',
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            WORKSHOP
          </button>
          <button
            onClick={(e) => handleEventClick("Vlogit", e)}
            className="font-black text-2xl tracking-wider hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            style={{ 
              color: '#FFFF00',
              textShadow: '0 0 10px rgba(255, 255, 0, 0.5)',
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            VLOGIT
          </button>
          <button
            onClick={(e) => handleEventClick("Debug the Campus", e)}
            className="font-black text-2xl tracking-wider hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            style={{ 
              color: '#00BFFF',
              textShadow: '0 0 10px rgba(0, 191, 255, 0.5)',
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            DEBUG THE CAMPUS
          </button>
          <button
            onClick={(e) => handleEventClick("Hangman", e)}
            className="font-black text-2xl tracking-wider hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            style={{ 
              color: '#FF1493',
              textShadow: '0 0 10px rgba(255, 20, 147, 0.5)',
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}
          >
            HANGMAN
          </button>
        </div>
        
        {/* Mobile version - Same style as desktop with extra spacing */}
        <div className="lg:hidden flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 bg-black/30 backdrop-blur-sm px-5 sm:px-7 py-4 sm:py-5 border border-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border-2 border-cyan-400/30 shadow-2xl shadow-purple-500/20 max-w-full">
            <button
              onClick={(e) => handleEventClick("Ideathon", e)}
              className="font-black text-sm sm:text-base md:text-lg tracking-wider hover:scale-105 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap cursor-pointer"
              style={{ 
                color: '#FF1493',
                textShadow: '0 0 8px rgba(255, 20, 147, 0.5)',
                fontFamily: 'Impact, Arial Black, sans-serif'
              }}
            >
              IDEATHON
            </button>
            <button
              onClick={(e) => handleEventClick("Workshop", e)}
              className="font-black text-sm sm:text-base md:text-lg tracking-wider hover:scale-105 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap cursor-pointer"
              style={{ 
                color: '#00BFFF',
                textShadow: '0 0 8px rgba(0, 191, 255, 0.5)',
                fontFamily: 'Impact, Arial Black, sans-serif'
              }}
            >
              WORKSHOP
            </button>
            <button
              onClick={(e) => handleEventClick("Vlogit", e)}
              className="font-black text-sm sm:text-base md:text-lg tracking-wider hover:scale-105 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap cursor-pointer"
              style={{ 
                color: '#FFFF00',
                textShadow: '0 0 8px rgba(255, 255, 0, 0.5)',
                fontFamily: 'Impact, Arial Black, sans-serif'
              }}
            >
              VLOGIT
            </button>
            <button
              onClick={(e) => handleEventClick("Debug the Campus", e)}
              className="font-black text-sm sm:text-base md:text-lg tracking-wider hover:scale-105 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap cursor-pointer"
              style={{ 
                color: '#00BFFF',
                textShadow: '0 0 8px rgba(0, 191, 255, 0.5)',
                fontFamily: 'Impact, Arial Black, sans-serif'
              }}
            >
              DEBUG THE CAMPUS
            </button>
            <button
              onClick={(e) => handleEventClick("Hangman", e)}
              className="font-black text-sm sm:text-base md:text-lg tracking-wider hover:scale-105 hover:text-shadow-lg transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap cursor-pointer"
              style={{ 
                color: '#FF1493',
                textShadow: '0 0 8px rgba(255, 20, 147, 0.5)',
                fontFamily: 'Impact, Arial Black, sans-serif'
              }}
            >
              HANGMAN
            </button>
          </div>
        </div>
      </div>

      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#511e5b] via-[#1A052A] to-[#030645] z-50 flex flex-col justify-between items-center">
          
          <button
            className="absolute top-6 right-6 text-white text-4xl"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <HiX />
          </button>

          
          <div className="flex-grow flex flex-col items-center justify-center gap-10 mt-20">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-audiowide text-4xl hover:text-purple-300 transition"
            >
              HOME
            </a>
            <a
              href="#events"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-audiowide text-4xl hover:text-purple-300 transition"
            >
              OUR EVENTS
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-audiowide text-4xl hover:text-purple-300 transition"
            >
              CONTACT US
            </a>
          </div>

          {/* Footer */}
          <p className="text-center text-[14px] sm:text-xl font-nunito text-white font-semibold px-4 whitespace-nowrap mb-6">
            Designed and Developed by{" "}
            <span className="bg-gradient-to-r from-[#C5126C] via-[#7942FF] to-[#306EF9] bg-clip-text text-transparent font-bold">
              Alexa Developers SRM.
            </span>
          </p>
        </div>
      )}

      {/* Modal for "Coming Soon" messages */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-[#511e5b] via-[#1A052A] to-[#030645] rounded-2xl p-6 sm:p-8 max-w-md w-full border-2 border-cyan-400/30 shadow-2xl shadow-purple-500/20">
            <div className="text-center">
              <h3 className="text-white font-audiowide text-xl sm:text-2xl mb-4">
                {eventName}
              </h3>
              <p className="text-white/90 font-nunito text-base sm:text-lg mb-6">
                {modalMessage}
              </p>
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-[#FF1493] to-[#C5126C] text-white font-bold font-nunito py-2 px-6 rounded-lg hover:scale-105 transition-all duration-300"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area with Logo */}
      <div
        className="relative min-h-screen  overflow-hidden flex justify-center items-start sm:items-center pt-32 sm:pt-0"
        style={{
          filter: "drop-shadow(30px 0px 60px rgba(0, 0, 0, 2))",
        }}
      >
        {/* CD Image - Left Bottom Corner - Increased Mobile Size */}
        <div className="absolute bottom-0 left-0 z-10">
          <Image
            src="/alexaverse2.0/cd-record.png"
            alt="Vinyl Record"
            width={224}
            height={224}
            className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-48 xl:h-48 2xl:w-56 2xl:h-56 object-contain object-bottom-left opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
            style={{
              filter: "drop-shadow(0 0 20px rgba(255, 20, 147, 0.3))",
              objectPosition: "bottom left",
              display: "block"
            }}
          />
        </div>

        {/* Microphone Image - Right Bottom Corner - Increased Mobile Size */}
        <div className="absolute bottom-0 right-0 z-10">
          <Image
            src="/alexaverse2.0/microphone.png"
            alt="Vintage Microphone"
            width={224}
            height={224}
            className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-48 xl:h-48 2xl:w-56 2xl:h-56 object-contain object-bottom-right opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
            style={{
              filter: "drop-shadow(0 0 20px rgba(0, 191, 255, 0.3))",
              objectPosition: "bottom right",
              display: "block"
            }}
          />
        </div>

        {/* Main Logo and Title */}
        <div className="flex flex-col items-center justify-center z-20 px-2 mt-16 sm:mt-20 md:mt-40">
          <Image
            src="/alexaverse2.0/alexaverse-main-logo.png"
            alt="Alexaverse 2.0 - Main Logo"
            width={350}
            height={200}
            className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[280px] lg:max-w-[200px] xl:max-w-[350px] h-auto object-contain drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0px 0px 30px rgba(199, 18, 108, 0.3))"
            }}
          />
          
          {/* Event Information Section */}
          <div className="mt-6 sm:mt-8 text-center max-w-4xl px-4 sm:px-2">
            {/* Main Event Description */}
            <div className="mb-5 sm:mb-6">
              <p className="text-white font-bold text-sm sm:text-lg md:text-l lg:text-xl xl:text-3xl leading-loose sm:leading-relaxed font-audiowide tracking-wide">
                <span 
                  className="bg-gradient-to-r from-[#FF1493] via-[#00BFFF] to-[#FFFF00] bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 20px rgba(255, 20, 147, 0.3)'
                  }}
                >
                  ALEXAVERSE 2.0
                </span>{" "}
                <span className="text-white">is back — </span>
                <span 
                  className="bg-gradient-to-r from-[#00BFFF] to-[#306EF9] bg-clip-text text-transparent font-black"
                  style={{
                    textShadow: '0 0 15px rgba(0, 191, 255, 0.4)'
                  }}
                >
                  bigger, bolder, and unmissable!
                </span>
              </p>
              
              <p className="text-white/90 font-nunito text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-4 sm:mt-3 leading-loose sm:leading-relaxed">
                Dive into three electrifying days of{" "}
                <span 
                  className="bg-gradient-to-r from-[#FF1493] via-[#00BFFF] to-[#FFFF00] bg-clip-text text-transparent font-bold"
                  style={{
                    textShadow: '0 0 10px rgba(197, 18, 108, 0.3)'
                  }}
                >
                  innovation and imagination.
                </span>
              </p>
            </div>

            {/* Date Section */}
            <div className="bg-gradient-to-r from-black/40 via-purple-900/30 to-black/40 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-4 md:p-4 border-2 border-cyan-400/30 shadow-2xl shadow-purple-500/20 mb-8 sm:mb-0">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <div className="text-center">
                  <p className="text-white/80 font-nunito text-xs sm:text-sm md:text-base mb-3 sm:mb-2 tracking-widest uppercase">
                    Event Dates
                  </p>
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    {/* September 3 */}
                    <div className="bg-gradient-to-br from-[#FF1493] to-[#C5126C] rounded-lg sm:rounded-xl p-3 sm:p-3 md:p-4 transform hover:scale-105 transition-all duration-300">
                      <div className="text-white font-black text-xl sm:text-xl md:text-2xl lg:text-3xl font-audiowide">2</div>
                      <div className="text-white/90 text-sm sm:text-sm font-nunito">SEP</div>
                    </div>
                    
                    {/* Separator */}
                    <div className="text-cyan-400 text-2xl sm:text-2xl md:text-3xl font-bold mx-2 sm:mx-2">—</div>
                    
                    {/* September 4 */}
                    <div className="bg-gradient-to-br from-[#00BFFF] to-[#306EF9] rounded-lg sm:rounded-xl p-3 sm:p-3 md:p-4 transform hover:scale-105 transition-all duration-300">
                      <div className="text-white font-black text-xl sm:text-xl md:text-2xl lg:text-3xl font-audiowide">3</div>
                      <div className="text-white/90 text-sm sm:text-sm font-nunito">SEP</div>
                    </div>
                    
                    {/* Separator */}
                    <div className="text-cyan-400 text-2xl sm:text-2xl md:text-3xl font-bold mx-2 sm:mx-2">—</div>
                    
                    {/* September 5 */}
                    <div className="bg-gradient-to-br from-[#FFFF00] to-[#FFD700] rounded-lg sm:rounded-xl p-3 sm:p-3 md:p-4 transform hover:scale-105 transition-all duration-300">
                      <div className="text-black font-black text-xl sm:text-xl md:text-2xl lg:text-3xl font-audiowide">4</div>
                      <div className="text-black/90 text-sm sm:text-sm font-nunito">SEP</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-4">
                    <span 
                      className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-audiowide bg-gradient-to-r from-[#FF1493] via-[#00BFFF] to-[#FFFF00] bg-clip-text text-transparent"
                      style={{
                        textShadow: '0 0 30px rgba(255, 20, 147, 0.4)'
                      }}
                    >
                      2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;