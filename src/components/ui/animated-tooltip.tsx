"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";

export const AnimatedTooltip = ({
  item,
}: {
  item: {
    id: number;
    platform: string;
    username: string;
    url: string;
    image: string;
  };
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div
      className="flex items-center justify-center relative group w-50 h-50"
      key={item.username}
      onMouseEnter={() => setHoveredIndex(item.id)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <Link href={item.url} target="_blank" rel="noopener noreferrer">
        {/* Tooltip */}
        <AnimatePresence mode="popLayout">
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -top-16 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
            >
              <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
              <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
              <div className="font-bold text-white relative z-30 text-base">
                {item.username}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image */}
        <Image
          onMouseMove={handleMouseMove}
          height={100}
          width={200}
          src={item.image}
          alt={item.username}
          className="object-cover rounded-full h-60 w-60 group-hover:scale-110 transition duration-500"
        />
      </Link>
    </div>
  );
};
