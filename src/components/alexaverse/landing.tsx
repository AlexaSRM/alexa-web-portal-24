import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";

type Props = {};

const Landing = (props: Props) => {
  return (
    <div className="flex flex-col w-full mx-auto rounded-md h-[92vh] max-h-[calc(100vh-20%)] overflow-hidden justify-center items-center">
      <CardContainer className="inter-var w-[100%] group ml-10">
        {/* <div className="absolute  h-full w-full bg-gradient-to-r from-[#31B553] to-[#0AA294] transform scale-[0.80] rounded-full blur-3xl" /> */}
        <CardBody className="relative border-none bg-transparent inset-0 z-40 w-auto sm:w-[30rem] h-auto rounded-xl  shadow-2xl">
          <CardItem translateZ="90" className="w-full ">
            <Image
              src="/alexaverse/logo.png"
              alt="AlexaVerse"
              height={550}
              width={550}
              // layout="fill"
              // objectFit="cover"
              objectPosition="center"
              className="-mt-32"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
      <Image
        src="/alexaverse/title.png"
        alt="AlexaVerse"
        height={450}
        width={450}
        // layout="fill"
        // objectFit="cover"
        objectPosition="center"
        className="-mt-8 px-5"
      />
    </div>
  );
};

export default Landing;
