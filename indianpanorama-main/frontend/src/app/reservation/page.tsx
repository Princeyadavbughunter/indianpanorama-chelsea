import Footer from "@/components/home/footer";
import ReservationForm from "@/components/Resrvetion/form";
import Image from "next/image";

export default function ReservationPage() {
    return (
        <main className="min-h-screen bg-[#161d18] relative">

            {/* Background Image with Blur */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/hero.png"
                    alt="Background"
                    fill
                    priority
                    className="object-cover object-center blur-sm brightness-50"
                    sizes="100vw"
                />
            </div>

            <div className="relative z-10"> {/* Offset for fixed header height */}
                <ReservationForm />
            </div>

            <div className="relative z-10">
                <Footer />
            </div>
        </main>
    );
}
