import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import MenuPageContent from "@/components/menu/MenuPageContent";

export const metadata: Metadata = {
    title: "Indian Fine Dining Menu Chelsea | Indian Panorama London",
    description:
        "Explore our thoughtfully crafted evening menu. Indian Panorama presents authentic, elevated Indian cuisine blending classic traditions with modern elegance.",
    alternates: { canonical: "/menu" },
    openGraph: {
        title: "Indian Fine Dining Menu Chelsea | Indian Panorama London",
        description:
            "Explore our thoughtfully crafted evening menu. Indian Panorama presents authentic, elevated Indian cuisine blending classic traditions with modern elegance.",
        url: "https://indianpanoramachelsea.co.uk/menu",
        type: "website",
    },
};

export default function MenuPage() {
    return (
        <main className="min-h-screen bg-[#161d18]">
            <Header />
            <MenuPageContent />
            <Footer />
        </main>
    );
}
