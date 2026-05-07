import Header from "@/components/home/Header";
import Hero1 from "@/components/Group/Hero1";
import Text from "@/components/Group/Text";
import Form1 from "@/components/Group/Form1";
import Footer from "@/components/home/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Group Dining & Restaurant Events Chelsea | Indian Panorama",
    description:
        "Gather with colleagues or loved ones in a refined setting. Indian Panorama accommodates group bookings with seamless service and a spectacular Indian menu.",
    alternates: { canonical: "/group" },
    openGraph: {
        title: "Group Dining & Restaurant Events Chelsea | Indian Panorama",
        description:
            "Gather with colleagues or loved ones in a refined setting. Indian Panorama accommodates group bookings with seamless service and a spectacular Indian menu.",
        url: "https://indianpanoramachelsea.co.uk/group",
    },
};

export default function GroupBooking() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <Hero1 />
            <Text />
            <Form1 />
            <Footer />
        </main>
    );
}
