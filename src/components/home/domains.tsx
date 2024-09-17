import Image from "next/image";
import React from "react";
import Technical from "./technical";
import Events from "./events";
import Creatives from "./creatives";
import Business from "./business";
import { MeteorsDemo } from "./domain-card";

type Props = {};

function Domains({}: Props) {
  const domainList = [
    {
      title: "Technical",
      slogan: "Explore, Upskill, Connect, Realizing Potential together",
      description:
        "A vibrant community of tech enthusiasts collaborating and transforming the future. The tech domain works together to perfect frontend user experiences, build robust systems in backend, and innovate ideas through app dev, elevating their skills throughout the journey.",
      image: "/home/js.svg",
    },
    {
      title: "Creatives",
      slogan: "Fueling Creative Expression, Unleashing Creative Genius",
      description:
      "In the Creatives domain, ideas evolve into unforgettable experiences. The talented content writers and designers have mastered the creation of compelling narratives and seamless design interfaces. Experience the forefront of creativity as they shape the art of engagement.",
      image: "/home/ux.svg",
    },
    {
      title: "Events",
      slogan: "Where Ideas Take Flight, Visions Turn to Reality",
      description:
      "The heartbeat of the club, from brainstorming brilliant ideas to executing them with precision, ensures that each event is not just memorable but leaves a lasting impact on everyone involved. Our events domain thrives because of the hard work and creativity of the team.",
      image: "/home/social.svg",
    },
    {
      title: "Business",
      slogan: "Your Network for Success, The Hub of Ambition",
      description:
        "The business domain is at the forefront, fostering innovation and entrepreneurial spirit among students. It provides real-world relations and networking opportunities with industry professionals, bringing in amazing sponsors through skilled PR activities and bringing imagination to life.",
      image: "/home/business.svg",
    },
  ];

  return (
    <div className="h-full w-fill flex flex-col items-center justify-center gap-4">
      <div className="text-5xl font-bold text-center text-white flex flex-col items-center justify-center">
        <h1 className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent">
          Our Domains
        </h1>
        <Image
          src="hero-sep.svg"
          height={10}
          width={300}
          alt="Hero Separator"
          className="mt-5 pl-14 items-center justify-center justify-items-center place-items-center"
        />
      </div>
      <Technical domainData={domainList[0]}/>
      <Creatives domainData={domainList[1]}/>
      <Events domainData={domainList[2]}/>
      <Business domainData={domainList[3]}/>
      {domainList.map((domain, key) => (
        <MeteorsDemo key={key} domain={domain} />
      ))}
    </div>
  );
}

export default Domains;
