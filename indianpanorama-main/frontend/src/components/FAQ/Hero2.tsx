import Image from "next/image";

const Hero2 = () => {
    return (
        <section className="relative w-full mt-[94px] bg-white">
            <div className="relative w-full h-[30vh] md:h-[85vh] overflow-hidden">
                <Image
                    src="/FAQ/hero33.png"
                    alt="Indian Panorama Chelsea — frequently asked questions about dining, dietary options and accessibility"
                    fill
                    priority
                    className="object-contain md:object-cover object-center"
                    sizes="100vw"
                />
                {/* Overlay for better text visibility if needed, matching the theme */}
                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-20 text-center">
                    <span
                        className="font-[var(--font-jost)] text-[#CBAC70] text-[11px] md:text-[13px] uppercase inline-flex items-center gap-3 mb-5"
                        style={{ letterSpacing: "0.38em" }}
                    >
                        <span className="h-px w-8 md:w-12 bg-[#CBAC70]" />
                        Indian Panorama Chelsea
                        <span className="h-px w-8 md:w-12 bg-[#CBAC70]" />
                    </span>
                    <h1
                        className="font-serif text-[#f5ecd8] text-3xl md:text-5xl lg:text-6xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                        style={{ letterSpacing: "0.02em" }}
                    >
                        Frequently Asked Questions<br className="hidden md:block" />
                        <span className="italic text-[#CBAC70]"> about Dining in Chelsea</span>
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default Hero2;
