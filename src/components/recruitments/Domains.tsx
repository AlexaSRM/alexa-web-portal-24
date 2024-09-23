import React from 'react';

type Props = {};

const Domains = (props: Props) => {
  return (
    <div id="domain" className="flex flex-col items-center py-20 text-white">
      <h1 className="text-4xl md:text-8xl font-bold mb-8 md:mb-16 bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent"><span className="text-white">Our</span> Domains</h1>

      {/* Main Container for All Domains */}
      <div className="w-11/12 md:w-4/5 max-w-[1200px] space-y-10 md:space-y-16 bg-[#282828] rounded-3xl p-6 md:p-8">
        
        {/* Technical Domain */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#282828] rounded-2xl p-6 md:p-8">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-semibold bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent mb-4">Technical.</h2>
            <p className="text-[#bdbdbd] text-base md:text-lg">
            Join the Technical domain, elevate your skills, and make an impact through hands-on projects in UX, resilient systems, and cutting-edge apps.
            </p>
          </div>
          {/* Icon Section */}
          <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
            <img src="/recruitment/Technical.svg" alt="Technical Icon" className="w-90 md:w-90 h-90 md:h-90" />
          </div>
        </div>

        {/* Creatives Domain */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#282828] rounded-2xl p-6 md:p-8">
          {/* Icon Section (Left Aligned) */}
          <div className="flex-1 flex justify-center md:justify-start">
            <img src="/recruitment/Creatives.svg" alt="Creatives Icon" className="w-90 md:w-90 h-90 md:h-90" />
          </div>
          {/* Text Section */}
          <div className="flex-1 mt-6 md:mt-0">
            <h2 className="text-4xl md:text-6xl font-semibold bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent mb-4">Creatives.</h2>
            <p className="text-[#bdbdbd] text-base md:text-lg">
            Join the Creatives domain, where ideas become unforgettable experiences through engaging stories and seamless design, leaving a lasting impact.
            </p>
          </div>
        </div>

        {/* Events Domain */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#282828] rounded-2xl p-6 md:p-8">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-semibold bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent mb-4">Events.</h2>
            <p className="text-[#bdbdbd] text-base md:text-lg">
            Join the Events domain, and create unforgettable events from brainstorming to execution. If you’re passionate about creativity, this is your place.
            </p>
          </div>
          {/* Icon Section */}
          <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
            <img src="/recruitment/Events.svg" alt="Events Icon" className="w-90 md:w-90 h-90 md:h-90" />
          </div>
        </div>

        {/* Business Domain */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#282828] rounded-2xl p-6 md:p-8">
          {/* Icon Section (Left Aligned) */}
          <div className="flex-1 flex justify-center md:justify-start">
            <img src="/recruitment/Business.svg" alt="Business Icon" className="w-90 md:w-90 h-90 md:h-90" />
          </div>
          {/* Text Section */}
          <div className="flex-1 mt-6 md:mt-0">
            <h2 className="text-4xl md:text-6xl font-semibold bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent mb-4">Business.</h2>
            <p className="text-[#bdbdbd] text-base md:text-lg">
            Join the Business domain to foster innovation, build industry connections, and turn your passion into success!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domains;
