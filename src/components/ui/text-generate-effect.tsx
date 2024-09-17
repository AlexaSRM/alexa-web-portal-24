"use client";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

export const TextGenerateEffect = ({
  words,
  className,
  gradientColors = "from-[#31B553] to-[#0AA294]", // Default gradient colors
}: {
  words: string;
  className?: string;
  gradientColors?: string; // New prop for gradient colors
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1 },
      { duration: 2, delay: stagger(0.2) }
    );
  }, [animate]);

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className={cn(
            "text-white opacity-0",
            {
              [`bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent`]:
                word === "Alexa" || word === "Developers" || word === "SRM",
            }
          )}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-normal", className)}>
      <div className="text-white text-center md:text-right text-normal sm:text-lg md:text-2xl leading-snug tracking-wide px-6 py-3 md:p-6 md:px-20 lg:px-32">
        {renderWords()}
      </div>
    </div>
  );
};
