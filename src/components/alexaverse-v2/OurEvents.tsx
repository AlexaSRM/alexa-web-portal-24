"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiSparkles, HiArrowRight, HiCalendar, HiClock, HiMapPin, HiCurrencyDollar } from "react-icons/hi";

const OurEvents: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [eventName, setEventName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (message:string, event: string) => {
    setModalMessage(message);
    setEventName(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleRegister = (eventName: string) => {
    switch (eventName) {
      case "Workshop":
        router.push("/alexaverse-v2/RegisterWorkshop");
        break;
      case "Vlogit":
        router.push("/alexaverse-v2/RegisterVlogit");
        break;
      case "Debug the Campus":
        router.push("/alexaverse-v2/RegisterDebug");
        break;
      case "Hangman":
        router.push("/alexaverse-v2/RegisterHangman");
        break;
      default:
        openModal(`Registration for ${eventName} will open soon!`, `${eventName}`);
    }
  };

  if (!mounted) return null;

  return (
    <section
      id="events"
      className="w-full min-h-screen text-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
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
          <HiSparkles className="text-4xl text-purple-400 animate-pulse" />
          <h1 className="text-5xl sm:text-7xl font-audiowide">
            <span className="bg-gradient-to-r from-[#563AFF] via-[#AA44BB] to-[#FF4E78] bg-clip-text text-transparent">
              Our
            </span>{" "}
            <span className="bg-gradient-to-r from-[#FF4E78] via-[#AA44BB] to-[#563AFF] bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <HiSparkles className="text-4xl text-purple-400 animate-pulse" />
        </div>
        <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto">
          Discover the amazing events that await you in Alexaverse 2.0
        </p>
      </div>

      {/* Events Grid */}
      <div className="flex flex-col items-center gap-12 min-h-screen w-full max-w-[80rem] mx-auto animate-in slide-in-from-bottom-8 duration-1000 delay-300" style={{ transform: `translateX(-5vw) translateY(-10vw)`}}>
        
        {/* Ideathon Card */}
        <div className="relative max-w-[85rem] w-[90vw] h-[32vw] min-h-[120px] mt-16 mb-10 group hover:scale-105 transition-transform duration-500">
          {/* Enhanced Card Background */}
          <div
            className="absolute top-[7.2vw] left-[15.6vw] w-[68.4vw] h-[18vw] rounded-[2.1vw] border-[0.06vw] backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(115,115,115,0.25)_1.74%,rgba(50,50,50,0.25)_1.75%,rgba(163,163,163,0.25)_33.05%,rgba(112,112,112,0.25)_97.16%)] group-hover:bg-[linear-gradient(122.72deg,rgba(115,115,115,0.35)_1.74%,rgba(50,50,50,0.35)_1.75%,rgba(163,163,163,0.35)_33.05%,rgba(112,112,112,0.35)_97.16%)] transition-all duration-500"
            style={{
              borderImage: `radial-gradient(88.13% 63.48% at 26.09% 25.74%, #FFFFFF 0%, rgba(255, 255, 255, 0.905829) 8.52%, rgba(255, 255, 255, 0.801323) 40.45%, rgba(255, 255, 255, 0.595409) 40.46%, rgba(255, 255, 255, 0.29) 96.15%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%) linear-gradient(180deg, rgba(0, 0, 0, 0.2) 18.72%, rgba(255, 30, 0, 0.2) 43.64%, rgba(0, 0, 0, 0.2) 67.21%)`,
              borderImageSlice: 1,
            }}
          >
            <div className="absolute top-[1.2vw] left-[19.8vw] right-[2.4vw] flex justify-between text-white">
              <span className="text-[1.08vw] min-text-[12px] font-space flex items-center gap-1">
                <HiMapPin className="text-sm" />
                VENUE
              </span>
              <span className="text-[1.08vw] min-text-[12px] font-space flex items-center gap-1">
                <HiClock className="text-sm" />
                TIME
              </span>
              <span className="text-[1.08vw] min-text-[12px] font-space flex items-center gap-1">
                <HiCalendar className="text-sm" />
                DATE
              </span>
              <span className="text-[1.08vw] min-text-[12px] font-space flex items-center gap-1">
                <HiCurrencyDollar className="text-sm" />
                ENTRY
              </span>
            </div>
            <div className="absolute top-[3vw] left-[19.8vw] right-[2.4vw] flex justify-between text-white">
              <div className="flex flex-col">
                <span className="text-[1.44vw] min-text-[16px] font-space font-bold">MINI HALL 2</span>
              </div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">8:00 AM - 5:00 PM</div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">03-09-2025</div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">120.0 RS</div>
            </div>
          </div>
          
          <div
            className="absolute top-[15.6vw] left-[12vw] w-[76.8vw] h-[17.4vw] rounded-[2.1vw] border-[0.06vw] backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(180,180,180,0.25)_1.74%,rgba(79,79,79,0.25)_1.75%,rgba(255,255,255,0.25)_33.05%,rgba(175,175,175,0.25)_97.16%)] group-hover:bg-[linear-gradient(122.72deg,rgba(180,180,180,0.35)_1.74%,rgba(79,79,79,0.35)_1.75%,rgba(255,255,255,0.35)_33.05%,rgba(175,175,175,0.35)_97.16%)] transition-all duration-500"
            style={{
              borderImage: `radial-gradient(88.13% 63.48% at 26.09% 25.74%, #FFFFFF 0%, rgba(255, 255, 255, 0.905829) 8.52%, rgba(255, 255, 255, 0.801323) 40.45%, rgba(255, 255, 255, 0.595409) 40.46%, rgba(255, 255, 255, 0.29) 96.15%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%) linear-gradient(180deg, rgba(0, 0, 0, 0.2) 18.72%, rgba(255, 30, 0, 0.2) 43.64%, rgba(0, 0, 0, 0.2) 67.21%)`,
              borderImageSlice: 1,
            }}
          >
            <div className="absolute left-[25.2vw] top-[1.8vw]">
              <h1 className="text-white text-[1.08vw] min-text-[12px] font-space mb-[-0.6vw]">EVENT</h1>
              <h2 className="text-white text-[2.52vw] min-text-[24px] font-anton group-hover:text-purple-300 transition-colors duration-500">IDEATHON</h2>
            </div>
            <div className="absolute right-[3.6vw] top-[3.6vw] text-right">
              <p className="text-white text-[1.32vw] min-text-[14px] font-inter">
                Ideate, Innovate, Impress: Let your creativity convince us!
              </p>
            </div>
          </div>
          
          <img
            src="/alexaverse2.0/ideathon-img.svg"
            alt="Ideathon"
            className="absolute top-[4.8vw] left-[-14.4vw] w-[76.8vw] h-[19.8vw] object-contain rounded-[2.1vw] select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />

          {/* Enhanced Register Button */}
          <button
            onClick={() => handleRegister("Ideathon")}
            className="absolute top-[26.4vw] left-[15vw] w-[18.6vw] h-[4.32vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(144,144,144,0.25)_1.74%,rgba(63,63,63,0.25)_1.75%,rgba(204,204,204,0.25)_33.05%,rgba(140,140,140,0.25)_97.16%)] hover:bg-[linear-gradient(122.72deg,rgba(144,144,144,0.35)_1.74%,rgba(63,63,63,0.35)_1.75%,rgba(204,204,204,0.35)_33.05%,rgba(140,140,140,0.35)_97.16%)] transition-all duration-300 group-hover:scale-105"
          >
            <img
              src="/alexaverse2.0/rewind-button.png"
              alt="Rewind Button"
              className="absolute left-[0.96vw] top-1/2 -translate-y-1/2 w-[1.92vw] h-[2.52vw] object-contain invert select-none pointer-events-none"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
            <img
              src="/alexaverse2.0/fast-forward-button.png"
              alt="Fast Forward Button"
              className="absolute left-[15.96vw] top-1/2 -translate-y-1/2 w-[1.92vw] h-[2.52vw] object-contain invert select-none pointer-events-none"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
            <div
              className="absolute left-[9.36vw] top-[2.16vw] -translate-x-1/2 -translate-y-1/2 w-[9.36vw] h-[5.04vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              <img
                src="/alexaverse2.0/play-button.png"
                alt="Play Button"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[6.24vw] h-[1.92vw] object-contain select-none pointer-events-none"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
            </div>
          </button>

          {/* Progress Bar */}
          <div
            className="absolute top-[22.2vw] left-[37.2vw] w-[48vw] h-[2.52vw] rounded-[3.12vw] border-[0.1vw] border-white backdrop-blur-[5vw] group-hover:border-purple-300 transition-colors duration-300"
            style={{
              background: 'linear-gradient(to right, black 40%, transparent 40%)'
            }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[5.04vw] h-[3.12vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-white group-hover:bg-purple-300 transition-colors duration-300"
              style={{
                left: '40%',
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
          </div>

          {/* Description */}
          <div
            className="absolute top-[27vw] left-[37.2vw] w-[48vw] h-[5.04vw] rounded-[1.44vw] border-[0.1vw] border-white backdrop-blur-[5vw] flex items-center justify-center p-[1.2vw] group-hover:border-purple-300 transition-colors duration-300"
            style={{
              background: 'black'
            }}
          >
            <p className="text-white text-center font-inter text-[1.08vw] min-text-[14px] leading-tight">
              An immersive journey led by two distinct speakers, delivering the most valuable insights from the ever-evolving realm of Generative AI.
            </p>
          </div>
        </div>

        {/* Workshop Card */}
        <div className="relative max-w-[85rem] w-[90vw] h-[32vw] min-h-[120px] group hover:scale-105 transition-transform duration-500">
          <div
            className="absolute top-[7.2vw] left-[15.6vw] w-[68.4vw] h-[18vw] rounded-[2.1vw] border-[0.06vw] backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(115,115,115,0.25)_1.74%,rgba(50,50,50,0.25)_1.75%,rgba(163,163,163,0.25)_33.05%,rgba(112,112,112,0.25)_97.16%)] group-hover:bg-[linear-gradient(122.72deg,rgba(115,115,115,0.35)_1.74%,rgba(50,50,50,0.35)_1.75%,rgba(163,163,163,0.35)_33.05%,rgba(112,112,112,0.35)_97.16%)] transition-all duration-500"
            style={{
              borderImage: `radial-gradient(88.13% 63.48% at 26.09% 25.74%, #FFFFFF 0%, rgba(255, 255, 255, 0.905829) 8.52%, rgba(255, 255, 255, 0.801323) 40.45%, rgba(255, 255, 255, 0.595409) 40.46%, rgba(255, 255, 255, 0.29) 96.15%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%) linear-gradient(180deg, rgba(0, 0, 0, 0.2) 18.72%, rgba(255, 30, 0, 0.2) 43.64%, rgba(0, 0, 0, 0.2) 67.21%)`,
              borderImageSlice: 1,
            }}
          >
            <div className="absolute top-[1.2vw] left-[19.8vw] right-[2.4vw] flex justify-between text-white">
              <span className="text-[1.08vw] min-text-[12px] font-space flex items-center gap-1">
                <HiMapPin className="text-sm" />
                VENUE
              </span>
              <span className="text-[1.08vw] min-text-[12px] font-space flex items-center gap-1">
                <HiClock className="text-sm" />
                TIME
              </span>
              <span className="text-[1.08vw] min-text-[12px] font-space flex items-center gap-1">
                <HiCalendar className="text-sm" />
                DATE
              </span>
              <span className="text-[1.08vw] min-text-[12px] font-space flex items-center gap-1">
                <HiCurrencyDollar className="text-sm" />
                ENTRY
              </span>
            </div>
            <div className="absolute top-[3vw] left-[19.8vw] right-[2.4vw] flex justify-between text-white">
              <div className="flex flex-col">
                <span className="text-[1.44vw] min-text-[16px] font-space font-bold">MINI HALL 2</span>
              </div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">8:00 AM - 5:00 PM</div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">04-09-2025</div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">FREE</div>
            </div>
          </div>
          
          <div
            className="absolute top-[15.6vw] left-[12vw] w-[76.8vw] h-[17.4vw] rounded-[2.1vw] border-[0.06vw] backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(180,180,180,0.25)_1.74%,rgba(79,79,79,0.25)_1.75%,rgba(255,255,255,0.25)_33.05%,rgba(175,175,175,0.25)_97.16%)] group-hover:bg-[linear-gradient(122.72deg,rgba(180,180,180,0.35)_1.74%,rgba(79,79,79,0.35)_1.75%,rgba(255,255,255,0.35)_33.05%,rgba(175,175,175,0.35)_97.16%)] transition-all duration-500"
            style={{
              borderImage: `radial-gradient(88.13% 63.48% at 26.09% 25.74%, #FFFFFF 0%, rgba(255, 255, 255, 0.905829) 8.52%, rgba(255, 255, 255, 0.801323) 40.45%, rgba(255, 255, 255, 0.595409) 40.46%, rgba(255, 255, 255, 0.29) 96.15%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%) linear-gradient(180deg, rgba(0, 0, 0, 0.2) 18.72%, rgba(255, 30, 0, 0.2) 43.64%, rgba(0, 0, 0, 0.2) 67.21%)`,
              borderImageSlice: 1,
            }}
          >
            <div className="absolute left-[25.2vw] top-[1.8vw]">
              <h1 className="text-white text-[1.08vw] min-text-[12px] font-space mb-[-0.6vw]">EVENT</h1>
              <h2 className="text-white text-[2.52vw] min-text-[24px] font-anton group-hover:text-blue-300 transition-colors duration-500">WORKSHOP</h2>
            </div>
            <div className="absolute right-[3.6vw] top-[3.6vw] text-right">
              <p className="text-white text-[1.32vw] min-text-[14px] font-inter">
                Wisdom and Wonder: Tune in to learn from the best!
              </p>
            </div>
          </div>
          
          <img
            src="/alexaverse2.0/workshop-img.svg"
            alt="Workshop"
            className="absolute top-[4.8vw] left-[-14.4vw] w-[76.8vw] h-[19.8vw] object-contain rounded-[2.1vw] select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />

          <button
            onClick={() => handleRegister("Workshop")}
            className="absolute top-[26.4vw] left-[15vw] w-[18.6vw] h-[4.32vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(144,144,144,0.25)_1.74%,rgba(63,63,63,0.25)_1.75%,rgba(204,204,204,0.25)_33.05%,rgba(140,140,140,0.25)_97.16%)] hover:bg-[linear-gradient(122.72deg,rgba(144,144,144,0.35)_1.74%,rgba(63,63,63,0.35)_1.75%,rgba(204,204,204,0.35)_33.05%,rgba(140,140,140,0.35)_97.16%)] transition-all duration-300 group-hover:scale-105"
          >
            <img
              src="/alexaverse2.0/rewind-button.png"
              alt="Rewind Button"
              className="absolute left-[0.96vw] top-1/2 -translate-y-1/2 w-[1.92vw] h-[2.52vw] object-contain invert select-none pointer-events-none"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
            <img
              src="/alexaverse2.0/fast-forward-button.png"
              alt="Fast Forward Button"
              className="absolute left-[15.96vw] top-1/2 -translate-y-1/2 w-[1.92vw] h-[2.52vw] object-contain invert select-none pointer-events-none"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
            <div
              className="absolute left-[9.36vw] top-[2.16vw] -translate-x-1/2 -translate-y-1/2 w-[9.36vw] h-[5.04vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              <img
                src="/alexaverse2.0/play-button.png"
                alt="Play Button"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[6.24vw] h-[1.92vw] object-contain select-none pointer-events-none"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
            </div>
          </button>

          <div
            className="absolute top-[22.2vw] left-[37.2vw] w-[48vw] h-[2.52vw] rounded-[3.12vw] border-[0.1vw] border-white backdrop-blur-[5vw] group-hover:border-blue-300 transition-colors duration-300"
            style={{
              background: 'linear-gradient(to right, black 40%, transparent 40%)'
            }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[5.04vw] h-[3.12vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-white group-hover:bg-blue-300 transition-colors duration-300"
              style={{
                left: '40%',
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
          </div>

          <div
            className="absolute top-[27vw] left-[37.2vw] w-[48vw] h-[5.04vw] rounded-[1.44vw] border-[0.1vw] border-white backdrop-blur-[5vw] flex items-center justify-center p-[1.2vw] group-hover:border-blue-300 transition-colors duration-300"
            style={{
              background: 'black'
            }}
          >
            <p className="text-white text-center font-inter text-[1.08vw] min-text-[14px] leading-tight">
              An immersive journey led by two distinct speakers, delivering the most valuable insights from the ever-evolving realm of Generative AI.
            </p>
          </div>
        </div>

        {/* Continue with other events... */}
        {/* Add similar enhanced cards for Vlogit, Debug, and Hangman */}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-[#1A052A] via-[#511e5b] to-[#030645] rounded-2xl p-8 max-w-md w-full border border-white/20 animate-in slide-in-from-bottom-8 duration-300">
            <div className="text-center">
              <HiSparkles className="text-4xl text-purple-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-audiowide text-white mb-4">{eventName}</h3>
              <p className="text-gray-300 mb-6">{modalMessage}</p>
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-gradient-to-r from-[#563AFF] to-[#FF4E78] rounded-full text-white font-audiowide hover:scale-105 transition-transform duration-300"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurEvents;