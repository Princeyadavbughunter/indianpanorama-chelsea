import Header from "@/components/home/Header";
import Hero from "@/components/Blog/hero";
import Main from "@/components/Blog/main";
import Footer from "@/components/home/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Journal | Indian Panorama Chelsea Blog — Stories from the Kitchen",
    description:
        "Chef notes, regional dispatches and behind-the-scenes reflections from Indian Panorama Chelsea on Draycott Avenue, SW3. Read our latest articles on regional Indian cuisine, tandoor craft and seasonal menus.",
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "The Journal | Indian Panorama Chelsea Blog",
        description:
            "Stories from the kitchen of Indian Panorama Chelsea — chef notes, regional dispatches and seasonal reflections.",
        url: "https://indianpanoramachelsea.co.uk/blog",
    },
};

export default function Blog() {
    return (
        <main className="min-h-screen bg-[#E9E1DC]">
            <Header />
            <Hero />
            <Main />
            <Footer />
        </main>
    );
}
