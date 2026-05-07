import Footer from "@/components/home/footer";
import ReservationForm from "@/components/Resrvetion/form";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book a Table | Indian Restaurant Chelsea | Indian Panorama",
    description:
        "Secure your reservation for an unforgettable dining experience. Join us for sophisticated Indian cuisine and quiet elegance in the heart of Chelsea.",
    alternates: { canonical: "/reservation" },
    openGraph: {
        title: "Book a Table | Indian Restaurant Chelsea | Indian Panorama",
        description:
            "Secure your reservation for an unforgettable dining experience. Join us for sophisticated Indian cuisine and quiet elegance in the heart of Chelsea.",
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
                Reserve Your Experience at Indian Panorama
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
