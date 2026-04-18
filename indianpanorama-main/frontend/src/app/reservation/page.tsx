import Footer from "@/components/home/footer";
import ReservationForm from "@/components/Resrvetion/form";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book a Table | Indian Panorama Chelsea — Reserve Online SW3",
    description:
        "Reserve your table at Indian Panorama Chelsea on Draycott Avenue, SW3. Authentic regional Indian dining minutes from Sloane Square, South Kensington and Knightsbridge. Book online in under a minute.",
    alternates: { canonical: "/reservation" },
    openGraph: {
        title: "Book a Table | Indian Panorama Chelsea — Reserve Online SW3",
        description:
            "Reserve your table at Indian Panorama Chelsea on Draycott Avenue, SW3. Book online in under a minute.",
        url: "https://indianpanoramachelsea.co.uk/reservation",
    },
};

export default function ReservationPage() {
    return (
        <main className="min-h-screen bg-[#161d18] relative">

            {/* Background Image with Blur */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/hero.png"
                    alt="Indian Panorama Chelsea dining room interior"
                    fill
                    priority
                    className="object-cover object-center blur-sm brightness-50"
                    sizes="100vw"
                />
            </div>

            <h1 className="sr-only">
                Book a Table at Indian Panorama Chelsea — Reserve Online in SW3 London
            </h1>

            <div className="relative z-10"> {/* Offset for fixed header height */}
                <ReservationForm />
            </div>

            <div className="relative z-10">
                <Footer />
            </div>
        </main>
    );
}
