import Navbar from "@/components/recruitments/Navbar";
import Banner from "@/components/recruitments/Banner";
import Domains from "@/components/recruitments/Domains";
import Footer from "@/components/recruitments/Footer";
import Timeline from "@/components/recruitments/Timeline";

export default function Recruitments() {
  return (
    <div className="h-full">
      <Navbar />
      <Banner />
      <Domains />
      <Timeline />
      <Footer />
    </div>
  )
}