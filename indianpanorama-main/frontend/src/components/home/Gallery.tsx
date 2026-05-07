import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/anim/Reveal";
import SplitReveal from "@/components/anim/SplitReveal";

type Tile = {
    src?: string;
    video?: string;
    alt: string;
    label?: string;
    caption?: string;
    span: string;
    rowSpan: string;
    sizes: string;
    priority?: boolean;
};

const TILES: Tile[] = [
    {
        src: "/images/Gallery/new_tall_image.jpeg",
        alt: "Chef Patron and dining room at Indian Panorama Chelsea, Draycott Avenue SW3",
        label: "Chef Patron",
        caption: "Hand-crafted, handed down",
        span: "col-span-2 md:col-span-5",
        rowSpan: "row-span-2 md:row-span-3",
        sizes: "(max-width: 768px) 100vw, 42vw",
        priority: true,
    },
    {
        video: "/images/chef_patron.mp4",
        alt: "Kitchen at work — chefs preparing dishes at Indian Panorama Chelsea",
        label: "The Pass",
        caption: "Live from the kitchen",
        span: "col-span-1 md:col-span-3",
        rowSpan: "row-span-2 md:row-span-2",
        sizes: "(max-width: 768px) 50vw, 25vw",
    },
    {
        src: "/images/Gallery/3.png",
        alt: "Signature regional Indian dish plated at Indian Panorama Chelsea",
        label: "Signatures",
        caption: "Plated with intent",
        span: "col-span-1 md:col-span-4",
        rowSpan: "row-span-2 md:row-span-2",
        sizes: "(max-width: 768px) 50vw, 33vw",
    },
    {
        src: "/images/Gallery/4.png",
        alt: "Slow-cooked curry served with basmati rice at Indian Panorama Chelsea",
        label: "Slow Cooked",
        span: "col-span-1 md:col-span-3",
        rowSpan: "row-span-1 md:row-span-1",
        sizes: "(max-width: 768px) 50vw, 25vw",
    },
    {
        src: "/images/Gallery/6.png",
        alt: "House cocktail at Indian Panorama Chelsea, Draycott Avenue SW3",
        label: "The Bar",
        span: "col-span-1 md:col-span-2",
        rowSpan: "row-span-1 md:row-span-1",
        sizes: "(max-width: 768px) 50vw, 17vw",
    },
    {
        src: "/images/Gallery/7.png",
        alt: "Reserve spirits and candlelit table setting at Indian Panorama Chelsea",
        label: "Reserve Spirits",
        span: "col-span-2 md:col-span-2",
        rowSpan: "row-span-1 md:row-span-1",
        sizes: "(max-width: 768px) 100vw, 17vw",
    },
];

export default function Gallery() {
    return (
        <section className="bg-white py-16 md:py-28">
            <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8">

                {/* Section heading */}
                <div className="text-center mb-10 md:mb-14">
                    <Reveal direction="fade" duration={800}>
                        <p
                            className="font-[var(--font-jost)] text-[#BF9261] text-[11px] md:text-[12px] uppercase inline-flex items-center gap-3 mb-4"
                            style={{ letterSpacing: "0.3em" }}
                        >
                            <span className="h-px w-8 md:w-10 bg-[#BF9261]" />
                            The Gallery
                            <span className="h-px w-8 md:w-10 bg-[#BF9261]" />
                        </p>
                    </Reveal>
                    <h2 className="font-serif text-[32px] md:text-[52px] leading-[1.1] text-[#2D3630]">
                        <SplitReveal text="A Glimpse" delay={200} stagger={70} />
                        {" "}
                        <span className="italic text-[#BF9261]">
                            <SplitReveal text="Inside" delay={400} stagger={80} />
                        </span>
                    </h2>
                    <Reveal direction="up" delay={650} duration={900} distance={20}>
                        <p
                            className="mt-5 text-[14px] md:text-[15px] text-[#363636]/70 max-w-[560px] mx-auto leading-[1.7]"
                            style={{ fontFamily: "var(--font-jost), sans-serif" }}
                        >
                            Linger over the room, the kitchen line, and a few of the dishes
                            that have come to define the table.
                        </p>
                    </Reveal>
                </div>

                {/* Bento grid — stagger reveal */}
                <div className="grid grid-cols-2 md:grid-cols-12 auto-rows-[170px] md:auto-rows-[230px] gap-3 md:gap-4">
                    {TILES.map((tile, i) => (
                        <Reveal
                            key={i}
                            direction="scale"
                            delay={i * 110}
                            duration={1000}
                            className={`${tile.span} ${tile.rowSpan}`}
                        >
                            <GalleryTile tile={tile} />
                        </Reveal>
                    ))}
                </div>

                {/* Footer cue */}
                <Reveal direction="up" duration={900} distance={20} className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <p
                            className="text-[11px] md:text-[12px] uppercase mb-2"
                            style={{
                                fontFamily: "var(--font-jost), sans-serif",
                                letterSpacing: "0.25em",
                                color: "#BF9261",
                            }}
                        >
                            More on Instagram
                        </p>
                        <a
                            href="https://www.instagram.com/indianpanoramachelsea"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-serif text-[20px] md:text-[24px] text-[#2D3630] hover:text-[#BF9261] transition-colors inline-flex items-center gap-2"
                        >
                            @indianpanoramachelsea
                            <ArrowRight size={18} />
                        </a>
                    </div>

                    <Link
                        href="/menu"
                        className="group inline-flex items-center gap-3 font-serif uppercase text-[12px] md:text-[13px] px-8 md:px-10 py-4 border border-[#2D3630] text-[#2D3630] hover:bg-[#2D3630] hover:text-[#CBAC70] transition-all duration-300"
                        style={{ letterSpacing: "0.25em" }}
                    >
                        Explore the Menu
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </Reveal>

            </div>
        </section>
    );
}

function GalleryTile({ tile }: { tile: Tile }) {
    return (
        <div
            className="relative overflow-hidden bg-black group h-full w-full"
        >
            {tile.video ? (
                <video
                    src={tile.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={tile.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.06]"
                />
            ) : (
                <Image
                    src={tile.src!}
                    alt={tile.alt}
                    fill
                    sizes={tile.sizes}
                    className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.06]"
                    priority={tile.priority}
                />
            )}

            {/* Hover gradient + caption */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background:
                        "linear-gradient(to top, rgba(22,29,24,0.85) 0%, rgba(22,29,24,0.3) 50%, rgba(22,29,24,0) 100%)",
                }}
            />

            {tile.label && (
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p
                        className="uppercase mb-1"
                        style={{
                            fontFamily: "var(--font-jost), sans-serif",
                            fontSize: "10px",
                            letterSpacing: "2.5px",
                            color: "#CBAC70",
                        }}
                    >
                        {tile.label}
                    </p>
                    {tile.caption && (
                        <p
                            className="text-[#e2d6c1] text-[14px] md:text-[16px] leading-tight"
                            style={{
                                fontFamily: "var(--font-roboto-serif), serif",
                                fontWeight: 400,
                            }}
                        >
                            {tile.caption}
                        </p>
                    )}
                </div>
            )}

            {/* Always-visible corner accent */}
            <span className="absolute top-2 left-2 w-[10px] h-[10px] border-l border-t border-[#CBAC70]/0 group-hover:border-[#CBAC70]/80 transition-colors duration-500" />
            <span className="absolute top-2 right-2 w-[10px] h-[10px] border-r border-t border-[#CBAC70]/0 group-hover:border-[#CBAC70]/80 transition-colors duration-500" />
            <span className="absolute bottom-2 left-2 w-[10px] h-[10px] border-l border-b border-[#CBAC70]/0 group-hover:border-[#CBAC70]/80 transition-colors duration-500" />
            <span className="absolute bottom-2 right-2 w-[10px] h-[10px] border-r border-b border-[#CBAC70]/0 group-hover:border-[#CBAC70]/80 transition-colors duration-500" />
        </div>
    );
}
