import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import TakeawayMenuContent from "@/components/menu/TakeawayMenuContent";

export const metadata: Metadata = {
    title: "Premium Indian Takeaway Chelsea | Indian Panorama",
    description:
        "Experience the sophisticated flavors of Indian Panorama from the comfort of your home. Order our refined Indian takeaway for exquisite dining anywhere in Chelsea.",
    alternates: { canonical: "/menu/takeaway" },
    openGraph: {
        title: "Premium Indian Takeaway Chelsea | Indian Panorama",
        description:
            "Experience the sophisticated flavors of Indian Panorama from the comfort of your home. Order our refined Indian takeaway for exquisite dining anywhere in Chelsea.",
        url: "https://indianpanoramachelsea.co.uk/menu/takeaway",
        type: "website",
    },
};

export default function TakeawayMenuPage() {
    return (
        <main className="min-h-screen bg-[#161d18]">
            <Header />
            <TakeawayMenuContent />
            <Footer />
        </main>
    );
}
