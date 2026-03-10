import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import CulinaryJourney from "@/components/home/CulinaryJourney";
import Focus from "@/components/home/Focus";
import Link from 'next/link';
import Footer from "@/components/home/footer"; // Assuming filename is footer.tsx but component is Footer
import Gallery from "@/components/home/Gallery";
import MapSection from "@/components/home/MapSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#161d18]">
      <Header />
      <Hero />
      <CulinaryJourney />
      <Focus />
      <Gallery />
      <MapSection />
      <Footer />
      <div className="relative">

        {/* Other sections will go here */}
      </div>
    </main>
  );
}
