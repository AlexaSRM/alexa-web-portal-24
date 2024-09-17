"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";
import Image from "next/image";
import { MoveDown } from 'lucide-react';

type Props = {};

function Landing({}: Props) {
  return (
    <div className="w-full mx-auto rounded-md h-[93vh] max-h-[calc(100vh-20%)] overflow-hidden">
      <Vortex
        backgroundColor="#242424"
        rangeY={400}
        particleCount={150}
        baseHue={120}
        className="flex items-center  px-2 md:px-10 py-4 w-full h-full"
      >
        <div className="ml-4 md:ml-12 lg:ml-24">
          <Image
            src="hero-logo.svg"
            height={850}
            width={850}
            alt="Hero Logo"
            className="sm:hidden -z-10 h-auto w-full max-h-[30rem] items-center justify-center"
          />
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Alexa Developers SRM
          </h1>
          <div className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent text-3xl  sm:text-4xl md:text-5xl xl:text-7xl font-bold mt-8 md:mt-16">
            <p className="">&ldquo;Voices United,</p>
            <p className="ml-20 sm:ml-30 md:ml-40 lg:ml-56 xl:ml-72">
              Tech Amplified&rdquo;
            </p>
          </div>
          <Image
            src="hero-sep.svg"
            height={10}
            width={500}
            alt="Hero Separator"
            className="mt-5 sm:mt-24 md:mt-40"
          />
        </div>
          <div className="mt-2 absolute bottom-5 sm:bottom-15 font-semi-bold sm:font-bold text-white w-full flex flex-col items-center gap-3 justify-center">
            <h3 className="text-white text-sm">Scroll down</h3>
            <MoveDown />
          </div>
        <Image
          src="hero-logo.svg"
          height={850}
          width={850}
          alt="Hero Logo"
          className="absolute hidden sm:inline right-0 lg:right-20 -z-10 h-40 w-40 sm:h-[450px] sm:w-[450px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px] xl:h-[800px] xl:w-[800px]"
        />
      </Vortex>
    </div>
  );
}

export default Landing;
