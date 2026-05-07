import type { Metadata } from "next";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import LunchMenuContent from "@/components/menu/LunchMenuContent";

export const metadata: Metadata = {
    title: "Indian Lunch Menu Chelsea | Refined Midday Dining",
    description:
        "Elevate your midday dining with our bespoke lunch menu. Discover seasonal Indian flavors perfect for a leisurely afternoon or a sophisticated business lunch.",
    alternates: { canonical: "/menu/lunch" },
    openGraph: {
        title: "Indian Lunch Menu Chelsea | Refined Midday Dining",
        description:
            "Elevate your midday dining with our bespoke lunch menu. Discover seasonal Indian flavors perfect for a leisurely afternoon or a sophisticated business lunch.",
        url: "https://indianpanoramachelsea.co.uk/menu/lunch",
        type: "website",
    },
};

export default function LunchMenuPage() {
    return (
        <main className="min-h-screen bg-[#161d18]">
            <Header />
            <LunchMenuContent />
            <Footer />
        </main>
    );
}
