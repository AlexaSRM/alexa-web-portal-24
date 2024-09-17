"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { platform } from "os";
import Image from "next/image";
import { TextGenerateEffect } from "../ui/text-generate-effect";

type Props = {};

function ContactUs({}: Props) {
  const contactList = [
    {
      id: 1,
      platform: "Instagram",
      username: "@alexadevsrmv",
      url: "https://www.instagram.com/alexadevsrm",
      image: "/social-icons/instagram.svg",
    },
    {
      id: 2,
      platform: "Mail",
      username: "alexadevsrm@gmail.com",
      url: "mailto:alexadevsrm@gmail.com",
      image: "/social-icons/gmail.svg",
    },
    {
      id: 3,
      platform: "LinkedIn",
      username: "Alexa Developers SRM",
      url: "https://www.linkedin.com/company/alexa-developers-srm",
      image: "/social-icons/linkedin.svg",
    },
    {
      id: 4,
      platform: "X",
      username: "@alexadevsrm",
      url: "https://x.com/alexadevsrm",
      image: "/social-icons/x.svg",
    },
    {
      id: 5,
      platform: "Youtube",
      username: "@alexadeveloperssrm9430",
      url: "https://www.youtube.com/@alexadeveloperssrm9430",
      image: "/social-icons/youtube.svg",
    },
    {
      id: 6,
      platform: "Facebook",
      username: "Alexa Developers SRM",
      url: "https://www.facebook.com/alexadevsrm",
      image: "/social-icons/facebook.svg",
    }
  ];
  const text = "Designed and Developed by Alexa Developers SRM.";
  return (
    <div className="flex flex-col justify-center items-center pb-20">
      <Image
        src="/social-icons/sep.png"
        height={10}
        width={10}
        alt="Hero Separator"
        className="mt-5 w-[90%] h-1 sm:mt-24 md:mt-40"
      />
      <div className="relative w-fit h-fit my-20">
        {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#31B553]/[0.4] to-[#0AA294]/[0.4] transform scale-[0.80] rounded-full blur-[130px]" /> */}
        <div className="grid grid-flow-row grid-cols-2 place-content-center md:flex md:flex-row items-center justify-center w-full lg:px-20">
          {contactList.slice(0, 3).map((item, key) => (
            <AnimatedTooltip key={`${platform} + ${key}`} item={item} />
          ))}
          <Image
            src="/social-icons/alexa.png"
            height={850}
            width={850}
            alt="Hero Logo"
            className="hidden md:flex md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px] z-20"
          />
          {contactList.slice(3).map((item, key) => (
            <AnimatedTooltip key={`${platform} + ${key}`} item={item} />
          ))}
        </div>
      </div>
      <div className="w-full flex text-white justify-center font-bold text-5xl md:text-7xl items-center">
        <span>Contact Us</span>
        <span className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent ml-2">
          .
        </span>
      </div>
      <TextGenerateEffect words={text} />
    </div>
  );
}

export default ContactUs;
