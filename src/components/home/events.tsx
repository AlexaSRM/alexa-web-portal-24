import Image from "next/image";
import React from "react";

type Props = {};

function Events({}: Props) {
  return (
    <div className="hidden w-full md:flex md:flex-row flex-col lg:gap-10 text-white px-8 lg:px-40">
      <div className="w-1/2 f-full flex flex-col items-center justify-center gap-6">
      <div className="w-full text-7xl">
          <span>Events</span>
          <span className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent ml-2">
            .
          </span>
        </div>
        <div className="w-full text-2xl font-thin">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
      <div
        className="w-1/2 h-full flex place-items-end justify-end relative"
      >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#31B553] to-[#0AA294] transform scale-[0.80] rounded-full blur-[100px]" />

        <Image
          src="/home/social.svg"
          height={10}
          width={600}
          alt="events"
          className="relative right-0 -top-5"
        />
      </div>
    </div>
  );
}

export default Events;