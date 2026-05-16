"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import ReservationForm from "@/components/Resrvetion/form";
import Reveal from "@/components/anim/Reveal";

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
            {/* Parallax background — video with image fallback + overlays */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0"
                style={{ willChange: "transform" }}
            >
                {/* Poster image — shown until video can play, and as fallback for reduced-motion */}
                <Image
                    src="/images/hero.png"
                    alt="Top-rated Indian dining room at Indian Panorama Chelsea, Draycott Avenue SW3"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />

                {/* Background video — autoplay, muted, looped (no overlay, full transparency) */}
                <video
                    className="absolute inset-0 w-full h-full object-cover object-center hero-video-fade"
                    src="/videos/hero-v3.mp4"
                    poster="/images/hero.png"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                />
            </div>

            {/* SEO-only H1 (visually hidden, still picked up by search engines) */}
            <h1 className="sr-only">
                Refined Indian Fine Dining & Lunch in Chelsea
            </h1>

            {/* Buttons — anchored to bottom of the hero */}
            <div className="relative z-10 w-full h-full flex items-end justify-center px-6 pb-10 md:pb-16">
                <Reveal direction="up" delay={400} duration={900} distance={16} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
                    {/* Primary CTA — gold filled */}
                    <button
                        onClick={() => setIsReservationOpen(true)}
                        className="group relative inline-flex items-center justify-center gap-3 font-serif uppercase text-[12px] md:text-[13px] w-[220px] md:w-[260px] h-[52px] md:h-[58px] border border-[#CBAC70] text-[#161d18] bg-[#CBAC70] hover:bg-[#e2c58a] hover:border-[#e2c58a] transition-all duration-300 cursor-pointer shadow-[0_10px_30px_-10px_rgba(203,172,112,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(203,172,112,0.85)] overflow-hidden"
                        style={{ letterSpacing: "0.25em", fontWeight: 500 }}
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                        <span className="relative">Reserve a Table</span>
                        <ArrowRight
                            size={16}
                            className="relative transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </button>

                    {/* Secondary CTA — glass dark with gold text & border, readable against any video frame */}
                    <a
                        href="https://deliveroo.co.uk/menu/london/chelsea/indian-panorama-149-draycott-avenue"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center gap-3 font-serif uppercase text-[12px] md:text-[13px] w-[220px] md:w-[260px] h-[52px] md:h-[58px] border border-[#CBAC70] text-[#CBAC70] hover:bg-[#CBAC70] hover:text-[#161d18] transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]"
                        style={{
                            letterSpacing: "0.25em",
                            fontWeight: 500,
                            background: "rgba(22, 29, 24, 0.55)",
                            backdropFilter: "blur(4px)",
                            WebkitBackdropFilter: "blur(4px)",
                        }}
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#CBAC70]/25 to-transparent group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                        <span className="relative">Order Online</span>
                        <ArrowRight
                            size={16}
                            className="relative transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </a>
                </Reveal>
            </div>

            {isReservationOpen && (
                <ReservationForm onClose={() => setIsReservationOpen(false)} />
            )}

            <style jsx>{`
                /* Smooth video fade-in so it doesn't pop over the poster */
                .hero-video-fade {
                    opacity: 0;
                    animation: hero-video-in 900ms ease-out 250ms forwards;
                }
                @keyframes hero-video-in {
                    to { opacity: 1; }
                }

                /* Respect reduced motion — hide video, keep poster image visible */
                @media (prefers-reduced-motion: reduce) {
                    .hero-video-fade {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
