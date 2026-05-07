import Link from "next/link";
import {
    setMenus,
    privateDiningServiceNote,
    privateDiningIntro,
    type SetMenu,
    type DishWithDescription,
} from "./privateDiningData";

export default function PrivateDiningContent() {
    const nonVeg = setMenus.filter((m) => m.category === "Non-Vegetarian");
    const veg = setMenus.filter((m) => m.category === "Vegetarian");

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
                        For Celebrations &amp; Gatherings
                    </p>
                    <h1
                        className="text-[30px] md:text-[52px] lg:text-[62px] leading-[1.1] text-[#e2d6c1] max-w-[900px] mx-auto"
                        style={{ fontFamily: "var(--font-roboto-serif), serif", fontWeight: 400 }}
                    >
                        Exclusive Private Dining
                        <br />
                        <span className="italic text-[#CBAC70]">in the Heart of Chelsea</span>
                    </h1>
                    <div className="flex justify-center mt-6 mb-6">
                        <Ornament dark />
                    </div>
                    <p
                        className="text-[14px] md:text-[16px] leading-[1.7] text-[#e2d6c1]/80 max-w-[680px] mx-auto"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        {privateDiningIntro}
                    </p>
                </div>
            </section>

            {/* STICKY NAV */}
            <nav
                className="sticky top-0 z-30 border-y backdrop-blur-md"
                style={{
                    background: "rgba(22, 29, 24, 0.92)",
                    borderColor: "rgba(203,172,112,0.25)",
                }}
            >
                <ul className="max-w-[1100px] mx-auto flex items-center justify-center gap-1 md:gap-2 overflow-x-auto px-4 py-3">
                    {setMenus.map((m) => (
                        <li key={m.id} className="shrink-0">
                            <a
                                href={`#${m.id}`}
                                className="inline-flex items-center gap-2 px-3 md:px-5 py-2 uppercase transition-colors hover:text-[#CBAC70]"
                                style={{
                                    fontFamily: "var(--font-jost), sans-serif",
                                    fontSize: "11px",
                                    letterSpacing: "2px",
                                    color: "#e2d6c1",
                                }}
                            >
                                <span>{m.category === "Vegetarian" ? "Veg" : "Non-Veg"}</span>
                                <span
                                    className="text-[#CBAC70]"
                                    style={{ fontFamily: "var(--font-roboto-serif), serif" }}
                                >
                                    {m.number}
                                </span>
                                <span className="text-[#CBAC70]/70">£{m.price}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* BODY */}
            <section className="w-full bg-[#FDFBF7] py-[60px] md:py-[100px] px-4 md:px-8">
                <div className="max-w-[1240px] mx-auto">

                    {/* Service note ribbon */}
                    <div className="max-w-[860px] mx-auto mb-16 md:mb-20">
                        <div
                            className="relative px-6 md:px-10 py-6 md:py-8 text-center"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(203,172,112,0.08) 0%, rgba(203,172,112,0.02) 100%)",
                                border: "1px solid rgba(191,146,97,0.3)",
                            }}
                        >
                            <span className="absolute top-0 left-0 w-[14px] h-[14px] border-l border-t border-[#BF9261]" />
                            <span className="absolute top-0 right-0 w-[14px] h-[14px] border-r border-t border-[#BF9261]" />
                            <span className="absolute bottom-0 left-0 w-[14px] h-[14px] border-l border-b border-[#BF9261]" />
                            <span className="absolute bottom-0 right-0 w-[14px] h-[14px] border-r border-b border-[#BF9261]" />

                            <p
                                className="uppercase mb-2"
                                style={{
                                    fontFamily: "var(--font-jost), sans-serif",
                                    fontSize: "11px",
                                    letterSpacing: "3px",
                                    color: "#BF9261",
                                }}
                            >
                                Service Style
                            </p>
                            <p
                                className="text-[13px] md:text-[15px] leading-[1.7] text-[#363636]/85 italic max-w-[640px] mx-auto"
                                style={{ fontFamily: "var(--font-roboto-serif), serif" }}
                            >
                                {privateDiningServiceNote}
                            </p>
                        </div>
                    </div>

                    {/* NON-VEGETARIAN */}
                    <CategoryHeader
                        kicker="The Full Experience"
                        title="Non-Vegetarian Set Menus"
                        subtitle={`${nonVeg.length} curated menus · from £${nonVeg[nonVeg.length - 1].price} per person`}
                    />
                    <div className="flex flex-col gap-12 md:gap-16">
                        {nonVeg.map((m, i) => (
                            <SetMenuCard key={m.id} menu={m} featured={i === 0} />
                        ))}
                    </div>

                    <Divider />

                    {/* VEGETARIAN */}
                    <CategoryHeader
                        kicker="Pure Vegetarian"
                        title="Vegetarian Set Menus"
                        subtitle={`${veg.length} curated menus · from £${veg[veg.length - 1].price} per person`}
                    />
                    <div className="flex flex-col gap-12 md:gap-16">
                        {veg.map((m) => (
                            <SetMenuCard key={m.id} menu={m} />
                        ))}
                    </div>

                    <Divider />

                    {/* CTA */}
                    <div className="text-center max-w-[760px] mx-auto">
                        <h3
                            className="text-[26px] md:text-[40px] leading-[1.2] text-[#2D3630] mb-4"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 400,
                            }}
                        >
                            Plan your private gathering
                        </h3>
                        <p
                            className="text-[14px] md:text-[16px] leading-[1.6] text-[#363636]/80 mb-8"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            Tell us about your occasion and we’ll help shape the perfect
                            evening — set menus can be tailored to dietary requirements
                            and group size on request.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <Link
                                href="/group"
                                className="inline-block px-10 py-4 transition-all duration-300 hover:bg-[#161d18] hover:text-[#CBAC70]"
                                style={{
                                    background: "#CBAC70",
                                    color: "#161d18",
                                    fontFamily: "var(--font-jost), sans-serif",
                                    fontSize: "13px",
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Group Enquiry
                            </Link>
                            <Link
                                href="/reservation"
                                className="inline-block px-10 py-4 transition-all duration-300 hover:bg-[#2D3630] hover:text-[#CBAC70] hover:border-[#2D3630]"
                                style={{
                                    background: "transparent",
                                    color: "#2D3630",
                                    border: "1px solid #2D3630",
                                    fontFamily: "var(--font-jost), sans-serif",
                                    fontSize: "13px",
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Book a Table
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

/* ============ COMPONENTS ============ */

function CategoryHeader({
    kicker,
    title,
    subtitle,
}: {
    kicker: string;
    title: string;
    subtitle: string;
}) {
    return (
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
                {kicker}
            </p>
            <h2
                className="text-[32px] md:text-[56px] leading-[1.1] text-[#2D3630]"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 400,
                }}
            >
                {title}
            </h2>
            <div className="flex justify-center mt-5 mb-4">
                <Ornament />
            </div>
            <p
                className="text-[12px] md:text-[13px] uppercase tracking-[0.2em] text-[#BF9261]/80"
                style={{ fontFamily: "var(--font-jost), sans-serif" }}
            >
                {subtitle}
            </p>
        </div>
    );
}

function SetMenuCard({ menu, featured }: { menu: SetMenu; featured?: boolean }) {
    return (
        <article
            id={menu.id}
            className="scroll-mt-28 relative"
            style={{
                background: "#FFFFFF",
                border: `1px solid ${featured ? "#CBAC70" : "rgba(191,146,97,0.3)"}`,
                boxShadow: featured ? "0 4px 24px rgba(203,172,112,0.12)" : "none",
            }}
        >
            {featured && (
                <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[9px] uppercase tracking-[0.2em] z-10"
                    style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        background: "#CBAC70",
                        color: "#161d18",
                    }}
                >
                    Chef’s Recommendation
                </span>
            )}

            {/* Card Header */}
            <header
                className="px-6 md:px-10 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6 border-b"
                style={{
                    borderColor: "rgba(191,146,97,0.25)",
                    background:
                        "linear-gradient(180deg, rgba(203,172,112,0.06) 0%, rgba(255,255,255,0) 100%)",
                }}
            >
                <div className="flex items-baseline gap-4">
                    <span
                        className="text-[44px] md:text-[64px] leading-none text-[#CBAC70]"
                        style={{
                            fontFamily: "var(--font-roboto-serif), serif",
                            fontWeight: 400,
                        }}
                    >
                        {menu.number}
                    </span>
                    <div>
                        <p
                            className="uppercase mb-1"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                fontSize: "11px",
                                letterSpacing: "2.5px",
                                color: "#BF9261",
                            }}
                        >
                            {menu.category} Set Menu
                        </p>
                        <p
                            className="text-[14px] text-[#363636]/70"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            {menu.smallPlates.length}-course tasting · 3 small plates style
                        </p>
                    </div>
                </div>
                <div className="text-right md:text-right">
                    <p
                        className="leading-none text-[#2D3630]"
                        style={{
                            fontFamily: "var(--font-roboto-serif), serif",
                            fontSize: "36px",
                            fontWeight: 500,
                        }}
                    >
                        <span
                            className="text-[20px] align-top mr-1 text-[#CBAC70]"
                        >£</span>
                        {menu.price}
                    </p>
                    <p
                        className="text-[10px] uppercase tracking-[0.2em] text-[#BF9261] mt-2"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        Per Person
                    </p>
                </div>
            </header>

            {/* Card Body */}
            <div className="px-6 md:px-10 py-8 md:py-10">

                {/* Small Plates + Mains in 2 cols */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 mb-10">
                    <Course title="Small Plates" items={menu.smallPlates} />
                    <Course title="Mains" items={menu.mains} />
                </div>

                {/* Sides + Rice & Bread in 2 cols (compact) */}
                <div className="grid grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-8 pt-8 border-t border-[#BF9261]/15">
                    <CompactCourse title="Sides" items={menu.sides} />
                    <CompactCourse title="Rice &amp; Bread" items={menu.riceAndBread} />
                </div>

                {/* Desserts */}
                <div className="mt-10 pt-8 border-t border-[#BF9261]/15 text-center">
                    <p
                        className="uppercase mb-3"
                        style={{
                            fontFamily: "var(--font-jost), sans-serif",
                            fontSize: "11px",
                            letterSpacing: "3px",
                            color: "#BF9261",
                        }}
                    >
                        Dessert
                    </p>
                    <p
                        className="text-[18px] md:text-[22px] text-[#2D3630]"
                        style={{
                            fontFamily: "var(--font-roboto-serif), serif",
                            fontWeight: 500,
                        }}
                    >
                        {menu.desserts.map((dessert, i) => (
                            <span key={i}>
                                {i > 0 && (
                                    <span className="mx-3 text-[#BF9261]/60 italic text-[16px]">
                                        or
                                    </span>
                                )}
                                {dessert}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </article>
    );
}

function Course({ title, items }: { title: string; items: DishWithDescription[] }) {
    return (
        <div>
            <h3
                className="uppercase mb-5"
                style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "12px",
                    letterSpacing: "3px",
                    color: "#BF9261",
                }}
            >
                {title}
            </h3>
            <ul className="flex flex-col gap-4">
                {items.map((dish) => (
                    <li key={dish.name}>
                        <h4
                            className="text-[16px] md:text-[17px] text-[#2D3630] mb-1"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 500,
                            }}
                        >
                            {dish.name}
                        </h4>
                        {dish.description && (
                            <p
                                className="text-[13px] leading-[1.6] text-[#363636]/80"
                                style={{ fontFamily: "var(--font-jost), sans-serif" }}
                            >
                                {dish.description}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CompactCourse({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <h3
                className="uppercase mb-3"
                style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    color: "#BF9261",
                }}
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <ul className="flex flex-col gap-1.5">
                {items.map((item) => (
                    <li
                        key={item}
                        className="text-[14px] md:text-[15px] text-[#2D3630]"
                        style={{
                            fontFamily: "var(--font-roboto-serif), serif",
                            fontWeight: 500,
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
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
