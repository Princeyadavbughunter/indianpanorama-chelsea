import Link from "next/link";
import {
    takeawayStarters,
    takeawaySeafood,
    takeawayPoultry,
    takeawayLamb,
    takeawayVegetables,
    takeawayBiryani,
    takeawaySides,
    sidesUpgradeNote,
    takeawayBreads,
    takeawayRice,
    takeawayDesserts,
    takeawaySoftDrinks,
    takeawayBeers,
    takeawayWhiteWines,
    takeawayRedWines,
    takeawayContact,
    takeawayAllergen,
    type TakeawayItem,
} from "./takeawayMenuData";

const NAV_LINKS = [
    { href: "#starters", label: "Starters" },
    { href: "#mains", label: "Mains" },
    { href: "#biryani", label: "Biryani" },
    { href: "#sides", label: "Sides" },
    { href: "#bread-rice", label: "Bread &amp; Rice" },
    { href: "#desserts", label: "Desserts" },
    { href: "#drinks", label: "Drinks" },
];

export default function TakeawayMenuContent() {
    const phoneHref = `tel:${takeawayContact.phone.replace(/\s/g, "")}`;

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
                        Collection &amp; Delivery
                    </p>
                    <h1
                        className="text-[30px] md:text-[52px] lg:text-[64px] leading-[1.1] text-[#e2d6c1] max-w-[860px] mx-auto"
                        style={{ fontFamily: "var(--font-roboto-serif), serif", fontWeight: 400 }}
                    >
                        Elevated Indian Cuisine,
                        <br />
                        <span className="italic text-[#CBAC70]">Enjoyed at Home</span>
                    </h1>
                    <div className="flex justify-center mt-6 mb-8">
                        <Ornament dark />
                    </div>
                    <p
                        className="text-[14px] md:text-[16px] leading-[1.7] text-[#e2d6c1]/80 max-w-[640px] mx-auto mb-8"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        Our full menu, packed and ready. Order by phone or online for
                        collection from Draycott Avenue — quote the dish number for the
                        quickest service.
                    </p>

                    {/* Order Bar */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        <a
                            href={phoneHref}
                            className="inline-flex items-center gap-3 px-7 py-3.5 transition-all duration-300 hover:bg-[#e2d6c1]"
                            style={{
                                background: "#CBAC70",
                                color: "#161d18",
                                fontFamily: "var(--font-jost), sans-serif",
                                fontSize: "13px",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                            }}
                        >
                            <PhoneIcon />
                            <span>Call to Order · {takeawayContact.phone}</span>
                        </a>
                    </div>
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
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </li>
                    ))}
                </ul>
            </nav>

            {/* BODY */}
            <section className="w-full bg-[#FDFBF7] py-[60px] md:py-[100px] px-4 md:px-8">
                <div className="max-w-[1240px] mx-auto">

                    {/* Spice Key */}
                    <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16 flex-wrap">
                        <SpiceKey level={1} label="Medium Hot" />
                        <SpiceKey level={2} label="Fairly Hot" />
                        <SpiceKey level={3} label="Very Hot" />
                    </div>

                    {/* ============ STARTERS ============ */}
                    <div id="starters" className="scroll-mt-24">
                        <SectionTitle kicker="To Begin" title="Small Plates" />
                    </div>
                    <ItemGrid items={takeawayStarters} />

                    <Divider />

                    {/* ============ MAINS ============ */}
                    <div id="mains" className="scroll-mt-24">
                        <SectionTitle kicker="The Heart of the Menu" title="Main Courses" />
                    </div>

                    <SubHeading title="Seafood" sub="Dishes 12 – 15" />
                    <ItemGrid items={takeawaySeafood} />

                    <div className="mt-14 md:mt-20">
                        <SubHeading title="Poultry" sub="Dishes 16 – 22" />
                        <ItemGrid items={takeawayPoultry} />
                    </div>

                    <div className="mt-14 md:mt-20">
                        <SubHeading title="Lamb" sub="Dishes 23 – 29" />
                        <ItemGrid items={takeawayLamb} />
                    </div>

                    <div className="mt-14 md:mt-20">
                        <SubHeading title="Vegetables" sub="Dishes 30 – 31" />
                        <ItemGrid items={takeawayVegetables} />
                    </div>

                    <Divider />

                    {/* ============ BIRYANI ============ */}
                    <div id="biryani" className="scroll-mt-24">
                        <SectionTitle kicker="Aromatic Rice" title="Biryani" />
                    </div>
                    <FeaturedBiryani item={takeawayBiryani} />

                    <Divider />

                    {/* ============ SIDES ============ */}
                    <div id="sides" className="scroll-mt-24">
                        <SectionTitle kicker="Accompaniments" title="Sides" />
                    </div>
                    <p
                        className="text-center text-[12px] uppercase tracking-[0.18em] text-[#BF9261]/80 mb-10 md:mb-14"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        ◆  {sidesUpgradeNote}  ◆
                    </p>
                    <ItemGrid items={takeawaySides} />

                    <Divider />

                    {/* ============ BREAD & RICE ============ */}
                    <div id="bread-rice" className="scroll-mt-24">
                        <SectionTitle kicker="From the Tandoor" title="Bread &amp; Rice" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14">
                        <div>
                            <SubHeading title="Breads" />
                            <ItemList items={takeawayBreads} />
                        </div>
                        <div>
                            <SubHeading title="Rice" />
                            <ItemList items={takeawayRice} />
                        </div>
                    </div>

                    <Divider />

                    {/* ============ DESSERTS ============ */}
                    <div id="desserts" className="scroll-mt-24">
                        <SectionTitle kicker="To Finish" title="Desserts" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-[900px] mx-auto">
                        {takeawayDesserts.map((d) => (
                            <DessertCard key={d.name} item={d} />
                        ))}
                    </div>

                    <Divider />

                    {/* ============ DRINKS ============ */}
                    <div id="drinks" className="scroll-mt-24">
                        <SectionTitle kicker="To Accompany" title="Drinks" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14">
                        <div>
                            <SubHeading title="Soft Drinks &amp; Lassi" />
                            <ItemList items={takeawaySoftDrinks} compact />
                        </div>
                        <div>
                            <SubHeading title="Beers" />
                            <ItemList items={takeawayBeers} compact />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14 mt-14 md:mt-20">
                        <div>
                            <SubHeading title="White Wines" sub="By the bottle" />
                            <ItemList items={takeawayWhiteWines} />
                        </div>
                        <div>
                            <SubHeading title="Red Wines" sub="By the bottle" />
                            <ItemList items={takeawayRedWines} />
                        </div>
                    </div>

                    <Divider />

                    {/* ============ ORDER PANEL ============ */}
                    <div
                        className="relative max-w-[1000px] mx-auto px-6 md:px-12 py-10 md:py-14 text-center"
                        style={{
                            background: "#161d18",
                            color: "#e2d6c1",
                        }}
                    >
                        <span className="absolute top-3 left-3 w-[18px] h-[18px] border-l border-t border-[#CBAC70]" />
                        <span className="absolute top-3 right-3 w-[18px] h-[18px] border-r border-t border-[#CBAC70]" />
                        <span className="absolute bottom-3 left-3 w-[18px] h-[18px] border-l border-b border-[#CBAC70]" />
                        <span className="absolute bottom-3 right-3 w-[18px] h-[18px] border-r border-b border-[#CBAC70]" />

                        <p
                            className="uppercase mb-4"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                fontSize: "12px",
                                letterSpacing: "3px",
                                color: "#CBAC70",
                            }}
                        >
                            Place an Order
                        </p>
                        <h3
                            className="text-[28px] md:text-[44px] leading-[1.15] mb-6"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 400,
                                color: "#e2d6c1",
                            }}
                        >
                            Hot, packed and ready to collect
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10 max-w-[900px] mx-auto text-left">
                            <ContactBlock
                                icon={<PhoneIcon />}
                                label="Call to Order"
                                value={takeawayContact.phone}
                                href={phoneHref}
                            />
                            <ContactBlock
                                icon={<PinIcon />}
                                label="Collect From"
                                value={takeawayContact.address}
                            />
                            <ContactBlock
                                icon={<ClockIcon />}
                                label="Open Daily"
                                value="5:00 pm – 10:30 pm"
                            />
                        </div>

                        <p
                            className="mt-8 text-[12px] tracking-[0.12em] uppercase"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                color: "rgba(226,214,193,0.65)",
                            }}
                        >
                            ✦ {takeawayContact.parkingNote} ✦
                        </p>
                    </div>

                    {/* Allergen */}
                    <p
                        className="mt-16 md:mt-20 text-center text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#363636]/60 max-w-[820px] mx-auto leading-[1.8]"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        {takeawayAllergen}
                    </p>
                </div>
            </section>
        </>
    );
}

/* ============ COMPONENTS ============ */

function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
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
                className="text-[36px] md:text-[60px] leading-[1.1] text-[#2D3630]"
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

function ItemGrid({ items }: { items: TakeawayItem[] }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-6">
            {items.map((item) => (
                <RichItem key={(item.number ?? "") + item.name} item={item} />
            ))}
        </ul>
    );
}

function RichItem({ item }: { item: TakeawayItem }) {
    return (
        <li className="flex gap-4 pb-5 border-b border-[#BF9261]/15">
            {item.number && (
                <span
                    className="shrink-0 text-[18px] md:text-[20px] leading-none mt-0.5"
                    style={{
                        fontFamily: "var(--font-roboto-serif), serif",
                        fontWeight: 500,
                        color: "#CBAC70",
                        minWidth: "32px",
                    }}
                >
                    {item.number}
                </span>
            )}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-1">
                    <h4
                        className="text-[16px] md:text-[18px] text-[#2D3630] flex items-baseline flex-wrap gap-x-2"
                        style={{
                            fontFamily: "var(--font-roboto-serif), serif",
                            fontWeight: 500,
                        }}
                    >
                        <span>{item.name}</span>
                        {item.spice && <SpiceMarker level={item.spice} />}
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
                {item.note && (
                    <p
                        className="mt-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[#BF9261]"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        {item.note}
                    </p>
                )}
            </div>
        </li>
    );
}

function ItemList({ items, compact = false }: { items: TakeawayItem[]; compact?: boolean }) {
    return (
        <ul className={compact ? "flex flex-col gap-2.5" : "flex flex-col gap-5"}>
            {items.map((item) => (
                <li
                    key={item.name}
                    className={
                        compact
                            ? "py-1.5 border-b border-[#BF9261]/10 last:border-0"
                            : "pb-4 border-b border-[#BF9261]/15 last:border-0 last:pb-0"
                    }
                >
                    <div className="flex items-baseline gap-3">
                        <h4
                            className={
                                compact
                                    ? "text-[14px] md:text-[15px] text-[#2D3630] flex items-baseline gap-x-2"
                                    : "text-[16px] md:text-[17px] text-[#2D3630] flex items-baseline gap-x-2"
                            }
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 500,
                            }}
                        >
                            <span>{item.name}</span>
                            {item.note && compact && (
                                <span
                                    className="text-[10px] uppercase tracking-[0.1em] text-[#BF9261]/70"
                                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                                >
                                    {item.note}
                                </span>
                            )}
                            {item.spice && <SpiceMarker level={item.spice} />}
                        </h4>
                        <span
                            className="border-b border-dotted border-[#BF9261]/40 flex-1 mb-1.5"
                            aria-hidden="true"
                        />
                        <span
                            className={
                                compact
                                    ? "text-[14px] md:text-[15px] text-[#BF9261] whitespace-nowrap"
                                    : "text-[16px] md:text-[17px] text-[#BF9261] whitespace-nowrap"
                            }
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 500,
                            }}
                        >
                            £{item.price}
                        </span>
                    </div>
                    {item.description && !compact && (
                        <p
                            className="mt-2 text-[13px] leading-[1.6] text-[#363636]/80"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            {item.description}
                        </p>
                    )}
                    {item.note && !compact && (
                        <p
                            className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#BF9261]"
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

function FeaturedBiryani({ item }: { item: TakeawayItem }) {
    return (
        <div
            className="relative max-w-[1000px] mx-auto px-6 md:px-12 py-10 md:py-14 text-center"
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
                32 · Lucknowi Style
            </p>
            <h3
                className="text-[28px] md:text-[40px] leading-[1.15] text-[#2D3630] mb-2"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 500,
                }}
            >
                {item.name}
            </h3>
            <p
                className="text-[20px] md:text-[26px] text-[#BF9261] mb-5"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 500,
                }}
            >
                £{item.price}
            </p>
            <p
                className="text-[14px] md:text-[15px] leading-[1.7] text-[#363636]/85 max-w-[680px] mx-auto"
                style={{ fontFamily: "var(--font-jost), sans-serif" }}
            >
                {item.description}
            </p>
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

function DessertCard({ item }: { item: TakeawayItem }) {
    return (
        <div
            className="p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1"
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
            <span className="block w-[30px] h-[1px] bg-[#BF9261]/50 mb-3" />
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

function SpiceMarker({ level }: { level: 1 | 2 | 3 }) {
    return (
        <span
            className="inline-flex items-center gap-0.5"
            title={`Spice level ${level} of 3`}
            aria-label={`Spice level ${level} of 3`}
        >
            {Array.from({ length: level }).map((_, i) => (
                <ChiliIcon key={i} />
            ))}
        </span>
    );
}

function SpiceKey({ level, label }: { level: 1 | 2 | 3; label: string }) {
    return (
        <span
            className="inline-flex items-center gap-2 text-[11px] md:text-[12px] uppercase tracking-[0.15em]"
            style={{
                fontFamily: "var(--font-jost), sans-serif",
                color: "#363636",
            }}
        >
            <span className="inline-flex gap-0.5">
                {Array.from({ length: level }).map((_, i) => (
                    <ChiliIcon key={i} />
                ))}
            </span>
            <span>= {label}</span>
        </span>
    );
}

function ChiliIcon() {
    return (
        <svg
            width="11"
            height="14"
            viewBox="0 0 11 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ display: "inline-block" }}
        >
            <path
                d="M5.5 1.2 c -0.3 0 -0.5 0.1 -0.6 0.4 c 0 0.3 0.2 0.5 0.4 0.5 c 0.5 0 1.5 0.4 2 1.6 c 0.5 1.2 -0.4 2.6 -1.4 3.6 c -1.4 1.4 -3 2.7 -3 4.5 c 0 1.4 1.2 2 2.4 2 c 1.5 0 3.2 -1.2 3.7 -3.4 c 0.4 -1.7 -0.2 -3.4 -1.1 -4.7 c -0.6 -0.9 -1 -1.7 -0.9 -2.4 c 0 -0.4 0.3 -0.6 0.5 -0.7 c 0.2 -0.1 0.3 -0.3 0.2 -0.5 c -0.1 -0.2 -0.3 -0.3 -0.5 -0.3 c -0.5 0.1 -1.1 0.4 -1.7 -0.6"
                fill="#c0392b"
            />
        </svg>
    );
}

function ContactBlock({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}) {
    const Tag = href ? "a" : "div";
    return (
        <Tag
            href={href}
            className="flex flex-col items-start gap-2 p-5 transition-colors"
            style={{
                background: "rgba(203,172,112,0.06)",
                border: "1px solid rgba(203,172,112,0.2)",
            }}
        >
            <span className="text-[#CBAC70]">{icon}</span>
            <span
                className="uppercase"
                style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "10px",
                    letterSpacing: "2.5px",
                    color: "#CBAC70",
                }}
            >
                {label}
            </span>
            <span
                className="text-[15px] md:text-[16px] leading-[1.4]"
                style={{
                    fontFamily: "var(--font-roboto-serif), serif",
                    fontWeight: 500,
                    color: "#e2d6c1",
                }}
            >
                {value}
            </span>
        </Tag>
    );
}

function PhoneIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
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
