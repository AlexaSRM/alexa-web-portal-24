import AboutUs from "@/components/home/about-us";
import Domains from "@/components/home/domains";
import Landing from "@/components/home/landing";
import OurEvents from "@/components/home/our-events";
import { getAllEvents } from "@/sanity/data/home-data";

export default async function Home() {
  const events = await getAllEvents();
  return (
    <div className="h-full">
      <Landing />
      <AboutUs />
      <Domains />
      <OurEvents events={events}/>
    </div>
  );
}
