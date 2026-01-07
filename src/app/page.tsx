import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Destinations from "@/components/Destinations";
import Specialties from "@/components/Specialties";
import History from "@/components/History";
import Gallery from "@/components/Gallery";
import Directions from "@/components/Directions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Destinations />
      <Specialties />
      <History />
      <Gallery />
      <Directions />
      <Footer />
    </div>
  );
}
