import Header from "@/components/home/Header";
import Hero2 from "@/components/FAQ/Hero2";
import Faq from "@/components/FAQ/Faq";
import Footer from "@/components/home/footer";

export default function FAQ() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <Hero2 />
            <Faq />
            <Footer />
        </main>
    );
}
