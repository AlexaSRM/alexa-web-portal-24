"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/sanity/schemas/event-schema";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

type Props = {
  event: Event[];
};

const CustomCarousel: React.FC<Props> = ({ event }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCarousel = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === event.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);
  };

  const stopCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseEnter = (index: number) => {
    setIsHovered(index);
    stopCarousel();
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
    startCarousel();
  };

  useEffect(() => {
    startCarousel();
    return () => stopCarousel();
  }, []);

  return (
    <>
      <div className="h-full w-fill flex flex-col items-center justify-center gap-4">
        <div className="text-5xl font-bold text-center text-white flex flex-col items-center justify-center">
          <h1 className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent">
            Our Events
          </h1>
          <Image
            src="hero-sep.svg"
            height={10}
            width={300}
            alt="Hero Separator"
            className="mt-5 pl-14 items-center justify-center justify-items-center place-items-center"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {event.map((evt, index) => (
          <CardContainer
            // key={evt._id}
            className={`${
              index === isHovered || (isHovered === null && index === activeIndex)
                ? "scale-110 z-10"
                : "scale-100 opacity-70 z-0"
            } transition-transform duration-300 ease-in-out`}
            containerClassName="m-2"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={`/events/${evt.slug}`}>
              <CardBody className="relative">
                <Image
                  src={evt.poster}
                  alt={evt.title}
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                />
                <CardItem
                  className="absolute bottom-2 left-2 text-white text-lg font-semibold"
                  translateZ={50}
                >
                  {evt.title}
                </CardItem>
              </CardBody>
            </Link>
          </CardContainer>
        ))}
    </div>
    </>
  );
};

export default CustomCarousel;
