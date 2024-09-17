import Landing from "@/components/alexaverse/landing";
import Sponsors from "@/components/alexaverse/sponsers";
import Tickets from "@/components/alexaverse/tickets";
import { useScroll, useTransform } from "framer-motion";
import React from "react";



export default function SparklesPreview() {
  return (
    <>
    <Landing />
    <Tickets />
    <Sponsors />
    </>
  );
}
