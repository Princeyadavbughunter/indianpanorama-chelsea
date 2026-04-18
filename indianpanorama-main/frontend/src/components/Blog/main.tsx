import Link from "next/link";

type Post = {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    author: string;
    image: string;
};

const resolveImage = (raw: string | undefined, fallback: string) => {
    if (!raw) return fallback;
    if (raw.startsWith('http')) return raw;
    if (raw.startsWith('/uploads')) return `${process.env.NEXT_PUBLIC_API_URL}${raw}`;
    return raw;
};

export default async function Main() {
    let blogPosts: Post[] = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            blogPosts = data.filter((b: any) => b.isPublished).map((post: any, index: number) => ({
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt || '',
                date: new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                author: post.author || 'Admin',
                image: resolveImage(post.image, `/blog/blog${(index % 3) + 1}.png`),
            }));
        }
    } catch (err) {
        console.error("Failed to fetch blogs", err);
    }

    const [featured, ...rest] = blogPosts;

    return (
        <section className="bg-[#E9E1DC] overflow-hidden">

            {/* ─── Split intro: flame photo + welcome copy ─── */}
            <div className="w-full flex items-stretch flex-col md:flex-row pt-16 md:pt-24">
                <div className="w-full md:w-1/2 relative shrink-0 overflow-hidden min-h-[360px] md:min-h-[560px]">
                    <img
                        src="/blog/blog.jpeg"
                        alt="Flame-kissed tandoor at Indian Panorama Chelsea on Draycott Avenue, SW3"
                        width={1200}
                        height={1200}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2
                            className="text-[60px] md:text-[104px] text-white font-serif leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                            style={{ letterSpacing: '0.02em' }}
                        >
                            Blog
                        </h2>
                    </div>
                </div>

                <div className="w-full md:w-1/2 py-14 md:py-24 px-6 md:pl-16 md:pr-16 lg:pr-24 flex flex-col justify-center">
                    <p className="text-[12px] md:text-[13px] tracking-[0.22em] text-[#BF9261] font-[var(--font-jost)] uppercase mb-5">
                        Inspired by you
                    </p>

                    <h2 className="text-[38px] md:text-[54px] leading-[1.08] font-medium text-[#2D3630] font-serif mb-7">
                        Experience quality <span className="italic text-[#BF9261]">at its best</span>
                    </h2>

                    <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#363636]/85 font-[var(--font-jost)] mb-8 max-w-[560px]">
                        Discover Indian Panorama Chelsea — a quiet destination for authentic regional
                        Indian fine dining in the heart of SW3. Minutes from South Kensington,
                        Knightsbridge, Harrods, Sloane Square and Hyde Park. Slow-cooked curries,
                        charcoal-kissed tandoor, and seasonal vegetarian menus.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/reservation"
                            className="inline-flex items-center gap-2 bg-[#BF9261] text-white font-[var(--font-jost)] text-[12px] tracking-[0.18em] uppercase font-semibold px-6 py-3 hover:bg-[#2D3630] transition-colors"
                        >
                            Reserve a table
                        </Link>
                        <span className="font-[var(--font-jost)] text-[13px] text-[#666666]">
                            · or read our latest notes below
                        </span>
                    </div>
                </div>
            </div>

            {/* ─── Articles section ─── */}
            <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-16 md:py-24">

                {/* Section heading */}
                <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14 border-b border-[#2D3630]/15 pb-6">
                    <div>
                        <p className="text-[11px] md:text-[12px] tracking-[0.22em] text-[#BF9261] font-[var(--font-jost)] uppercase mb-3">
                            The Journal
                        </p>
                        <h2 className="text-[30px] md:text-[40px] font-serif text-[#2D3630] leading-[1.15]">
                            Latest Articles
                        </h2>
                    </div>
                    {blogPosts.length > 0 && (
                        <span className="font-[var(--font-jost)] text-[13px] text-[#666666]">
                            {blogPosts.length} {blogPosts.length === 1 ? 'story' : 'stories'}
                        </span>
                    )}
                </div>

                {blogPosts.length === 0 ? (
                    <div className="text-center py-20 font-[var(--font-jost)] text-[#666666]">
                        <p>No articles yet. Check back soon.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured (first post) — large horizontal card */}
                        {featured && (
                            <Link href={`/blog/${featured.slug}`} className="group block mb-14 md:mb-20">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white shadow-[0_20px_50px_rgba(45,54,48,0.08)] overflow-hidden">
                                    <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-[#2D3630]/10">
                                        <img
                                            src={featured.image}
                                            alt={featured.title}
                                            width={1200}
                                            height={900}
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#BF9261] text-white text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 font-[var(--font-jost)] font-semibold">
                                            Featured
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 text-[13px] font-[var(--font-jost)] text-[#666666] mb-4">
                                            <span className="flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-[#BF9261]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
                                                {featured.date}
                                            </span>
                                            <span className="w-[1px] h-3 bg-[#BF9261]/40" />
                                            <span className="flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-[#BF9261]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                                                {featured.author}
                                            </span>
                                        </div>

                                        <h3 className="text-[26px] md:text-[34px] leading-[1.15] font-serif text-[#2D3630] group-hover:text-[#BF9261] transition-colors mb-5">
                                            {featured.title}
                                        </h3>

                                        {featured.excerpt && (
                                            <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#363636]/85 font-[var(--font-jost)] mb-7 line-clamp-4">
                                                {featured.excerpt}
                                            </p>
                                        )}

                                        <span className="inline-flex items-center gap-2 text-[#BF9261] font-[var(--font-jost)] text-[12px] tracking-[0.18em] uppercase font-semibold">
                                            Read the story
                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Rest — card grid */}
                        {rest.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                {rest.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group block bg-white shadow-[0_10px_30px_rgba(45,54,48,0.05)] hover:shadow-[0_20px_40px_rgba(45,54,48,0.12)] transition-shadow overflow-hidden"
                                    >
                                        <div className="relative overflow-hidden aspect-[16/10] bg-[#2D3630]/10">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                width={1200}
                                                height={750}
                                                loading="lazy"
                                                decoding="async"
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 text-[12px] font-[var(--font-jost)] text-[#666666] mb-3">
                                                <span>{post.date}</span>
                                                <span className="w-[1px] h-3 bg-[#BF9261]/40" />
                                                <span>{post.author}</span>
                                            </div>
                                            <h3 className="text-[19px] md:text-[20px] leading-[1.25] font-serif font-medium text-[#2D3630] group-hover:text-[#BF9261] transition-colors mb-3">
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="text-[14px] leading-[1.65] text-[#363636]/80 font-[var(--font-jost)] line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <span className="inline-flex items-center gap-1.5 mt-5 text-[#BF9261] font-[var(--font-jost)] text-[11px] tracking-[0.18em] uppercase font-semibold">
                                                Read more
                                                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
