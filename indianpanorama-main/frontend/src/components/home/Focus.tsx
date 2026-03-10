import Image from "next/image";

export default function Focus() {
    return (
        <section className="py-[60px] md:py-[120px] bg-[#E9E1DC] px-4 md:px-0 overflow-hidden">
            <div className="max-w-[1271px] mx-auto flex gap-6 md:gap-[80px] items-start md:items-start flex-col md:flex-row">

                {/* LEFT IMAGE with Overlay */}
                <div className="w-full md:w-[476px] h-[400px] md:h-[700px] relative shrink-0 group overflow-hidden rounded-lg md:rounded-none">
                    <Image
                        src="/images/restaurant.png"
                        alt="Restaurant Interior"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex-1 py-2 md:py-10">
                    {/* Small Heading */}
                    <p className="text-[10px] md:text-[16px] tracking-[1px] text-[#BF9261] font-[var(--font-jost)] mb-2 md:mb-4 uppercase">
                        The Indian Panorama Way
                    </p>

                    {/* Main Heading */}
                    <h2 className="text-[32px] md:text-[64px] leading-[1.1] md:leading-[64px] tracking-[0] font-medium text-[#2D3630] font-[var(--font-roboto-serif)] mb-6 md:mb-12 align-middle">
                        Focused on <br /> Authenticity
                    </h2>

                    {/* Content Block */}
                    <div className="space-y-6 md:space-y-10">

                        {/* Item 1 */}
                        <div className="flex gap-3 md:gap-6 items-start group">
                            <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] bg-[#2D3630] flex items-center justify-center shrink-0 mt-1 transition-colors duration-300 group-hover:bg-[#BF9261]">
                                <svg className="w-3 h-3 md:w-[14px] md:h-[14px]" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[16px] md:text-[24px] text-[#2D3630] font-[var(--font-roboto-serif)] mb-1 md:mb-3">
                                    Regional Heritage
                                </h3>
                                <p className="text-[12px] md:text-[16px] leading-[1.4] md:leading-[1.6] text-[#363636] font-[var(--font-jost)] opacity-80 max-w-[580px]">
                                    Our menu is a map of India. We use traditional "Sil-Batta"
                                    (stone-grinding) techniques to ensure every spice blend retains
                                    its soul and vibrant aroma.
                                </p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex gap-3 md:gap-6 items-start group">
                            <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] bg-[#BF9261] flex items-center justify-center shrink-0 mt-1 transition-colors duration-300 group-hover:bg-[#2D3630]">
                                <svg className="w-3 h-3 md:w-[14px] md:h-[14px]" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[16px] md:text-[24px] text-[#2D3630] font-[var(--font-roboto-serif)] mb-1 md:mb-3">
                                    The Tandoor Art
                                </h3>
                                <p className="text-[12px] md:text-[16px] leading-[1.4] md:leading-[1.6] text-[#363636] font-[var(--font-jost)] opacity-80 max-w-[580px]">
                                    From our smoky Burrah Chops to honey-glazed Mango Malai Tikka,
                                    our charcoal-fired tandoor brings the authentic heat of North
                                    Indian streets to Chelsea.
                                </p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="flex gap-3 md:gap-6 items-start group">
                            <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] bg-[#2D3630] flex items-center justify-center shrink-0 mt-1 transition-colors duration-300 group-hover:bg-[#BF9261]">
                                <svg className="w-3 h-3 md:w-[14px] md:h-[14px]" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[16px] md:text-[24px] text-[#2D3630] font-[var(--font-roboto-serif)] mb-1 md:mb-3">
                                    Coastal Soul
                                </h3>
                                <p className="text-[12px] md:text-[16px] leading-[1.4] md:leading-[1.6] text-[#363636] font-[var(--font-jost)] opacity-80 max-w-[580px]">
                                    Discover the lighter side of the subcontinent with our
                                    Koliwada Prawns and Chettinad Fish Curry, inspired by
                                    the vibrant fishing colonies of the South.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
