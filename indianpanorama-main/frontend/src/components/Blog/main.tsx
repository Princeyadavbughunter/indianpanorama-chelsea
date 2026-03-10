
import Image from "next/image";
import Link from "next/link";

export default async function Main() {
    let blogPosts = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            // Map the backend fields to what the UI expects
            blogPosts = data.filter((b: any) => b.isPublished).map((post: any, index: number) => ({
                title: post.title,
                slug: post.slug,
                date: new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                author: post.author || 'Admin',
                image: post.image || `/blog/blog${(index % 3) + 1}.png` // Fallback placeholder logic
            }));
        }
    } catch (err) {
        console.error("Failed to fetch blogs", err);
    }

    return (
        <section className="bg-[#E9E1DC] overflow-hidden">
            <div className="w-full flex md:gap-[0px] items-stretch flex-col md:flex-row">

                {/* LEFT IMAGE with Overlay */}
                <div className="w-full md:w-1/2 relative shrink-0 group overflow-hidden rounded-none min-h-[500px] md:min-h-full">
                    <Image
                        src="/blog/blog.jpeg"
                        alt="Blog Feature"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Centered Blog Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-[60px] md:text-[100px] text-white font-serif leading-none">
                            Blog
                        </h2>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full md:w-1/2 py-[60px] md:py-[120px] px-4 md:pl-[80px] md:pr-20">
                    {/* Small Heading */}
                    <p className="text-[10px] md:text-[16px] tracking-[1px] text-[#BF9261] font-[var(--font-jost)] mb-2 md:mb-4">
                        Inspired by you
                    </p>

                    {/* Main Heading */}
                    <h2 className="text-[40px] md:text-[64px] leading-[54px] md:leading-[64px] tracking-normal font-medium text-[#2D3630] font-serif mb-8 md:mb-8 align-middle">
                        Experience quality at its best
                    </h2>

                    {/* Description */}
                    <p className="text-[14px] md:text-[16px] leading-[1.6] text-[#363636] font-[var(--font-jost)] font-medium opacity-80 mb-12 max-w-[600px]">
                        Discover Indian Panorama Chelsea — the hidden gem for authentic regional Indian fine
                        dining in the heart of Chelsea, London. Just minutes from South Kensington,
                        Knightsbridge, Harrods, Sloane Square, Hyde Park, and Victoria. Enjoy flavorful curries,
                        tandoori grills, and healthy options. Book your table today!
                    </p>

                    {/* Blog Posts List */}
                    <div className="space-y-10">
                        {blogPosts.map((post: any, index: number) => (
                            <div key={index}>
                                <Link href={`/blog/${post.slug}`} className="group cursor-pointer block">
                                    <div className="flex gap-6 items-center">
                                        {/* Thumbnail */}
                                        <div className="relative w-[120px] h-[80px] shrink-0 overflow-hidden rounded-sm">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 text-[12px] md:text-[16px] leading-[16px] md:leading-[24px] tracking-normal font-normal text-[#666666] mb-2 font-[var(--font-jost)] align-middle">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-3 h-3 md:w-4 md:h-4 text-[#363636]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
                                                    {post.date}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-3 h-3 md:w-4 md:h-4 text-[#363636]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                                                    {post.author}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center bg-transparent">
                                                <h3 className="text-[18px] md:text-[24px] leading-[22px] md:leading-[28.8px] tracking-normal font-medium text-[#2D3630] font-serif group-hover:text-[#BF9261] transition-colors align-middle">
                                                    {post.title}
                                                </h3>
                                                <div className="w-8 h-8 rounded-full border border-[#2D3630]/20 flex items-center justify-center group-hover:bg-[#BF9261] group-hover:border-[#BF9261] group-hover:text-white transition-all">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                {index !== blogPosts.length - 1 && (
                                    <div className="h-[1px] bg-[#CBAC70] mt-10 opacity-30"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
