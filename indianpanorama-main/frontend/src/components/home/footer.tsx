import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const HOURS = [
    { day: "Monday", time: "5:00 – 10:30 pm" },
    { day: "Tuesday", time: "1:00 – 10:30 pm" },
    { day: "Wednesday", time: "1:00 – 10:30 pm" },
    { day: "Thursday", time: "1:00 – 10:30 pm" },
    { day: "Friday", time: "1:00 – 10:30 pm" },
    { day: "Saturday", time: "1:00 – 10:30 pm" },
    { day: "Sunday", time: "1:00 – 10:30 pm" },
];

const MENU_LINKS = [
    { label: "Main Menu", href: "/menu" },
    { label: "Lunch", href: "/menu/lunch" },
    { label: "Drinks", href: "/menu/drinks" },
    { label: "Private Dining", href: "/menu/private-dining" },
];

const VISIT_LINKS = [
    { label: "Reservations", href: "/reservation" },
    { label: "Group Bookings", href: "/group" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faq" },
];

const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=Indian+Panorama+Chelsea+149+Draycott+Avenue+London+SW3+3AL";

export default function Footer() {
    return (
        <footer
            className="w-full relative overflow-hidden"
            style={{ background: "#161d18", color: "#e2d6c1" }}
        >
            {/* Top accent line */}
            <div
                className="h-[1px] w-full"
                style={{
                    background:
                        "linear-gradient(to right, transparent, #CBAC70, transparent)",
                }}
            />

            {/* CTA banner */}
            <div className="border-b border-[#CBAC70]/15">
                <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
                    <div>
                        <p
                            className="uppercase mb-2"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                fontSize: "11px",
                                letterSpacing: "3px",
                                color: "#CBAC70",
                            }}
                        >
                            An Evening Awaits
                        </p>
                        <h3
                            className="text-[22px] md:text-[34px] leading-[1.2]"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 400,
                                color: "#e2d6c1",
                            }}
                        >
                            Reserve your table on{" "}
                            <span className="italic text-[#CBAC70] block md:inline">Draycott Avenue</span>
                        </h3>
                    </div>
                    <Link
                        href="/reservation"
                        className="group inline-flex items-center justify-center gap-3 self-center md:self-auto px-8 md:px-10 py-4 transition-all duration-300 hover:bg-transparent hover:text-[#CBAC70] border border-[#CBAC70] w-full sm:w-auto"
                        style={{
                            background: "#CBAC70",
                            color: "#161d18",
                            fontFamily: "var(--font-jost), sans-serif",
                            fontSize: "12px",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                        }}
                    >
                        Reserve a Table
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-12 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-10 md:gap-8">

                    {/* Brand column */}
                    <div className="lg:col-span-4 sm:col-span-2 lg:pr-8">
                        <Link href="/" className="inline-block mb-5">
                            <Image
                                src="/images/logo2.png"
                                alt="Indian Panorama Chelsea"
                                width={150}
                                height={62}
                                className="object-contain h-[56px] md:h-[60px] w-auto brightness-110"
                            />
                        </Link>
                        <p
                            className="text-[14px] leading-[1.7] text-[#e2d6c1]/75 max-w-[420px] mb-7"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            Authentic regional Indian fine dining in the heart of Chelsea —
                            stone-ground spices, charcoal-kissed tandoor and slow-cooked
                            recipes from across India.
                        </p>

                        {/* Social */}
                        <div>
                            <p
                                className="uppercase mb-3"
                                style={{
                                    fontFamily: "var(--font-jost), sans-serif",
                                    fontSize: "10px",
                                    letterSpacing: "3px",
                                    color: "#CBAC70",
                                }}
                            >
                                Follow Along
                            </p>
                            <div className="flex gap-3">
                                <SocialLink
                                    href="https://www.instagram.com/indianpanoramachelsea"
                                    label="Indian Panorama Chelsea on Instagram"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </SocialLink>
                                <SocialLink
                                    href="https://www.facebook.com/indianpanoramachelsea"
                                    label="Indian Panorama Chelsea on Facebook"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </SocialLink>
                            </div>
                        </div>

                        {/* Language */}
                        <div className="mt-7">
                            <p
                                className="uppercase mb-3"
                                style={{
                                    fontFamily: "var(--font-jost), sans-serif",
                                    fontSize: "10px",
                                    letterSpacing: "3px",
                                    color: "#CBAC70",
                                }}
                            >
                                Choose Your Language
                            </p>
                            <LanguageSwitcher variant="footer" />
                        </div>
                    </div>

                    {/* Visit / Contact */}
                    <div className="lg:col-span-3">
                        <FooterHeading>Visit Us</FooterHeading>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a
                                    href={MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-3 text-[14px] text-[#e2d6c1]/85 hover:text-[#CBAC70] transition-colors"
                                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                >
                                    <MapPin size={15} className="text-[#CBAC70] mt-0.5 shrink-0" />
                                    <span className="leading-[1.6]">
                                        149 Draycott Avenue
                                        <br />
                                        London, SW3 3AL
                                        <span className="block mt-1.5 text-[11px] uppercase tracking-[0.18em] text-[#CBAC70]/80 group-hover:text-[#CBAC70]">
                                            Open in Maps →
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+442030514535"
                                    className="flex items-center gap-3 text-[14px] text-[#e2d6c1]/85 hover:text-[#CBAC70] transition-colors"
                                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                >
                                    <Phone size={14} className="text-[#CBAC70] shrink-0" />
                                    <span>+44 20 3051 4535</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@indianpanoramachelsea.co.uk"
                                    className="flex items-start gap-3 text-[13px] md:text-[14px] text-[#e2d6c1]/85 hover:text-[#CBAC70] transition-colors break-words min-w-0"
                                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                >
                                    <Mail size={14} className="text-[#CBAC70] shrink-0 mt-1" />
                                    <span className="break-all">info@indianpanoramachelsea.co.uk</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Menus */}
                    <div className="lg:col-span-2">
                        <FooterHeading>Menus</FooterHeading>
                        <ul className="flex flex-col gap-2.5">
                            {MENU_LINKS.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="text-[14px] text-[#e2d6c1]/85 hover:text-[#CBAC70] transition-colors inline-flex items-center gap-2 group"
                                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                    >
                                        <span
                                            className="w-0 group-hover:w-3 h-[1px] bg-[#CBAC70] transition-all duration-300"
                                            aria-hidden="true"
                                        />
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8">
                            <FooterHeading>Discover</FooterHeading>
                            <ul className="flex flex-col gap-2.5">
                                {VISIT_LINKS.map((l) => (
                                    <li key={l.href}>
                                        <Link
                                            href={l.href}
                                            className="text-[14px] text-[#e2d6c1]/85 hover:text-[#CBAC70] transition-colors inline-flex items-center gap-2 group"
                                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                        >
                                            <span
                                                className="w-0 group-hover:w-3 h-[1px] bg-[#CBAC70] transition-all duration-300"
                                                aria-hidden="true"
                                            />
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="lg:col-span-3 sm:col-span-2 lg:col-start-auto">
                        <FooterHeading>Opening Hours</FooterHeading>
                        <ul className="flex flex-col gap-1.5">
                            {HOURS.map((h) => (
                                <li
                                    key={h.day}
                                    className="flex items-baseline justify-between gap-3 py-1.5 border-b border-[#CBAC70]/10"
                                >
                                    <span
                                        className="text-[13px] text-[#e2d6c1]/80 whitespace-nowrap"
                                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                    >
                                        {h.day}
                                    </span>
                                    <span className="border-b border-dotted border-[#CBAC70]/25 flex-1 mx-2 mb-1 min-w-[20px]" aria-hidden="true" />
                                    <span
                                        className="text-[13px] text-[#CBAC70] whitespace-nowrap"
                                        style={{ fontFamily: "var(--font-roboto-serif), serif", fontWeight: 500 }}
                                    >
                                        {h.time}
                                    </span>
                                </li>
                            ))}
                            <li className="flex items-baseline justify-between gap-3 pt-3 mt-1 border-t border-[#CBAC70]/30">
                                <span
                                    className="text-[11px] md:text-[12px] uppercase tracking-[0.15em] text-[#CBAC70]/85 whitespace-nowrap"
                                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                >
                                    Christmas Day
                                </span>
                                <span
                                    className="text-[13px] text-[#CBAC70] whitespace-nowrap"
                                    style={{ fontFamily: "var(--font-roboto-serif), serif", fontWeight: 500 }}
                                >
                                    12:00 – 6:00 pm
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#CBAC70]/15">
                <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-5 md:py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <p
                        className="text-[11px] text-[#e2d6c1]/55"
                        style={{
                            fontFamily: "var(--font-jost), sans-serif",
                            letterSpacing: "0.05em",
                        }}
                    >
                        © {new Date().getFullYear()} Indian Panorama Chelsea. All rights reserved.
                    </p>
                    <p
                        className="flex items-center gap-2 text-[10px] md:text-[10px]"
                        style={{
                            fontFamily: "var(--font-jost), sans-serif",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(203,172,112,0.75)",
                        }}
                    >
                        <span>◆</span>
                        Crafted with care in SW3
                        <span>◆</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
    return (
        <h4
            className="uppercase mb-5 inline-flex items-center gap-2"
            style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "11px",
                letterSpacing: "3px",
                color: "#CBAC70",
            }}
        >
            <span className="block w-[14px] h-[1px] bg-[#CBAC70]" />
            {children}
        </h4>
    );
}

function SocialLink({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex items-center justify-center w-10 h-10 border border-[#CBAC70]/30 text-[#CBAC70] hover:bg-[#CBAC70] hover:text-[#161d18] transition-colors duration-300"
        >
            {children}
        </Link>
    );
}
