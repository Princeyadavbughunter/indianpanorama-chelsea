import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import PrivateDiningContent from "@/components/menu/PrivateDiningContent";

export const metadata: Metadata = {
    title: "Private Dining Rooms Chelsea | Indian Panorama London",
    description:
        "Host your next gathering with understated luxury. Indian Panorama offers exclusive private dining spaces in Chelsea for memorable, tailored culinary events.",
    alternates: { canonical: "/menu/private-dining" },
    openGraph: {
        title: "Private Dining Rooms Chelsea | Indian Panorama London",
        description:
            "Host your next gathering with understated luxury. Indian Panorama offers exclusive private dining spaces in Chelsea for memorable, tailored culinary events.",
        url: "https://indianpanoramachelsea.co.uk/menu/private-dining",
        type: "website",
    },
};

export default function PrivateDiningPage() {
    return (
        <main className="min-h-screen bg-[#161d18]">
            <Header />
            <PrivateDiningContent />
            <Footer />
        </main>
    );
}
