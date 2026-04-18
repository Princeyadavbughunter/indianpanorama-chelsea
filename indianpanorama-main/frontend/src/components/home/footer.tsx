import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-[#E9E1DC]">
            <div className="max-w-[1512px] min-h-[300px] md:h-[367px] mx-auto flex flex-row justify-between items-center px-4 md:pl-[185px] md:pr-[550px] py-8 md:py-0">

                {/* Left Section: Address & Contact */}
                <div className="flex flex-col gap-4 md:gap-8">
                    <div className="flex flex-col gap-1">
                        <p className="text-[12px] md:text-[16px] leading-[20px] md:leading-[30px] font-normal text-[#2D3630] font-[var(--font-roboto-serif)] tracking-[0.05em] align-middle">
                            149 Draycott Ave, <br />
                            London, SW3 3AL
                        </p>
                    </div>

                    <div>
                        <p className="text-[12px] md:text-[16px] leading-[20px] md:leading-[30px] font-normal text-[#2D3630] font-[var(--font-roboto-serif)] tracking-[0.05em] align-middle">
                            0203 051 4535
                        </p>
                    </div>

                    <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] md:text-[14px] font-[var(--font-jost)] text-[#2D3630]">
                        <Link href="/reservation" className="hover:text-[#BF9261] transition-colors">Reservations</Link>
                        <Link href="/group" className="hover:text-[#BF9261] transition-colors">Private Dining</Link>
                        <Link href="/blog" className="hover:text-[#BF9261] transition-colors">Blog</Link>
                        <Link href="/faq" className="hover:text-[#BF9261] transition-colors">FAQs</Link>
                    </nav>

                    <div className="flex gap-4">
                        {/* Instagram Icon */}
                        <Link href="https://www.instagram.com/indianpanoramachelsea" target="_blank" rel="noopener noreferrer" aria-label="Indian Panorama Chelsea on Instagram" className="text-[#2D3630] hover:text-[#BF9261] transition-colors">
                            <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </Link>

                        {/* Facebook Icon */}
                        <Link href="https://www.facebook.com/indianpanoramachelsea" target="_blank" rel="noopener noreferrer" aria-label="Indian Panorama Chelsea on Facebook" className="text-[#2D3630] hover:text-[#BF9261] transition-colors">
                            <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Right Section: Opening Hours */}
                <div className="flex flex-col justify-center">
                    <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-x-4 md:gap-x-12 gap-y-1 md:gap-y-2 text-[12px] md:text-[16px] leading-[20px] md:leading-[30px] font-normal text-[#2D3630] font-[var(--font-roboto-serif)] tracking-[0.05em] align-middle">
                        <span>Monday</span>
                        <span>5-10:30 pm</span>

                        <span>Tuesday</span>
                        <span>1-10:30 pm</span>

                        <span>Wednesday</span>
                        <span>1-10:30 pm</span>

                        <span>Thursday</span>
                        <span>1-10:30 pm</span>

                        <span>Friday</span>
                        <span>1-10:30 pm</span>

                        <span>Saturday</span>
                        <span>1-10:30 pm</span>

                        <span>Sunday</span>
                        <span>1-10:30 pm</span>

                        <span className="mt-2 md:mt-4 font-medium">Christmas Day</span>
                        <span className="mt-2 md:mt-4 font-medium">12-6pm</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
