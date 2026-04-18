import Image from 'next/image';

export default function Gallery() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8">

                {/* Section heading */}
                <div className="text-center mb-10 md:mb-14">
                    <p
                        className="font-[var(--font-jost)] text-[#BF9261] text-[11px] md:text-[12px] uppercase inline-flex items-center gap-3 mb-4"
                        style={{ letterSpacing: '0.28em' }}
                    >
                        <span className="h-px w-8 md:w-10 bg-[#BF9261]" />
                        The Gallery
                        <span className="h-px w-8 md:w-10 bg-[#BF9261]" />
                    </p>
                    <h2 className="font-serif text-[28px] md:text-[42px] leading-tight text-[#2D3630]">
                        A Glimpse <span className="italic text-[#BF9261]">Inside</span>
                    </h2>
                </div>

                {/*
                   Editorial bento layout:
                   - Mobile: 2-col grid, chef full-width feature, video tall next to stacked food
                   - Desktop: 12-col × 3-row grid with varied spans so each image keeps
                     an aspect close to its source orientation (no square cropping of portrait photos)
                */}
                <div
                    className="grid grid-cols-2 md:grid-cols-12 auto-rows-[160px] md:auto-rows-[220px] gap-3 md:gap-4"
                >

                    {/* Feature: Chef & dining room — portrait, full left column on desktop */}
                    <div className="relative overflow-hidden rounded-sm bg-black col-span-2 md:col-span-5 row-span-2 md:row-span-3 group">
                        <Image
                            src="/images/Gallery/new_tall_image.jpeg"
                            alt="Chef Patron and dining room at Indian Panorama Chelsea, Draycott Avenue SW3"
                            fill
                            sizes="(max-width: 768px) 100vw, 42vw"
                            className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.04]"
                            priority
                        />
                    </div>

                    {/* Kitchen video — tall portrait, middle column top */}
                    <div className="relative overflow-hidden rounded-sm bg-[#1a1a1a] col-span-1 md:col-span-3 row-span-2 md:row-span-2 group">
                        <video
                            src="/images/chef_patron.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            aria-label="Kitchen at work — chefs preparing dishes at Indian Panorama Chelsea"
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.04]"
                        />
                        {/* Subtle dark overlay so the live video doesn't clash with the stills next to it */}
                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>

                    {/* Food 1 — large, right column top */}
                    <div className="relative overflow-hidden rounded-sm bg-black col-span-1 md:col-span-4 row-span-2 md:row-span-2 group">
                        <Image
                            src="/images/Gallery/3.png"
                            alt="Signature regional Indian dish plated at Indian Panorama Chelsea"
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.06]"
                        />
                    </div>

                    {/* Food 2 — bottom strip, wider */}
                    <div className="relative overflow-hidden rounded-sm bg-black col-span-1 md:col-span-3 row-span-1 md:row-span-1 group">
                        <Image
                            src="/images/Gallery/4.png"
                            alt="Slow-cooked curry served with basmati rice at Indian Panorama Chelsea"
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.06]"
                        />
                    </div>

                    {/* Cocktail — bottom strip, smaller */}
                    <div className="relative overflow-hidden rounded-sm bg-black col-span-1 md:col-span-2 row-span-1 md:row-span-1 group">
                        <Image
                            src="/images/Gallery/6.png"
                            alt="House cocktail at Indian Panorama Chelsea, Draycott Avenue SW3"
                            fill
                            sizes="(max-width: 768px) 50vw, 17vw"
                            className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.06]"
                        />
                    </div>

                    {/* Rum / table — bottom strip, smaller */}
                    <div className="relative overflow-hidden rounded-sm bg-black col-span-1 md:col-span-2 row-span-1 md:row-span-1 group">
                        <Image
                            src="/images/Gallery/7.png"
                            alt="Reserve spirits and candlelit table setting at Indian Panorama Chelsea"
                            fill
                            sizes="(max-width: 768px) 50vw, 17vw"
                            className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.06]"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
