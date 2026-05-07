import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import DrinksMenuContent from "@/components/menu/DrinksMenuContent";

export const metadata: Metadata = {
    title: "Signature Cocktails & Wine Pairings | Indian Panorama",
    description:
        "Complement your dining experience with our sophisticated beverage selection, featuring fine global wines and artisanal cocktails crafted in Chelsea.",
    alternates: { canonical: "/menu/drinks" },
    openGraph: {
        title: "Signature Cocktails & Wine Pairings | Indian Panorama",
        description:
            "Complement your dining experience with our sophisticated beverage selection, featuring fine global wines and artisanal cocktails crafted in Chelsea.",
        url: "https://indianpanoramachelsea.co.uk/menu/drinks",
        type: "website",
    },
};

export default function DrinksMenuPage() {
    return (
        <main className="min-h-screen bg-[#161d18]">
            <Header />
            <DrinksMenuContent />
            <Footer />
        </main>
    );
}
