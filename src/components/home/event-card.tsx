"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const EventCard = ({
  imageUrl,
  title,
  titleClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  title: string;
  titleClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "md:h-96 w-60 h-60 md:w-96 bg-transparent rounded-lg overflow-hidden relative group",
        className
      )}
    >
      <div className="relative h-full w-full">
        <Image
          alt="Event Image"
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-50",
            imageClassName
          )}
          width="1000"
          height="1000"
          src={imageUrl}
        />
        <h1
          className={cn(
            "absolute bottom-6 left-6 z-40 text-4xl font-bold bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent group-hover:scale-125",
            titleClassName
          )}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};
