import Header from "@/components/home/Header";
import Hero1 from "@/components/Group/Hero1";
import Text from "@/components/Group/Text";
import Form1 from "@/components/Group/Form1";
import Footer from "@/components/home/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Private Dining & Group Bookings Chelsea SW3 | Indian Panorama",
    description:
        "Host private dining and group bookings for up to 80 guests (200 standing) at Indian Panorama Chelsea. Authentic regional Indian cuisine on Draycott Avenue, SW3 London. Enquire today.",
    alternates: { canonical: "/group" },
    openGraph: {
        title: "Private Dining & Group Bookings Chelsea SW3 | Indian Panorama",
        description:
            "Private hire for up to 80 seated or 200 standing at Indian Panorama Chelsea — authentic regional Indian fine dining on Draycott Avenue, SW3.",
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
