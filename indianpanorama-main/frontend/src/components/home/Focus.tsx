import Image from "next/image";
import Reveal from "@/components/anim/Reveal";
import Parallax from "@/components/anim/Parallax";
import SplitReveal from "@/components/anim/SplitReveal";

const PILLARS = [
    {
        number: "01",
        title: "Regional Heritage",
        body:
            "Our menu is a map of India. We use traditional 'Sil-Batta' (stone-grinding) techniques to ensure every spice blend retains its soul and vibrant aroma.",
    },
    {
        number: "02",
        title: "The Tandoor Art",
        body:
            "From smoky Burrah Chops to honey-glazed Mango Malai Tikka, our charcoal-fired tandoor brings the authentic heat of North Indian streets to Chelsea.",
    },
    {
        number: "03",
        title: "Coastal Soul",
        body:
            "Discover the lighter side of the subcontinent — Koliwada Prawns, Chettinad Fish Curry and Konkani coastal classics inspired by India’s vibrant fishing villages.",
    },
];

export default function Focus() {
    return (
        <section className="py-[60px] md:py-[120px] bg-[#E9E1DC] px-4 md:px-0 overflow-hidden">
            <div className="max-w-[1271px] mx-auto flex gap-8 md:gap-[80px] items-start flex-col md:flex-row">

                {/* LEFT IMAGE — with parallax + reveal */}
                <Reveal direction="up" duration={1100} distance={48} className="w-full md:w-[476px] shrink-0">
                    <div className="relative w-full h-[400px] md:h-[700px] group overflow-hidden">
                        <Parallax speed={0.4} className="absolute inset-0">
                            <div className="relative w-full h-[120%] -mt-[10%]">
                                <Image
                                    src="/images/restaurant.png"
                                    alt="Interior of Indian Panorama Chelsea — elegant regional Indian fine-dining space on Draycott Avenue, SW3"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 476px"
                                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                                />
                            </div>
                        </Parallax>

                        {/* Corner ornaments */}
                        <span className="absolute top-3 left-3 w-[14px] h-[14px] border-l border-t border-[#CBAC70]/70 z-10" />
                        <span className="absolute top-3 right-3 w-[14px] h-[14px] border-r border-t border-[#CBAC70]/70 z-10" />
                        <span className="absolute bottom-3 left-3 w-[14px] h-[14px] border-l border-b border-[#CBAC70]/70 z-10" />
                        <span className="absolute bottom-3 right-3 w-[14px] h-[14px] border-r border-b border-[#CBAC70]/70 z-10" />
                    </div>
                </Reveal>

                {/* RIGHT CONTENT */}
                <div className="flex-1 py-2 md:py-6 w-full">
                    <Reveal direction="left" duration={900}>
                        <p className="text-[10px] md:text-[12px] tracking-[3px] text-[#BF9261] font-[var(--font-jost)] mb-3 md:mb-4 uppercase">
                            The Indian Panorama Way
                        </p>
                    </Reveal>

                    <h2 className="text-[34px] md:text-[60px] leading-[1.05] tracking-[0.01em] font-medium text-[#2D3630] font-[var(--font-roboto-serif)] mb-3 md:mb-5">
                        <SplitReveal text="Focused on" delay={200} stagger={70} />
                        <br />
                        <span className="italic text-[#BF9261] font-normal">
                            <SplitReveal text="Authenticity" delay={500} stagger={70} />
                        </span>
                    </h2>

                    <Reveal direction="up" delay={800} duration={900} distance={20}>
                        <p
                            className="text-[14px] md:text-[16px] leading-[1.7] text-[#363636]/80 max-w-[580px] mb-10 md:mb-14"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            Three principles guide every plate — heritage, fire, and the
                            coastline. Together they shape how we cook.
                        </p>
                    </Reveal>

                    {/* Numbered pillars — staggered reveal */}
                    <div className="space-y-6 md:space-y-8">
                        {PILLARS.map((p, i) => (
                            <Reveal
                                key={p.number}
                                direction="up"
                                delay={1000 + i * 180}
                                duration={900}
                                distance={28}
                            >
                                <div
                                    className="group relative pl-16 md:pl-20 py-3 md:py-4 transition-all duration-300"
                                    style={{
                                        borderLeft: "1px solid rgba(191,146,97,0.25)",
                                    }}
                                >
                                    {/* Big number */}
                                    <span
                                        className={`absolute left-3 md:left-4 top-3 md:top-4 text-[28px] md:text-[40px] leading-none transition-colors duration-300 ${
                                            i === 1 ? "text-[#BF9261]" : "text-[#2D3630]/30 group-hover:text-[#BF9261]"
                                        }`}
                                        style={{
                                            fontFamily: "var(--font-roboto-serif), serif",
                                            fontWeight: 400,
                                        }}
                                    >
                                        {p.number}
                                    </span>

                                    <h3
                                        className="text-[18px] md:text-[24px] text-[#2D3630] mb-2 md:mb-3"
                                        style={{
                                            fontFamily: "var(--font-roboto-serif), serif",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {p.title}
                                    </h3>
                                    <p
                                        className="text-[13px] md:text-[15px] leading-[1.65] text-[#363636]/80 max-w-[560px]"
                                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                    >
                                        {p.body}
                                    </p>

                                    {/* Hover accent line */}
                                    <span
                                        className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-[#BF9261] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                                        aria-hidden="true"
                                    />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
