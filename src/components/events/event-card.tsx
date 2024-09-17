"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { Meteors } from "../ui/meteors";
import { Event } from "@/sanity/schemas/event-schema";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <CardContainer className="inter-var w-[100%]">
      <div className="absolute  h-full w-full bg-gradient-to-r from-[#31B553] to-[#0AA294] transform scale-[0.80] rounded-full blur-3xl" />
      <CardBody className="relative  inset-0 bg-[#242424] z-40 w-auto sm:w-[30rem] h-auto rounded-xl p-6  ">
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={event.poster}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={`${event.title} image`}
          />
        </CardItem>
        <div className="flex justify-end items-end mt-6">
          <CardItem translateZ={60} className="rounded-xl  text-xs font-bold">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <Link href={`/events/${event.slug}`} className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>Check out</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </Link>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </CardItem>
        </div>
        {/* <Meteors number={40} /> */}
      </CardBody>
    </CardContainer>
  );
}
