import React from "react";
import { Meteors } from "../ui/meteors";
import Image from "next/image";

type Props = {
    domain: {
        title: string;
        description: string;
        image: string;
    }
};

export function MeteorsDemo({ domain }: Props) {
  return (
    <div className="md:hidden my-4">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#31B553] to-[#0AA294] transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-[#242424] border text-justify border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            <Image
            src={domain.image}
            height={10}
            width={600}
            alt={domain.title}
            className="relative right-0 -top-5"
            />

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {domain.title}
          </h1>

          <p className="font-normal text-base text-white mb-4 relative z-50">
            {domain.description}
          </p>

          {/* Meaty part - Meteor effect */}
          <Meteors number={40} />
        </div>
      </div>
    </div>
  );
}
