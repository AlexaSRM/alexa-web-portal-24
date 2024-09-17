"use client";
import Image from "next/image";
import { TextGenerateEffect } from "../ui/text-generate-effect";

type Props = {};

function Sponsors({}: Props) {
  const sponsorsList = [
    {
      id: 1,
      sponsor: "JIO",
      image: "/alexaverse/Jio.png",
    },
    {
      id: 2,
      sponsor: "Yatra",
      image: "/alexaverse/yatra (1).png",
    },
    {
      id: 3,
      sponsor: "FPV",
      image: "/alexaverse/FPV.png",
    },
    {
      id: 4,
      sponsor: "Interview",
      image: "/alexaverse/Interview.png",
    },
  ];

  const text = "Designed and Developed by Alexa Developers SRM.";

  return (
    <div className="flex flex-col justify-center items-center pb-10 pt-20">
      <Image
        src="/alexaverse/Sponsors.png"
        height={164}
        width={320}
        alt="Hero Separator"
        objectPosition="center"
        className="-mt-8 px-5"
      />

      <div className="w-full flex text-white justify-center font-bold text-5xl md:text-7xl items-center mb-16 ">
        {/* Title could go here if needed */}
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8">
        {sponsorsList.map((sponsor) => (
          <div
            key={sponsor.id}
            className="flex justify-center md:px-24 items-center  pt-8 bg-transparent rounded-lg"
          >
            <Image
              src={sponsor.image}
              alt={sponsor.sponsor}
              width={130}
              height={100}
              objectFit="contain"
              className="sponsor-image"
            />
          </div>
        ))}
      </div>

      <TextGenerateEffect
        words={text}
        gradientColors="from-[#980F35] to-[#AF6922]" // Custom gradient for this page
        className="my-custom-class mt-10 mb-2 text-center"
      />
    </div>
  );
}

export default Sponsors;
