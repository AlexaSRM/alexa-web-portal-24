"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { title } from "process";
import Image from "next/image";

type Props = {
  events: {
    title: string;
    slug: string;
    poster: string;
  }[];
};

const OurEvents = ({ events }: Props) => {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
      <div className="text-5xl font-bold text-center text-white flex flex-col items-center justify-center">
        <h1 className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent">
          Our Events
        </h1>
        <Image
          src="hero-sep.svg"
          height={10}
          width={300}
          alt="Hero Separator"
          className="mt-5 mb-16 pl-14 items-center justify-center justify-items-center place-items-center"
        />
      </div>
      <InfiniteMovingCards items={events} direction="right" speed="normal" />
    </div>
  );
};

const eventList = [
  {
    title: "Event 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/home/our-events.png",
  },
  {
    title: "Event 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/home/our-events.png",
  },
  {
    title: "Event 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/home/our-events.png",
  },
  {
    title: "Event 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/home/our-events.png",
  },
];

export default OurEvents;
