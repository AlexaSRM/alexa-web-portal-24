"use client";

import Image from "next/image";
import HeroSection from "@/components/alexaverse-v3/HeroSection";
import OurEvents from "@/components/alexaverse-v3/OurEvents";
import OurSponsors from "@/components/alexaverse-v3/OurSponsors";
import ContactUs from "@/components/alexaverse-v3/ContactUs";

export default function AlexaVerseV3Page() {
  return (
    <main className="bg-black min-h-screen">
      <section className="relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/alexaverse3.0/our-events-background.svg"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10">
          <HeroSection />
          <OurEvents />
        </div>
      </section>

      {/* <OurSponsors /> */}
      <ContactUs />
    </main>
  );
}
