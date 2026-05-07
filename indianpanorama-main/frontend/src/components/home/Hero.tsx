"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import ReservationForm from "@/components/Resrvetion/form";
import Reveal from "@/components/anim/Reveal";
import SplitReveal from "@/components/anim/SplitReveal";

const Hero = () => {
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const bgRef = useRef<HTMLDivElement | null>(null);

    // Parallax: background scrolls slower than content + slight zoom-in on first paint
    useEffect(() => {
        if (typeof window === "undefined") return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        const el = bgRef.current;
        if (!el) return;

        let raf: number | null = null;
        const update = () => {
            const y = window.scrollY;
            // Move bg down at ~0.35 of scroll, scale slightly for depth
            el.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + Math.min(y * 0.0002, 0.06)})`;
            raf = null;
        };
        const onScroll = () => {
            if (raf === null) raf = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf !== null) window.cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section
            className="relative w-full overflow-hidden mt-[94px] h-[600px] md:h-[760px] lg:h-[88vh] min-h-[600px] lg:min-h-[760px]"
        >
            {/* Parallax background image with overlays */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0"
                style={{ willChange: "transform" }}
            >
                <Image
                    src="/images/hero.png"
                    alt="Top-rated Indian dining room at Indian Panorama Chelsea, Draycott Avenue SW3"
                    fill
                    priority
                    className="object-cover object-center hero-img-zoom"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#161d18]/70 via-[#161d18]/40 to-[#161d18]/85" />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.35) 0%, rgba(22,29,24,0.55) 70%, rgba(22,29,24,0.85) 100%)",
                    }}
                />
            </div>

            {/* Gold corner ornaments */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 hidden md:block">
                <div className="w-12 h-12 border-l border-t border-[#CBAC70]/60" />
            </div>
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-10 hidden md:block">
                <div className="w-12 h-12 border-r border-t border-[#CBAC70]/60" />
            </div>
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 hidden md:block">
                <div className="w-12 h-12 border-l border-b border-[#CBAC70]/60" />
            </div>
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 hidden md:block">
                <div className="w-12 h-12 border-r border-b border-[#CBAC70]/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 md:px-20 text-center">
                <Reveal direction="fade" delay={120} duration={1100}>
                    <span
                        className="font-serif text-[#CBAC70] text-[11px] md:text-[12px] uppercase mb-6 md:mb-7 inline-flex items-center gap-3"
                        style={{ letterSpacing: "0.45em" }}
                    >
                        <span className="h-px w-8 md:w-12 bg-[#CBAC70] kicker-line" />
                        Draycott Avenue · SW3 Chelsea
                        <span className="h-px w-8 md:w-12 bg-[#CBAC70] kicker-line" />
                    </span>
                </Reveal>

                <h1
                    className="font-serif text-[#f5ecd8] text-[30px] md:text-[52px] lg:text-[64px] leading-[1.08] mb-5 md:mb-7 drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] max-w-[960px]"
                    style={{ letterSpacing: "0.01em", fontWeight: 400 }}
                >
                    <SplitReveal text="Refined Indian Fine Dining" delay={300} stagger={60} />
                    <br />
                    <span className="italic text-[#CBAC70]">
                        <SplitReveal text="& Lunch in Chelsea" delay={650} stagger={70} />
                    </span>
                </h1>

                <Reveal direction="up" delay={1100} duration={1000} distance={20}>
                    <p
                        className="font-serif text-[#e2d6c1] text-[14px] md:text-[17px] max-w-[600px] mb-9 md:mb-12 leading-relaxed"
                        style={{ letterSpacing: "0.04em", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
                    >
                        Stone-ground spices. A live charcoal tandoor. Slow-cooked recipes from
                        Mumbai to Kashmir — plated nightly on Draycott Avenue.
                    </p>
                </Reveal>

                <Reveal direction="up" delay={1400} duration={900} distance={16} className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5 mb-7 md:mb-10">
                    <button
                        onClick={() => setIsReservationOpen(true)}
                        className="group relative inline-flex items-center gap-3 font-serif uppercase text-[12px] md:text-[13px] px-8 md:px-10 py-4 md:py-[18px] border border-[#CBAC70] text-[#161d18] bg-[#CBAC70] hover:bg-transparent hover:text-[#CBAC70] transition-all duration-500 cursor-pointer shadow-[0_10px_30px_-10px_rgba(203,172,112,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(203,172,112,0.8)] overflow-hidden"
                        style={{ letterSpacing: "0.25em" }}
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                        <span className="relative">Reserve a Table</span>
                        <ArrowRight
                            size={16}
                            className="relative transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </button>

                    <a
                        href="https://deliveroo.co.uk/menu/london/chelsea/indian-panorama-149-draycott-avenue"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 font-serif uppercase text-[12px] md:text-[13px] px-8 md:px-10 py-4 md:py-[18px] border border-[#CBAC70] text-[#CBAC70] bg-transparent hover:bg-[#CBAC70] hover:text-[#161d18] transition-all duration-500 cursor-pointer overflow-hidden"
                        style={{ letterSpacing: "0.25em" }}
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#CBAC70]/25 to-transparent group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                        <span className="relative">Order Online</span>
                        <ArrowRight
                            size={16}
                            className="relative transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </a>
                </Reveal>

                {/* Stats / accolades strip */}
                <Reveal direction="up" delay={1700} duration={1000} distance={20} className="hidden md:grid grid-cols-3 gap-x-12 lg:gap-x-16 max-w-[640px] w-full">
                    <Stat top="20+" label="Years of Heritage" />
                    <Stat top="14" label="Regions of India" divider />
                    <Stat top="100%" label="Hand-Ground Spices" />
                </Reveal>

                {/* Mobile: simple call CTA */}
                <a
                    href="tel:+442030514535"
                    className="md:hidden font-serif text-[12px] text-[#e2d6c1]/80 hover:text-[#CBAC70] transition-colors"
                    style={{ letterSpacing: "0.2em" }}
                >
                    OR CALL +44 20 3051 4535
                </a>
            </div>

            {/* Scroll cue */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center text-[#CBAC70]/70 animate-bounce-slow">
                <span
                    className="text-[10px] uppercase mb-1.5"
                    style={{ fontFamily: "var(--font-jost), sans-serif", letterSpacing: "0.3em" }}
                >
                    Discover
                </span>
                <ChevronDown size={18} />
            </div>

            {isReservationOpen && (
                <ReservationForm onClose={() => setIsReservationOpen(false)} />
            )}

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translate(-50%, 0); }
                    50% { transform: translate(-50%, 8px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2.4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

function Stat({ top, label, divider }: { top: string; label: string; divider?: boolean }) {
    return (
        <div className={`relative text-center ${divider ? "border-x border-[#CBAC70]/25" : ""}`}>
            <div
                className="text-[#CBAC70] text-[28px] lg:text-[34px] leading-none"
                style={{ fontFamily: "var(--font-roboto-serif), serif", fontWeight: 400 }}
            >
                {top}
            </div>
            <div
                className="mt-2 text-[10px] uppercase text-[#e2d6c1]/75"
                style={{ fontFamily: "var(--font-jost), sans-serif", letterSpacing: "0.22em" }}
            >
                {label}
            </div>
        </div>
    );
}

export default Hero;
