import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getEventBySlug } from "@/sanity/data/events-data";
import event from "@/sanity/schemas/event-schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    eventSlug: string;
  };
};

const EventView = async ({ params }: Props) => {
  const eventData = await getEventBySlug(params.eventSlug);
  return (
    <div className="max-w-full w-full h-full mt-4 md:mt-10 pr-6 flex flex-col md:flex-row items-center gap-6 lg:gap-10">
      {/* left */}
      <div className="ml-8 md:ml-16 md:w-3/4 lg:2/3 flex flex-col">
        {eventData.status == "comingSoon" && (
          <div className="px-4 py-2 max-w-fit rounded-full relative bg-[#2EB45A] bg-opacity-40 text-white text-sm hover:shadow-2xl hover:shadow-[#2EB45A]/[0.1] transition duration-200 border border-[#949795]">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            <span className="relative z-20 font-bold text-[#2EB45A]">
              Upcoming Event
            </span>
          </div>
        )}
        {eventData.status == "registrationsOpen" && (
          <div className="px-4 py-2 max-w-fit rounded-full relative bg-[#2EB45A] bg-opacity-40 text-white text-sm hover:shadow-2xl hover:shadow-[#2EB45A]/[0.1] transition duration-200 border border-[#949795]">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            <span className="relative z-20 font-bold text-[#2EB45A]">
              Upcoming Event
            </span>
          </div>
        )}
        {eventData.status == "registrationsClosed" && (
          <div className="mt-1 px-4 py-2 w-fit rounded-full relative bg-[#E26760] bg-opacity-40 text-white text-sm hover:shadow-2xl hover:shadow-[#E26760]/[0.1] transition duration-200 border border-[#E26760]">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            <span className="relative z-20 font-bold text-[#E26760]">
              Event Ended
            </span>
          </div>
        )}
        {eventData.status == "ended" && (
          <div className="mt-1 px-4 py-2 w-fit rounded-full relative bg-[#E26760] bg-opacity-40 text-white text-sm hover:shadow-2xl hover:shadow-[#E26760]/[0.1] transition duration-200 border border-[#E26760]">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            <span className="relative z-20 font-bold text-[#E26760]">
              Event Ended
            </span>
          </div>
        )}
        <h1 className="text-5xl mt-8 font-bold text-white">
          {eventData.title}
        </h1>
        <p className="text-xl mt-4 md:mr-16 text-white font-semibold">
          {eventData.description}
        </p>
        <div className="mt-14 mb-8">
          <p className="font-normal text-white">
            Do not miss out the chance to be part of something amazing!!
          </p>
          <p className="font-normal text-white">
            Checkout your certificates and images here
          </p>
        </div>
        {eventData.status == "ended" && (
          <div className="flex flex-row gap-6 justify-center md:justify-start">
            {eventData.certificatesLink && (
              <Link
                href={eventData.certificatesLink}
                className="p-[3px] relative"
                target="_blank"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2DB35D] to-[#0FA48D] rounded-lg" />
                <div className="px-2 lg:px-8 py-2  bg-[#313131] relative group transition duration-200 text-white hover:bg-transparent">
                  <span className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent font-bold group-hover:text-black">
                    CERTIFICATES
                  </span>
                </div>
              </Link>
            )}
            {eventData.galleryLink && (
              <Link
                href={eventData.galleryLink}
                className="p-[3px] relative"
                target="_blank"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2DB35D] to-[#0FA48D] rounded-lg" />
                <div className="px-2 lg:px-8 py-2  bg-[#313131] relative group transition duration-200 text-white hover:bg-transparent">
                  <span className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent font-bold group-hover:text-black">
                    IMAGE GALLERY
                  </span>
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
      {/* right */}
      <div
        className={cn(
          "max-w-full mx-8 h-[500px] w-[500px] p-2 bg-transparent rounded-2xl overflow-hidden relative group flex items-center justify-center drop-shadow-xl"
        )}
      >
        <Image
          alt="Event Image"
          className={cn(
            "h-full w-full px-1 object-cover flex items-center justify-center rounded-2xl drop-shadow-xl"
          )}
          width="500"
          height="500"
          src={eventData.poster}
        />
      </div>
    </div>
  );
};

export default EventView;
