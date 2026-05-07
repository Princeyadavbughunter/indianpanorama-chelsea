import type { MenuItem } from "./menuData";

type Props = {
    title: string;
    items: MenuItem[];
    kicker?: string;
    description?: string;
    footer?: string;
    compact?: boolean;
    subSection?: boolean;
};

export default function MenuSection({
    title,
    items,
    kicker,
    description,
    footer,
    compact = false,
    subSection = false,
}: Props) {
    return (
        <div>
            {/* Header */}
            <div className="mb-6 md:mb-8">
                {kicker && (
                    <p
                        className="uppercase mb-2"
                        style={{
                            fontFamily: "var(--font-jost), sans-serif",
                            fontSize: "12px",
                            letterSpacing: "2.5px",
                            color: "#BF9261",
                        }}
                    >
                        {kicker}
                    </p>
                )}
                <h2
                    className={
                        subSection
                            ? "text-[22px] md:text-[28px] text-[#2D3630]"
                            : "text-[26px] md:text-[36px] text-[#2D3630]"
                    }
                    style={{
                        fontFamily: "var(--font-roboto-serif), serif",
                        fontWeight: 500,
                        letterSpacing: subSection ? "0.05em" : 0,
                    }}
                >
                    {title}
                </h2>
                <span
                    className="block mt-3 h-[1px]"
                    style={{
                        width: subSection ? "40px" : "60px",
                        background: "#BF9261",
                    }}
                />
                {description && (
                    <p
                        className="mt-4 text-[13px] md:text-[14px] leading-[1.6] text-[#363636]/80 italic"
                        style={{ fontFamily: "var(--font-jost), sans-serif" }}
                    >
                        {description}
                    </p>
                )}
            </div>

            {/* Items */}
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
                            <h3
                                className={
                                    compact
                                        ? "text-[14px] md:text-[15px] text-[#2D3630] flex items-baseline flex-wrap gap-x-2"
                                        : "text-[16px] md:text-[18px] text-[#2D3630] flex items-baseline flex-wrap gap-x-2"
                                }
                                style={{
                                    fontFamily: "var(--font-roboto-serif), serif",
                                    fontWeight: 500,
                                }}
                            >
                                <span>{item.name}</span>
                                {item.spicy && (
                                    <span className="text-[11px] text-[#c0392b]" title="Spicy">
                                        ●
                                    </span>
                                )}
                                {item.signature && (
                                    <span
                                        className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[#BF9261]"
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
                                className={
                                    compact
                                        ? "text-[14px] md:text-[15px] text-[#BF9261] whitespace-nowrap"
                                        : "text-[16px] md:text-[18px] text-[#BF9261] whitespace-nowrap"
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
                                className="mt-2 text-[13px] md:text-[14px] leading-[1.6] text-[#363636]/85"
                                style={{ fontFamily: "var(--font-jost), sans-serif" }}
                            >
                                {item.description}
                            </p>
                        )}
                        {item.note && !compact && (
                            <p
                                className="mt-1.5 text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-[#BF9261]"
                                style={{ fontFamily: "var(--font-jost), sans-serif" }}
                            >
                                {item.note}
                            </p>
                        )}
                    </li>
                ))}
            </ul>

            {footer && (
                <p
                    className="mt-6 text-[12px] md:text-[13px] italic text-[#363636]/70 leading-[1.6]"
                    style={{ fontFamily: "var(--font-jost), sans-serif" }}
                >
                    {footer}
                </p>
            )}
        </div>
    );
}
