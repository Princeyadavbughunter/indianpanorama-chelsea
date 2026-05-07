import Link from "next/link";
import {
    lunchPricing,
    lunchStarters,
    lunchMains,
    lunchDessert,
    lunchDrinks,
    lunchInclusions,
    lunchNotes,
    lunchAllergen,
    type LunchItem,
} from "./lunchMenuData";

export default function LunchMenuContent() {
    return (
        <>
            {/* HERO */}
            <section
                className="relative w-full flex items-center justify-center text-center px-6 pt-[140px] md:pt-[180px] pb-[60px] md:pb-[90px]"
                style={{
                    background:
                        "linear-gradient(180deg, #161d18 0%, #1c2520 60%, #161d18 100%)",
                }}
            >
                <div className="max-w-[960px] mx-auto">
                    <p
                        className="uppercase mb-4"
                        style={{
                            fontFamily: "var(--font-jost), sans-serif",
                            fontSize: "13px",
                            letterSpacing: "3px",
                            color: "#CBAC70",
                        }}
                    >
                        The Art of Luxury Dining
                    </p>
                    <h1
                        className="text-[30px] md:text-[52px] lg:text-[62px] leading-[1.1] text-[#e2d6c1] max-w-[860px] mx-auto"
                        style={{ fontFamily: "var(--font-roboto-serif), serif", fontWeight: 400 }}
                    >
                        An Elegant Lunch Experience
                        <br />
                        <span className="italic text-[#CBAC70]">on King&rsquo;s Road</span>
                    </h1>
                    <div className="flex justify-center mt-6 mb-8">
                        <Ornament dark />
                    </div>

                    {/* Price Tiers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-[680px] mx-auto">
                        <PriceCard
                            label="Two Course"
                            price={lunchPricing.twoCourse}
                            note="Starter + Main"
                        />
                        <PriceCard
                            label="Three Course"
                            price={lunchPricing.threeCourse}
                            note="Starter + Main + Dessert"
                            featured
                        />
                    </div>

                    <p
                        className="mt-8 text-[13px] md:text-[14px] leading-[1.7] text-[#e2d6c1]/70 max-w-[560px] mx-auto italic"
                        style={{ fontFamily: "var(--font-roboto-serif), serif" }}
                    >
                        Per person · Available daily during lunch service
                    </p>
                </div>
            </section>

            {/* MENU BODY */}
            <section className="w-full bg-[#FDFBF7] py-[60px] md:py-[100px] px-4 md:px-8">
                <div className="max-w-[1100px] mx-auto">

                    {/* STEP 1 — STARTERS */}
                    <CourseHeader step="01" kicker="Please Select a" title="Starter" />
                    <ItemsGrid items={lunchStarters} />

                    <Divider />

                    {/* STEP 2 — MAINS */}
                    <CourseHeader step="02" kicker="Please Select a" title="Main Course" />
                    <ItemsGrid items={lunchMains} />

                    {/* Inclusions banner */}
                    <div className="mt-10 md:mt-12 mx-auto max-w-[760px] text-center">
                        <p
                            className="text-[12px] md:text-[13px] uppercase tracking-[0.18em] py-3 px-6 inline-block"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                color: "#BF9261",
                                background: "rgba(203,172,112,0.08)",
                                border: "1px solid rgba(191,146,97,0.3)",
                            }}
                        >
                            ✦ {lunchInclusions} ✦
                        </p>
                    </div>

                    <Divider />

                    {/* STEP 3 — DESSERT */}
                    <CourseHeader step="03" kicker="Make it Three Courses" title="Dessert" />
                    <div
                        className="relative max-w-[760px] mx-auto px-6 md:px-12 py-10 md:py-12 text-center"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(203,172,112,0.08) 0%, rgba(203,172,112,0.02) 100%)",
                            border: "1px solid rgba(191,146,97,0.35)",
                        }}
                    >
                        <span className="absolute top-0 left-0 w-[18px] h-[18px] border-l border-t border-[#BF9261]" />
                        <span className="absolute top-0 right-0 w-[18px] h-[18px] border-r border-t border-[#BF9261]" />
                        <span className="absolute bottom-0 left-0 w-[18px] h-[18px] border-l border-b border-[#BF9261]" />
                        <span className="absolute bottom-0 right-0 w-[18px] h-[18px] border-r border-b border-[#BF9261]" />

                        <p
                            className="uppercase mb-3"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                fontSize: "12px",
                                letterSpacing: "3px",
                                color: "#BF9261",
                            }}
                        >
                            Add £{lunchDessert.supplement} to upgrade
                        </p>
                        <h3
                            className="text-[24px] md:text-[34px] leading-[1.2] text-[#2D3630] mb-3"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 500,
                            }}
                        >
                            {lunchDessert.name}
                        </h3>
                        <p
                            className="text-[14px] md:text-[15px] leading-[1.7] text-[#363636]/85 max-w-[560px] mx-auto"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            {lunchDessert.description}
                        </p>
                    </div>

                    <Divider />

                    {/* DRINKS */}
                    <div className="text-center mb-8 md:mb-10">
                        <p
                            className="uppercase mb-3"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                fontSize: "13px",
                                letterSpacing: "3px",
                                color: "#BF9261",
                            }}
                        >
                            To Accompany
                        </p>
                        <h2
                            className="text-[28px] md:text-[44px] leading-[1.1] text-[#2D3630]"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 400,
                            }}
                        >
                            Cocktails &amp; Mocktails
                        </h2>
                        <div className="flex justify-center mt-5">
                            <Ornament />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-[680px] mx-auto">
                        {lunchDrinks.map((d) => (
                            <div
                                key={d.name}
                                className="flex items-center justify-between px-6 py-5 bg-white/60 border border-[#BF9261]/25"
                            >
                                <span
                                    className="text-[16px] md:text-[18px] text-[#2D3630]"
                                    style={{
                                        fontFamily: "var(--font-roboto-serif), serif",
                                        fontWeight: 500,
                                    }}
                                >
                                    {d.name}
                                </span>
                                <span
                                    className="text-[18px] md:text-[20px] text-[#BF9261]"
                                    style={{
                                        fontFamily: "var(--font-roboto-serif), serif",
                                        fontWeight: 500,
                                    }}
                                >
                                    £{d.price}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Divider />

                    {/* CTA */}
                    <div className="text-center max-w-[700px] mx-auto">
                        <h3
                            className="text-[26px] md:text-[40px] leading-[1.2] text-[#2D3630] mb-4"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 400,
                            }}
                        >
                            Reserve your lunch table
                        </h3>
                        <p
                            className="text-[14px] md:text-[16px] leading-[1.6] text-[#363636]/80 mb-8"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            Lunch service is available daily on Draycott Avenue. Book ahead
                            to secure your table.
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

                    {/* Notes & Allergen */}
                    <div className="mt-16 md:mt-20 max-w-[820px] mx-auto">
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                            {lunchNotes.map((note, i) => (
                                <li
                                    key={i}
                                    className="text-center px-4 py-5 border border-[#BF9261]/20 bg-white/40"
                                >
                                    <p
                                        className="text-[11px] md:text-[12px] leading-[1.6] text-[#363636]/80"
                                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                    >
                                        {note}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <p
                            className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#363636]/60 leading-[1.8]"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            {lunchAllergen}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

/* =========== COMPONENTS =========== */

function PriceCard({
    label,
    price,
    note,
    featured,
}: {
    label: string;
    price: string;
    note: string;
    featured?: boolean;
}) {
    return (
        <div
            className="relative p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1"
            style={{
                background: featured ? "rgba(203,172,112,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${featured ? "#CBAC70" : "rgba(203,172,112,0.35)"}`,
            }}
        >
            {featured && (
                <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[9px] uppercase tracking-[0.2em]"
                    style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        background: "#CBAC70",
                        color: "#161d18",
                    }}
                >
                    Most Popular
                </span>
            )}
            <p
                className="uppercase mb-2"
                style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "11px",
                    letterSpacing: "2.5px",
                    color: "#CBAC70",
                }}
            >
                {label}
            </p>
            <p
                className="leading-none mb-3"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontSize: "44px",
                    fontWeight: 500,
                    color: "#e2d6c1",
                }}
            >
                <span className="text-[24px] align-top mr-1" style={{ color: "#CBAC70" }}>£</span>
                {price}
            </p>
            <p
                className="text-[12px] tracking-[0.1em] uppercase"
                style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    color: "rgba(226,214,193,0.7)",
                }}
            >
                {note}
            </p>
        </div>
    );
}

function CourseHeader({
    step,
    kicker,
    title,
}: {
    step: string;
    kicker: string;
    title: string;
}) {
    return (
        <div className="text-center mb-10 md:mb-14 relative">
            <span
                className="absolute left-1/2 -translate-x-1/2 -top-2 md:-top-4 text-[60px] md:text-[100px] leading-none select-none"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 400,
                    color: "rgba(191,146,97,0.10)",
                }}
                aria-hidden="true"
            >
                {step}
            </span>
            <p
                className="uppercase mb-2 relative"
                style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "12px",
                    letterSpacing: "3px",
                    color: "#BF9261",
                }}
            >
                {kicker}
            </p>
            <h2
                className="text-[32px] md:text-[52px] leading-[1.1] text-[#2D3630] relative"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 400,
                }}
            >
                {title}
            </h2>
            <div className="flex justify-center mt-5 relative">
                <Ornament />
            </div>
        </div>
    );
}

function ItemsGrid({ items }: { items: LunchItem[] }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-6 max-w-[1000px] mx-auto">
            {items.map((item) => (
                <li
                    key={item.name}
                    className="pb-5 border-b border-[#BF9261]/15"
                >
                    <h3
                        className="text-[16px] md:text-[18px] text-[#2D3630] mb-1.5 flex items-baseline flex-wrap gap-x-2"
                        style={{
                            fontFamily: "var(--font-roboto-serif), serif",
                            fontWeight: 500,
                        }}
                    >
                        <span>{item.name}</span>
                        {item.vegetarian && (
                            <span
                                title="Vegetarian"
                                className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full"
                                style={{ background: "rgba(94,128,87,0.15)" }}
                            >
                                <span
                                    className="text-[10px] leading-none"
                                    style={{ color: "#5e8057" }}
                                >
                                    ●
                                </span>
                            </span>
                        )}
                    </h3>
                    {item.description && (
                        <p
                            className="text-[13px] md:text-[14px] leading-[1.6] text-[#363636]/85"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            {item.description}
                        </p>
                    )}
                </li>
            ))}
        </ul>
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
