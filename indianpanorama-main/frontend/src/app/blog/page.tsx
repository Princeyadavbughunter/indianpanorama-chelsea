
import Header from "@/components/home/Header";
import Hero from "@/components/Blog/hero";
import Main from "@/components/Blog/main";
import Footer from "@/components/home/footer";

export default function Blog() {
    return (
        <main className="min-h-screen bg-[#161d18]">
            <Header />
            <Hero />
            <div className="w-full h-16 md:h-32 bg-white" />
            <Main />

            <Footer />
        </main>
    );
}
