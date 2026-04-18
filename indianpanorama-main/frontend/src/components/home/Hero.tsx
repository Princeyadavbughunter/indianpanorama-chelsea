"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ReservationForm from "@/components/Resrvetion/form";

const Hero = () => {
    const [isReservationOpen, setIsReservationOpen] = useState(false);

    return (
        <section
            className="relative w-full overflow-hidden mt-[94px] h-[500px] md:h-[700px] lg:h-[872px]"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero.png"
                    alt="Top-rated Indian dining room at Indian Panorama Chelsea, Draycott Avenue SW3"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(22,29,24,0.55) 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 md:px-20 text-center">
                <span
                    className="font-serif text-[#CBAC70] text-[12px] md:text-[13px] uppercase mb-5 md:mb-6 inline-flex items-center gap-3"
                    style={{ letterSpacing: "0.4em" }}
                >
                    <span className="h-px w-8 md:w-12 bg-[#CBAC70]" />
                    Chelsea · London
                    <span className="h-px w-8 md:w-12 bg-[#CBAC70]" />
                </span>

                <h1
                    className="font-serif text-[#f5ecd8] text-[28px] md:text-[42px] lg:text-[52px] leading-tight mb-5 md:mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                    style={{ letterSpacing: "0.04em" }}
                >
                    Top-Rated Indian Dining & Takeaway<br className="hidden md:block" />
                    <span className="italic text-[#CBAC70]"> in Chelsea, London</span>
                </h1>

                <p
                    className="font-serif text-[#e2d6c1] text-[15px] md:text-[17px] max-w-xl mb-9 md:mb-11 leading-relaxed"
                    style={{ letterSpacing: "0.05em", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
                >
                    A taste of India, reimagined on Draycott Avenue, SW3. Reserve your table
                    at Indian Panorama and experience the finest flavours of the subcontinent.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
                    <button
                        onClick={() => setIsReservationOpen(true)}
                        className="group relative inline-flex items-center gap-3 font-serif uppercase text-[13px] md:text-[14px] px-8 md:px-10 py-4 md:py-[18px] border border-[#CBAC70] text-[#161d18] bg-[#CBAC70] hover:bg-transparent hover:text-[#CBAC70] transition-all duration-500 cursor-pointer shadow-[0_10px_30px_-10px_rgba(203,172,112,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(203,172,112,0.8)] overflow-hidden"
                        style={{ letterSpacing: "0.25em" }}
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                        <span className="relative">Reserve a Table</span>
                        <ArrowRight
                            size={18}
                            className="relative transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </button>

                    <a
                        href="https://deliveroo.co.uk/menu/london/chelsea/indian-panorama-149-draycott-avenue"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 font-serif uppercase text-[13px] md:text-[14px] px-8 md:px-10 py-4 md:py-[18px] border border-[#CBAC70] text-[#CBAC70] bg-transparent hover:bg-[#CBAC70] hover:text-[#161d18] transition-all duration-500 cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_40px_-10px_rgba(203,172,112,0.6)] overflow-hidden"
                        style={{ letterSpacing: "0.25em" }}
                    >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#CBAC70]/20 to-transparent group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                        <span className="relative">Order Online</span>
                        <ArrowRight
                            size={18}
                            className="relative transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </a>
                </div>

                <a
                    href="tel:+442030514535"
                    className="mt-6 md:mt-8 font-serif text-[13px] md:text-[14px] text-[#e2d6c1]/80 hover:text-[#CBAC70] transition-colors"
                    style={{ letterSpacing: "0.2em" }}
                >
                    OR CALL +44 20 3051 4535
                </a>
            </div>

            {isReservationOpen && (
                <ReservationForm onClose={() => setIsReservationOpen(false)} />
            )}
        </section>
    );
};

export default Hero;
