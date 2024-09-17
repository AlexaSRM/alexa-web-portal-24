"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";
import Image from "next/image";

export default function SlideShow() {
  const images = [
    "/events/1.avif",
    "/events/2.avif",
    "/events/3.avif",
    "/events/4.avif",
    "/events/5.avif",
  ];
  return (
    <ImagesSlider className="h-[40rem] " images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        {/* <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>More on our  <Image src='/events/drive.png' height={16} width={16} className="inline" alt='drive'/></span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button> */}
      </motion.div>
    </ImagesSlider>
  );
}
