import Image from "next/image";
import React from "react";

type Props = {
  domainData: {
    title: string;
    slogan: string;
    description: string;
    image: string;
  };
};

function Technical({ domainData }: Props) {
  return (
    <div className="hidden w-full md:flex md:flex-row flex-col lg:gap-10 text-white px-8 lg:px-40">
      <div className="w-1/2 f-full flex flex-col items-center justify-center gap-6">
        <div className="w-full text-7xl font-semibold">
          <span>{domainData.title}</span>
          <span className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent ml-2">
            .
          </span>
        </div>
        <div className="w-full text-normal sm:text-lg md:text-2xl leading-snug tracking-wide">
          {domainData.description}
        </div>
      </div>
      <div className="w-1/2 h-full flex place-items-end justify-end relative">
        <Image
          src={domainData.image}
          height={10}
          width={600}
          alt={`${domainData.title} Image`}
          className="relative right-0 -top-5 "
        />
      </div>
    </div>
  );
}

export default Technical;
