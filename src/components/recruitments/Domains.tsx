import React from 'react';

type Props = {};

const Domains = (props: Props) => {
  return (
    <div className="flex flex-col items-center py-20 bg-[#1e1e1e] text-white">
      <h1 className="text-4xl font-bold mb-16 text-[#6ac1ff]">Our Domains</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-4/5 max-w-[1200px]">
        {/* Technical Domain */}
        <div className="flex flex-col items-center bg-[#282828] rounded-2xl p-8 text-center">
          <img src="/recruitment/Technical.svg" alt="Technical Icon" className="w-20 h-20 mb-6" />
          <h2 className="text-2xl font-semibold text-[#6ac1ff] mb-4">Technical</h2>
          <p className="text-[#bdbdbd] text-base">
          Join the Technical domain, elevate your skills, and make an impact through hands-on projects in UX, resilient systems, and cutting-edge apps.
          </p>
        </div>

        {/* Creatives Domain */}
        <div className="flex flex-col items-center bg-[#282828] rounded-2xl p-8 text-center">
          <img src="/recruitment/Creatives.svg" alt="Creatives Icon" className="w-20 h-20 mb-6" />
          <h2 className="text-2xl font-semibold text-[#6ac1ff] mb-4">Creatives</h2>
          <p className="text-[#bdbdbd] text-base">
          Join the Creatives domain, where ideas become unforgettable experiences through engaging stories and seamless design, leaving a lasting impact.
          </p>
        </div>

        {/* Events Domain */}
        <div className="flex flex-col items-center bg-[#282828] rounded-2xl p-8 text-center">
          <img src="/recruitment/Events.svg" alt="Events Icon" className="w-20 h-20 mb-6" />
          <h2 className="text-2xl font-semibold text-[#6ac1ff] mb-4">Events</h2>
          <p className="text-[#bdbdbd] text-base">
          Join the Events domain, and create unforgettable events from brainstorming to execution. If you’re passionate about creativity, this is your place.
          </p>
        </div>

        {/* Business Domain */}
        <div className="flex flex-col items-center bg-[#282828] rounded-2xl p-8 text-center">
          <img src="/recruitment/Business.svg" alt="Business Icon" className="w-20 h-20 mb-6" />
          <h2 className="text-2xl font-semibold text-[#6ac1ff] mb-4">Business</h2>
          <p className="text-[#bdbdbd] text-base">
          Join the Business domain to foster innovation, build industry connections, and turn your passion into success!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Domains;
