import Link from "next/link";
import {
    signatureCocktails,
    classicCocktails,
    mocktails,
    champagneAndSparkling,
    halfBottles,
    whiteWines,
    roseWines,
    redWines,
    dessertWine,
    whisky,
    vodka,
    gin,
    rum,
    tequila,
    cognac,
    liqueurs,
    shooters,
    beers,
    aerated,
    juicesAndLassi,
    water,
    drinksAllergen,
    type DrinkItem,
} from "./drinksMenuData";

const NAV_LINKS = [
    { href: "#cocktails", label: "Cocktails" },
    { href: "#wines", label: "Wines" },
    { href: "#spirits", label: "Spirits" },
    { href: "#beers", label: "Beers" },
    { href: "#softs", label: "Soft Drinks" },
];

export default function DrinksMenuContent() {
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
                        Crafted to Pair, Designed to Linger
                    </p>
                    <h1
                        className="text-[30px] md:text-[50px] lg:text-[60px] leading-[1.1] text-[#e2d6c1] max-w-[900px] mx-auto"
                        style={{ fontFamily: "var(--font-roboto-serif), serif", fontWeight: 400 }}
                    >
                        Curated Wines &amp;
                        <br />
                        <span className="italic text-[#CBAC70]">Botanically Inspired Cocktails</span>
                    </h1>
                    <div className="flex justify-center mt-6 mb-6">
                        <Ornament dark />
                    </div>
                    <p
                        className="text-[14px] md:text-[16px] leading-[1.7] text-[#e2d6c1]/80 max-w-[640px] mx-auto"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        From house-signature cocktails inspired by the streets of Mumbai
                        to single malts whispered around the bar in Lucknow — every pour
                        is chosen to dance with our spices.
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
                    {NAV_LINKS.map((link) => (
                        <li key={link.href} className="shrink-0">
                            <a
                                href={link.href}
                                className="inline-block px-3 md:px-5 py-2 uppercase transition-colors hover:text-[#CBAC70]"
                                style={{
                                    fontFamily: "var(--font-jost), sans-serif",
                                    fontSize: "11px",
                                    letterSpacing: "2px",
                                    color: "#e2d6c1",
                                }}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* MAIN BODY */}
            <section className="w-full bg-[#FDFBF7] py-[60px] md:py-[100px] px-4 md:px-8">
                <div className="max-w-[1240px] mx-auto">

                    {/* ============ COCKTAILS ============ */}
                    <div id="cocktails" className="scroll-mt-24">
                        <SectionTitle kicker="The Bar" title="Cocktails" />
                    </div>

                    {/* Signature cocktails — featured cards */}
                    <SubHeading title="House Signatures" sub="Crafted in our bar — £10 each" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {signatureCocktails.map((c) => (
                            <SignatureCard key={c.name} item={c} />
                        ))}
                    </div>

                    {/* Classic cocktails + Mocktails — side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14 mt-16 md:mt-20">
                        <div>
                            <SubHeading title="Classic Cocktails" sub="Timeless bar greats" />
                            <ItemList items={classicCocktails} variant="line" />
                        </div>
                        <div>
                            <SubHeading title="Mocktails" sub="Spirit-free, full of flavour" />
                            <ItemList items={mocktails} variant="descriptive" />
                        </div>
                    </div>

                    <Divider />

                    {/* ============ WINES ============ */}
                    <div id="wines" className="scroll-mt-24">
                        <SectionTitle kicker="The Cellar" title="Wines" />
                    </div>

                    <SubHeading title="Champagne &amp; Sparkling" />
                    <WineList items={champagneAndSparkling} />

                    <div className="mt-14 md:mt-20">
                        <SubHeading title="White Wines" />
                        <WineList items={whiteWines} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14 mt-14 md:mt-20">
                        <div>
                            <SubHeading title="Rosé Wines" />
                            <WineList items={roseWines} />
                        </div>
                        <div>
                            <SubHeading title="Red Wines" />
                            <WineList items={redWines} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14 mt-14 md:mt-20">
                        <div>
                            <SubHeading title="Half Bottles" sub="375ml" />
                            <WineList items={halfBottles} />
                        </div>
                        <div>
                            <SubHeading title="Dessert Wine" />
                            <WineList items={dessertWine} />
                        </div>
                    </div>

                    <Divider />

                    {/* ============ SPIRITS ============ */}
                    <div id="spirits" className="scroll-mt-24">
                        <SectionTitle kicker="From the Top Shelf" title="Spirits" />
                    </div>

                    <p
                        className="text-center text-[12px] uppercase tracking-[0.18em] text-[#BF9261]/80 mb-10 md:mb-14"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        ◆  Single measure, neat or on the rocks  ◆
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14">
                        <div>
                            <SubHeading title="Whisky" sub="Single malts, blends & world whiskies" />
                            <ItemList items={whisky} variant="line" />
                        </div>
                        <div className="flex flex-col gap-14">
                            <div>
                                <SubHeading title="Vodka" />
                                <ItemList items={vodka} variant="line" />
                            </div>
                            <div>
                                <SubHeading title="Gin" />
                                <ItemList items={gin} variant="line" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14 mt-14 md:mt-20">
                        <div className="flex flex-col gap-14">
                            <div>
                                <SubHeading title="Rum" />
                                <ItemList items={rum} variant="line" />
                            </div>
                            <div>
                                <SubHeading title="Tequila" />
                                <ItemList items={tequila} variant="line" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-14">
                            <div>
                                <SubHeading title="Cognac" />
                                <ItemList items={cognac} variant="line" />
                            </div>
                            <div>
                                <SubHeading title="Liqueurs" />
                                <ItemList items={liqueurs} variant="line" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-14 md:mt-20 max-w-[700px] mx-auto">
                        <SubHeading title="Shooters" sub="Single shot · £8.50 each" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {shooters.map((s) => (
                                <div
                                    key={s.name}
                                    className="text-center px-3 py-3 border border-[#BF9261]/25 bg-white/40"
                                >
                                    <p
                                        className="text-[14px] md:text-[15px] text-[#2D3630]"
                                        style={{
                                            fontFamily: "var(--font-roboto-serif), serif",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {s.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Divider />

                    {/* ============ BEERS ============ */}
                    <div id="beers" className="scroll-mt-24">
                        <SectionTitle kicker="On Ice" title="Beers" />
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-6 max-w-[1100px] mx-auto">
                        {beers.map((b) => (
                            <BeerItem key={b.name} item={b} />
                        ))}
                    </ul>

                    <Divider />

                    {/* ============ SOFT DRINKS ============ */}
                    <div id="softs" className="scroll-mt-24">
                        <SectionTitle kicker="Without Alcohol" title="Soft Drinks &amp; Lassi" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-12 max-w-[1100px] mx-auto">
                        <div>
                            <SubHeading title="Aerated" sub="200ml · £3.50 each" />
                            <ItemList items={aerated} variant="compact" />
                        </div>
                        <div>
                            <SubHeading title="Juices &amp; Lassi" />
                            <ItemList items={juicesAndLassi} variant="line" />
                        </div>
                        <div>
                            <SubHeading title="Mineral Water" />
                            <ItemList items={water} variant="line" />
                        </div>
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
                            Pull up a stool
                        </h3>
                        <p
                            className="text-[14px] md:text-[16px] leading-[1.6] text-[#363636]/80 mb-8"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            Reserve a table on Draycott Avenue and let our bar team pour
                            you something memorable.
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

                    {/* Notice */}
                    <p
                        className="mt-16 md:mt-20 text-center text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#363636]/60 max-w-[820px] mx-auto leading-[1.8]"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        {drinksAllergen}
                    </p>
                </div>
            </section>
        </>
    );
}

/* ============ COMPONENTS ============ */

function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
    return (
        <div className="text-center mb-12 md:mb-16">
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
                className="text-[36px] md:text-[64px] leading-[1.1] text-[#2D3630]"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 400,
                }}
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <div className="flex justify-center mt-5">
                <Ornament />
            </div>
        </div>
    );
}

function SubHeading({ title, sub }: { title: string; sub?: string }) {
    return (
        <div className="mb-6 md:mb-8">
            <h3
                className="text-[22px] md:text-[28px] text-[#2D3630]"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                }}
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <span
                className="block mt-2.5 h-[1px]"
                style={{ width: "40px", background: "#BF9261" }}
            />
            {sub && (
                <p
                    className="mt-2.5 text-[12px] uppercase tracking-[0.15em] text-[#BF9261]/80"
                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                    {sub}
                </p>
            )}
        </div>
    );
}

function SignatureCard({ item }: { item: DrinkItem }) {
    return (
        <div
            className="relative h-full p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
                background:
                    "linear-gradient(180deg, rgba(203,172,112,0.06) 0%, rgba(255,255,255,0.4) 100%)",
                border: "1px solid rgba(191,146,97,0.25)",
            }}
        >
            <div className="flex items-baseline justify-between gap-4 mb-3">
                <h4
                    className="text-[18px] md:text-[20px] text-[#2D3630]"
                    style={{
                        fontFamily: "var(--font-roboto-serif), serif",
                        fontWeight: 500,
                    }}
                >
                    {item.name}
                </h4>
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
            <span
                className="block w-[30px] h-[1px] bg-[#BF9261]/50 mb-3"
                aria-hidden="true"
            />
            {item.description && (
                <p
                    className="text-[13px] md:text-[14px] leading-[1.6] text-[#363636]/85"
                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                    {item.description}
                </p>
            )}
        </div>
    );
}

function ItemList({
    items,
    variant,
}: {
    items: DrinkItem[];
    variant: "line" | "compact" | "descriptive";
}) {
    if (variant === "compact") {
        return (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {items.map((item) => (
                    <li
                        key={item.name}
                        className="flex items-baseline justify-between gap-2 py-1.5 border-b border-[#BF9261]/10"
                    >
                        <span
                            className="text-[14px] text-[#2D3630]"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 500,
                            }}
                        >
                            {item.name}
                        </span>
                        {item.price && (
                            <span
                                className="text-[14px] text-[#BF9261]"
                                style={{
                                    fontFamily: "var(--font-roboto-serif), serif",
                                    fontWeight: 500,
                                }}
                            >
                                £{item.price}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <ul className={variant === "descriptive" ? "flex flex-col gap-5" : "flex flex-col gap-2.5"}>
            {items.map((item) => (
                <li
                    key={item.name}
                    className={
                        variant === "descriptive"
                            ? "pb-4 border-b border-[#BF9261]/15 last:border-0 last:pb-0"
                            : "py-1.5 border-b border-[#BF9261]/10 last:border-0"
                    }
                >
                    <div className="flex items-baseline gap-3">
                        <h4
                            className={
                                variant === "descriptive"
                                    ? "text-[16px] md:text-[18px] text-[#2D3630]"
                                    : "text-[14px] md:text-[15px] text-[#2D3630]"
                            }
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 500,
                            }}
                        >
                            {item.name}
                        </h4>
                        <span
                            className="border-b border-dotted border-[#BF9261]/40 flex-1 mb-1.5"
                            aria-hidden="true"
                        />
                        {item.price && (
                            <span
                                className={
                                    variant === "descriptive"
                                        ? "text-[16px] md:text-[18px] text-[#BF9261] whitespace-nowrap"
                                        : "text-[14px] md:text-[15px] text-[#BF9261] whitespace-nowrap"
                                }
                                style={{
                                    fontFamily: "var(--font-roboto-serif), serif",
                                    fontWeight: 500,
                                }}
                            >
                                £{item.price}
                            </span>
                        )}
                    </div>
                    {item.description && variant === "descriptive" && (
                        <p
                            className="mt-2 text-[13px] md:text-[14px] leading-[1.6] text-[#363636]/85"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            {item.description}
                        </p>
                    )}
                    {item.note && variant === "descriptive" && (
                        <p
                            className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-[#BF9261]"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            {item.note}
                        </p>
                    )}
                </li>
            ))}
        </ul>
    );
}

function WineList({ items }: { items: DrinkItem[] }) {
    return (
        <ul className="flex flex-col gap-5">
            {items.map((item) => (
                <li
                    key={item.name}
                    className="pb-5 border-b border-[#BF9261]/15 last:border-0 last:pb-0"
                >
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                        <h4
                            className="text-[16px] md:text-[17px] text-[#2D3630] flex-1"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 500,
                            }}
                        >
                            {item.name}
                            {item.region && (
                                <span
                                    className="ml-2 text-[12px] tracking-[0.05em] text-[#363636]/55"
                                    style={{
                                        fontFamily: "var(--font-jost), sans-serif",
                                        fontStyle: "italic",
                                    }}
                                >
                                    · {item.region}
                                    {item.abv ? ` · ${item.abv}` : ""}
                                </span>
                            )}
                        </h4>
                        <div
                            className="text-right text-[#BF9261] whitespace-nowrap"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 500,
                            }}
                        >
                            {item.glassPrice && (
                                <span className="text-[14px] md:text-[15px]">
                                    {item.glassSize && (
                                        <span className="text-[10px] uppercase tracking-[0.1em] text-[#BF9261]/70 mr-1">
                                            {item.glassSize}
                                        </span>
                                    )}
                                    £{item.glassPrice}
                                </span>
                            )}
                            {item.glassPrice && item.bottlePrice && (
                                <span className="mx-2 text-[#BF9261]/40">·</span>
                            )}
                            {item.bottlePrice && (
                                <span className="text-[14px] md:text-[15px]">
                                    {!item.glassPrice && (
                                        <span className="text-[10px] uppercase tracking-[0.1em] text-[#BF9261]/70 mr-1">
                                            Btl
                                        </span>
                                    )}
                                    £{item.bottlePrice}
                                </span>
                            )}
                        </div>
                    </div>
                    {item.description && (
                        <p
                            className="text-[13px] leading-[1.6] text-[#363636]/80"
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

function BeerItem({ item }: { item: DrinkItem }) {
    return (
        <li className="pb-5 border-b border-[#BF9261]/15">
            <div className="flex items-baseline gap-3 mb-1">
                <h4
                    className="text-[16px] md:text-[18px] text-[#2D3630]"
                    style={{
                        fontFamily: "var(--font-roboto-serif), serif",
                        fontWeight: 500,
                    }}
                >
                    {item.name}
                    {item.abv && (
                        <span
                            className="ml-2 text-[11px] uppercase tracking-[0.1em] text-[#363636]/55"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            {item.abv}
                        </span>
                    )}
                </h4>
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
        </li>
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
