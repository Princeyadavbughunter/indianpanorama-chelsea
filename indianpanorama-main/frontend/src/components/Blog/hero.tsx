const Hero = () => {
    return (
        <section className="relative w-full mt-[94px] bg-white">
            <div className="relative w-full h-[45vh] md:h-[65vh] overflow-hidden">
                {/* Plain <img> so we never get blocked by next/image */}
                <img
                    src="/blog/HeroBlog.jpeg"
                    alt="Indian Panorama Chelsea kitchen — chef preparing regional Indian dishes on Draycott Avenue, SW3"
                    width={1920}
                    height={1080}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Dark wash for legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#161d18]/80" />

                {/* Title block */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                    <span
                        className="font-[var(--font-jost)] text-[#CBAC70] text-[11px] md:text-[13px] uppercase inline-flex items-center gap-3 mb-5"
                        style={{ letterSpacing: '0.38em' }}
                    >
                        <span className="h-px w-8 md:w-12 bg-[#CBAC70]" />
                        The Journal
                        <span className="h-px w-8 md:w-12 bg-[#CBAC70]" />
                    </span>
                    <h1
                        className="font-serif text-[#f5ecd8] text-4xl md:text-6xl lg:text-7xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                        style={{ letterSpacing: '0.02em' }}
                    >
                        Stories From <span className="italic text-[#CBAC70]">the Kitchen</span>
                    </h1>
                    <p
                        className="font-[var(--font-jost)] text-[#e2d6c1]/90 text-[14px] md:text-[16px] mt-6 max-w-xl leading-relaxed"
                        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}
                    >
                        Chef notes, regional dispatches, and behind-the-scenes reflections from
                        our table on Draycott Avenue.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
