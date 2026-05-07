import Link from "next/link";
import { menuSections, biryani, thalis, allergenNotice } from "./menuData";
import MenuSection from "./MenuSection";

export default function MenuPageContent() {
    return (
        <>
            {/* HERO */}
            <section
                className="relative w-full flex items-center justify-center text-center px-6 pt-[140px] md:pt-[180px] pb-[60px] md:pb-[100px]"
                style={{
                    background:
                        "linear-gradient(180deg, #161d18 0%, #1c2520 60%, #161d18 100%)",
                }}
            >
                <div className="max-w-[900px] mx-auto">
                    <p
                        className="uppercase mb-4"
                        style={{
                            fontFamily: "var(--font-jost), sans-serif",
                            fontSize: "13px",
                            letterSpacing: "3px",
                            color: "#CBAC70",
                        }}
                    >
                        A Culinary Journey Across India
                    </p>
                    <h1
                        className="text-[32px] md:text-[58px] lg:text-[68px] leading-[1.1] text-[#e2d6c1] max-w-[840px] mx-auto"
                        style={{ fontFamily: "var(--font-roboto-serif), serif", fontWeight: 400 }}
                    >
                        A Refined Indian <span className="italic text-[#CBAC70]">Culinary Experience</span>
                    </h1>
                    <div className="flex justify-center mt-6 mb-6">
                        <Ornament dark />
                    </div>
                    <p
                        className="text-[14px] md:text-[16px] leading-[1.7] text-[#e2d6c1]/80 max-w-[640px] mx-auto"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        From Mumbai’s Koliwada coast to the royal kitchens of Rajasthan
                        and the spice gardens of Kerala — every dish tells a regional
                        story, hand-ground in our kitchen and finished over a live
                        charcoal tandoor.
                    </p>
                </div>
            </section>

            {/* MENU BODY */}
            <section className="w-full bg-[#FDFBF7] py-[60px] md:py-[100px] px-4 md:px-8">
                <div className="max-w-[1240px] mx-auto">

                    {/* ========== SMALL PLATES — full width, items in 2 cols ========== */}
                    <SectionHeader
                        kicker="To Begin"
                        title="Small Plates"
                    />
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-6 mb-2">
                        {menuSections.smallPlates.map((item) => (
                            <DescriptiveItem key={item.name} item={item} />
                        ))}
                    </ul>

                    <Divider />

                    {/* ========== FEATURED BIRYANI BANNER ========== */}
                    <FeaturedDish item={biryani} kicker="House Signature" tagline="From the Land of Awadh" />

                    <Divider />

                    {/* ========== MAINS HEADING ========== */}
                    <div className="text-center mb-12 md:mb-16">
                        <p
                            className="uppercase mb-3"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                fontSize: "13px",
                                letterSpacing: "3px",
                                color: "#BF9261",
                            }}
                        >
                            The Heart of the Menu
                        </p>
                        <h2
                            className="text-[36px] md:text-[64px] leading-[1.1] text-[#2D3630]"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 400,
                            }}
                        >
                            Mains
                        </h2>
                        <div className="flex justify-center mt-5">
                            <Ornament />
                        </div>
                    </div>

                    {/* Top mains row: Seafood (5) | Poultry (6) — well balanced */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14 mb-14 md:mb-20">
                        <MenuSection title="Seafood" items={menuSections.seafood} subSection />
                        <MenuSection title="Poultry" items={menuSections.poultry} subSection />
                    </div>

                    {/* Bottom mains row: Lamb (8, tall) | Right stack (Vegetarian + Sides + Rice & Bread) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14">
                        <MenuSection title="Lamb" items={menuSections.lamb} subSection />

                        <div className="flex flex-col gap-12">
                            <MenuSection
                                title="Vegetarian"
                                items={menuSections.vegetarian}
                                subSection
                            />
                            <MenuSection
                                title="Sides"
                                items={menuSections.sides}
                                subSection
                                compact
                            />
                            <MenuSection
                                title="Rice & Bread"
                                items={menuSections.riceAndBread}
                                subSection
                                compact
                            />
                        </div>
                    </div>

                    <Divider />

                    {/* ========== THALI ========== */}
                    <div className="text-center mb-10 md:mb-14">
                        <p
                            className="uppercase mb-3"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                fontSize: "13px",
                                letterSpacing: "3px",
                                color: "#BF9261",
                            }}
                        >
                            The Complete Experience
                        </p>
                        <h2
                            className="text-[32px] md:text-[56px] leading-[1.1] text-[#2D3630]"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 400,
                            }}
                        >
                            Traditional Thali
                        </h2>
                        <div className="flex justify-center mt-5">
                            <Ornament />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1100px] mx-auto">
                        {thalis.map((t, i) => (
                            <ThaliCard key={t.name} thali={t} accent={i === 1} />
                        ))}
                    </div>

                    <Divider />

                    {/* ========== CTA ========== */}
                    <div className="text-center max-w-[700px] mx-auto">
                        <h3
                            className="text-[26px] md:text-[40px] leading-[1.2] text-[#2D3630] mb-4"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 400,
                            }}
                        >
                            Ready to taste India?
                        </h3>
                        <p
                            className="text-[14px] md:text-[16px] leading-[1.6] text-[#363636]/80 mb-8"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            Reserve a table on Draycott Avenue and join us for an evening
                            across the regions of India.
                        </p>
                        <Link
                            href="/reservation"
                            className="inline-block px-12 py-4 transition-all duration-300 hover:bg-[#161d18] hover:text-[#CBAC70]"
                            style={{
                                background: "#CBAC70",
                                color: "#161d18",
                                fontFamily: "var(--font-jost), sans-serif",
                                fontSize: "13px",
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                            }}
                        >
                            Book a Table
                        </Link>
                    </div>

                    {/* Allergen */}
                    <p
                        className="mt-16 md:mt-20 text-center text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#363636]/60 max-w-[820px] mx-auto leading-[1.8]"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        {allergenNotice}
                    </p>
                </div>
            </section>
        </>
    );
}

/* =========== COMPONENTS =========== */

function SectionHeader({ kicker, title }: { kicker?: string; title: string }) {
    return (
        <div className="text-center mb-10 md:mb-14">
            {kicker && (
                <p
                    className="uppercase mb-3"
                    style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        fontSize: "13px",
                        letterSpacing: "3px",
                        color: "#BF9261",
                    }}
                >
                    {kicker}
                </p>
            )}
            <h2
                className="text-[32px] md:text-[52px] leading-[1.1] text-[#2D3630]"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 400,
                }}
            >
                {title}
            </h2>
            <div className="flex justify-center mt-5">
                <Ornament />
            </div>
        </div>
    );
}

function DescriptiveItem({ item }: { item: { name: string; price: string; description?: string; note?: string; spicy?: boolean; signature?: boolean } }) {
    return (
        <li className="pb-5 border-b border-[#BF9261]/15 last:border-0">
            <div className="flex items-baseline gap-3 mb-1.5">
                <h3
                    className="text-[16px] md:text-[18px] text-[#2D3630] flex items-baseline flex-wrap gap-x-2"
                    style={{
                        fontFamily: "var(--font-roboto-serif), serif",
                        fontWeight: 500,
                    }}
                >
                    <span>{item.name}</span>
                    {item.spicy && (
                        <span className="text-[12px] text-[#c0392b]" title="Spicy">●</span>
                    )}
                    {item.signature && (
                        <span
                            className="text-[10px] uppercase tracking-[0.15em] text-[#BF9261]"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            Signature
                        </span>
                    )}
                </h3>
                <span
                    className="border-b border-dotted border-[#BF9261]/40 flex-1 mb-1.5"
                    aria-hidden="true"
                />
                <span
                    className="text-[16px] md:text-[18px] text-[#BF9261] whitespace-nowrap"
                    style={{
                        fontFamily: "var(--font-roboto-serif), serif",
                        fontWeight: 500,
                    }}
                >
                    £{item.price}
                </span>
            </div>
            {item.description && (
                <p
                    className="text-[13px] md:text-[14px] leading-[1.6] text-[#363636]/85"
                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                    {item.description}
                </p>
            )}
            {item.note && (
                <p
                    className="mt-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[#BF9261]"
                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                    {item.note}
                </p>
            )}
        </li>
    );
}

function FeaturedDish({
    item,
    kicker,
    tagline,
}: {
    item: { name: string; price: string; description?: string; note?: string };
    kicker?: string;
    tagline?: string;
}) {
    return (
        <div
            className="relative max-w-[1000px] mx-auto px-6 md:px-12 py-10 md:py-14 text-center"
            style={{
                background:
                    "linear-gradient(180deg, rgba(203,172,112,0.08) 0%, rgba(203,172,112,0.02) 100%)",
                border: "1px solid rgba(191,146,97,0.35)",
            }}
        >
            {/* Corner ornaments */}
            <span className="absolute top-0 left-0 w-[18px] h-[18px] border-l border-t border-[#BF9261]" />
            <span className="absolute top-0 right-0 w-[18px] h-[18px] border-r border-t border-[#BF9261]" />
            <span className="absolute bottom-0 left-0 w-[18px] h-[18px] border-l border-b border-[#BF9261]" />
            <span className="absolute bottom-0 right-0 w-[18px] h-[18px] border-r border-b border-[#BF9261]" />

            {kicker && (
                <p
                    className="uppercase mb-3"
                    style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        fontSize: "12px",
                        letterSpacing: "3px",
                        color: "#BF9261",
                    }}
                >
                    {kicker}
                </p>
            )}
            <h2
                className="text-[28px] md:text-[44px] leading-[1.15] text-[#2D3630] mb-2"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 500,
                }}
            >
                {item.name}
            </h2>
            <p
                className="text-[20px] md:text-[26px] text-[#BF9261] mb-5"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 500,
                }}
            >
                £{item.price}
            </p>
            {tagline && (
                <p
                    className="italic text-[13px] md:text-[14px] text-[#363636]/70 mb-4"
                    style={{ fontFamily: "var(--font-roboto-serif), serif" }}
                >
                    {tagline}
                </p>
            )}
            {item.description && (
                <p
                    className="text-[14px] md:text-[15px] leading-[1.7] text-[#363636]/85 max-w-[680px] mx-auto"
                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                    {item.description}
                </p>
            )}
            {item.note && (
                <p
                    className="mt-5 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-[#BF9261]"
                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                    {item.note}
                </p>
            )}
        </div>
    );
}

function ThaliCard({
    thali,
    accent,
}: {
    thali: { name: string; price: string; description: string; upgrade?: string };
    accent?: boolean;
}) {
    return (
        <div
            className="relative p-6 md:p-9 transition-transform duration-300 hover:-translate-y-1"
            style={{
                background: accent ? "#2D3630" : "#FFFFFF",
                color: accent ? "#e2d6c1" : "#2D3630",
                border: `1px solid ${accent ? "#CBAC70" : "rgba(191,146,97,0.3)"}`,
            }}
        >
            <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3
                    className="text-[22px] md:text-[28px]"
                    style={{
                        fontFamily: "var(--font-roboto-serif), serif",
                        fontWeight: 500,
                        color: accent ? "#e2d6c1" : "#2D3630",
                    }}
                >
                    {thali.name}
                </h3>
                <span
                    className="text-[20px] md:text-[24px]"
                    style={{
                        fontFamily: "var(--font-roboto-serif), serif",
                        fontWeight: 500,
                        color: "#CBAC70",
                    }}
                >
                    £{thali.price}
                </span>
            </div>
            <span
                className="block w-[40px] h-[1px] mb-4"
                style={{ background: accent ? "#CBAC70" : "#BF9261" }}
            />
            <p
                className="text-[13px] md:text-[14px] leading-[1.7]"
                style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    color: accent ? "rgba(226,214,193,0.85)" : "rgba(54,54,54,0.85)",
                }}
            >
                {thali.description}
            </p>
            {thali.upgrade && (
                <p
                    className="mt-4 text-[10px] md:text-[11px] uppercase tracking-[0.15em]"
                    style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        color: "#CBAC70",
                    }}
                >
                    {thali.upgrade}
                </p>
            )}
        </div>
    );
}

function Ornament({ dark = false }: { dark?: boolean }) {
    const color = dark ? "#CBAC70" : "#BF9261";
    return (
        <span className="flex items-center">
            <span className="block w-[40px] h-[1px]" style={{ background: color, opacity: 0.6 }} />
            <span className="mx-3 text-[10px]" style={{ color }}>
                ◆
            </span>
            <span className="block w-[40px] h-[1px]" style={{ background: color, opacity: 0.6 }} />
        </span>
    );
}

function Divider() {
    return (
        <div className="flex items-center justify-center my-16 md:my-24">
            <Ornament />
        </div>
    );
}
