import React from "react";
import AvatarImage from "./avatar";
import Image from "next/image";
import { Member } from "@/sanity/schemas/member-schema";

type Props = {
  person: Member;
};

const PersonCard = ({ person }: Props) => {
  const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
  }
  return (
    <div className="flex flex-col items-center justify-center mx-1 my-2">
      <AvatarImage
        name={person.name}
        initials={getInitials(person.name)}
        url={person.photo}
      />
      <h2 className="font-bold text-center text-white md:text-lg">{person.name}</h2>
      <h2 className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent md:text-lg">
        {person.role}
      </h2>
      <div className="flex flex-row gap-3 md:gap-5 mt-2">
        <a href={person.instagram} target="_blank" rel="noopener noreferrer">
          <Image
            src="/our-team/instagram.svg"
            alt="Instagram"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </a>
        <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
          <Image
            src="/our-team/linkedin.svg"
            alt="LinkedIn"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </a>
        {person.github && <a href={person.github} target="_blank" rel="noopener noreferrer">
          <Image
            src="/our-team/github.svg"
            alt="Github"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </a>}
      </div>
    </div>
  );
};

export default PersonCard;
