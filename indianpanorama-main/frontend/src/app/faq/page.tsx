import Header from "@/components/home/Header";
import Hero2 from "@/components/FAQ/Hero2";
import Faq, { faqData } from "@/components/FAQ/Faq";
import Footer from "@/components/home/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQs | Indian Panorama Chelsea — Dietary, Halal, Accessibility & More",
    description:
        "Answers to common questions about dining at Indian Panorama Chelsea on Draycott Avenue, SW3 — halal, vegan, gluten-free options, travel, dress code, accessibility and private hire.",
    alternates: { canonical: "/faq" },
    openGraph: {
        title: "FAQs | Indian Panorama Chelsea — Dietary, Halal, Accessibility & More",
        description:
            "Dietary requirements, halal, vegan, gluten-free, accessibility and travel information for Indian Panorama Chelsea.",
        url: "https://indianpanoramachelsea.co.uk/faq",
    },
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
        },
    })),
};

export default function FAQ() {
    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Header />
            <Hero2 />
            <Faq />
            <Footer />
        </main>
    );
}
