import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import { notFound } from "next/navigation";

interface BlogPostProps {
    params: Promise<{
        slug: string;
    }>;
}

const SITE_URL = "https://indianpanoramachelsea.co.uk";

const resolveImageUrl = (raw?: string) => {
    if (!raw) return `${SITE_URL}/images/hero.png`;
    if (raw.startsWith('http')) return raw;
    return `${process.env.NEXT_PUBLIC_API_URL ?? ''}${raw}`;
};

export async function generateMetadata({ params }: BlogPostProps) {
    const { slug } = await params;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/slug/${slug}`, {
            cache: 'no-store',
        });
        if (!res.ok) return { title: 'Blog Post — Indian Panorama Chelsea' };
        const post = await res.json();
        const title = `${post.title} — Indian Panorama Chelsea`;
        const description = post.excerpt || `Read "${post.title}" on the Indian Panorama Chelsea blog — stories from our kitchen on Draycott Avenue, SW3.`;
        const image = resolveImageUrl(post.image);
        return {
            title,
            description,
            alternates: { canonical: `/blog/${slug}` },
            openGraph: {
                type: 'article',
                title,
                description,
                url: `${SITE_URL}/blog/${slug}`,
                images: [{ url: image, alt: post.title }],
                publishedTime: post.createdAt,
                modifiedTime: post.updatedAt || post.createdAt,
                authors: [post.author || 'Indian Panorama Chelsea'],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [image],
            },
        };
    } catch {
        return { title: 'Blog Post — Indian Panorama Chelsea' };
    }
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;

    let post = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/slug/${slug}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            if (res.status === 404) return notFound();
            throw new Error('Failed to fetch blog post');
        }
        post = await res.json();
    } catch (err) {
        console.error("Error fetching blog post", err);
        return (
            <main className="min-h-screen bg-[#E9E1DC] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl text-[#2D3630] font-serif mb-4">Unable to load blog post</h1>
                    <Link href="/blog" className="text-[#BF9261] hover:underline">Return to Blogs</Link>
                </div>
            </main>
        );
    }

    if (!post) return notFound();

    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const imageSrc = post.image
        ? (post.image.startsWith('http') ? post.image : `${process.env.NEXT_PUBLIC_API_URL}${post.image}`)
        : null;

    const jsonLdImage = imageSrc || `${SITE_URL}/images/hero.png`;

    const blogPostingJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
        headline: post.title,
        description: post.excerpt || post.title,
        image: [jsonLdImage],
        datePublished: post.createdAt,
        dateModified: post.updatedAt || post.createdAt,
        author: {
            "@type": "Person",
            name: post.author || "Indian Panorama Chelsea",
        },
        publisher: {
            "@type": "Organization",
            name: "Indian Panorama Chelsea",
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/images/logo2.png`,
            },
        },
        inLanguage: "en-GB",
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-[#E9E1DC]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Header />

            {/* Top spacer so content clears the fixed header */}
            <div className="pt-[94px]" />

            <article className="max-w-[820px] mx-auto px-5 md:px-6 py-14 md:py-20">

                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[#BF9261] hover:text-[#2D3630] transition-colors mb-10 font-[var(--font-jost)] text-[13px] font-medium tracking-[0.12em]"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    BACK TO BLOGS
                </Link>

                {/* Article header */}
                <header className="mb-10 md:mb-12">
                    <p className="text-[#BF9261] tracking-[0.22em] text-[11px] md:text-[12px] uppercase font-[var(--font-jost)] mb-5">
                        Indian Panorama Blog
                    </p>
                    <h1 className="text-[34px] md:text-[52px] leading-[1.12] text-[#2D3630] font-serif mb-8">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-5 text-[#666666] font-[var(--font-jost)] text-[13px]">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#BF9261]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                            </svg>
                            {formattedDate}
                        </div>
                        <span className="w-[1px] h-3 bg-[#BF9261]/40" />
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#BF9261]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                            </svg>
                            {post.author || 'Admin'}
                        </div>
                    </div>

                    {/* Gold rule */}
                    <div className="mt-10 h-[1px] bg-gradient-to-r from-[#BF9261]/60 via-[#BF9261]/30 to-transparent" />
                </header>

                {/* Hero image — plain <img> so we never get blocked by next/Image config */}
                {imageSrc && (
                    <figure className="w-full aspect-[16/9] mb-12 overflow-hidden rounded-sm shadow-[0_20px_40px_rgba(45,54,48,0.12)] bg-[#2D3630]/5">
                        <img
                            src={imageSrc}
                            alt={post.title}
                            width={1600}
                            height={900}
                            className="w-full h-full object-cover"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                        />
                    </figure>
                )}

                {/* Optional excerpt — shown as a pull-intro before the content */}
                {post.excerpt && (
                    <p
                        className="text-[17px] md:text-[19px] leading-[1.7] text-[#2D3630]/85 font-[var(--font-jost)] italic font-medium mb-10"
                        style={{ fontFamily: 'serif' }}
                    >
                        {post.excerpt}
                    </p>
                )}

                {/* Blog Content */}
                <div
                    className="blog-content text-[#363636] font-[var(--font-jost)]"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer mark */}
                <div className="flex items-center justify-center gap-3 mt-16 text-[#BF9261]">
                    <span className="h-px w-10 bg-[#BF9261]" />
                    <span className="text-[11px] tracking-[0.22em] uppercase font-[var(--font-jost)] font-medium">
                        Indian Panorama Chelsea
                    </span>
                    <span className="h-px w-10 bg-[#BF9261]" />
                </div>
            </article>

            <Footer />

            {/* Content styling — scoped to .blog-content so we can't leak into the rest of the site. */}
            <style>{`
                .blog-content { font-size: 16px; line-height: 1.85; }
                @media (min-width: 768px) {
                    .blog-content { font-size: 17px; line-height: 1.9; }
                }

                .blog-content p {
                    margin: 0 0 1.15em 0;
                }

                .blog-content h1,
                .blog-content h2,
                .blog-content h3,
                .blog-content h4 {
                    color: #2D3630;
                    font-family: 'Times New Roman', Georgia, serif;
                    font-weight: 500;
                    letter-spacing: -0.005em;
                    line-height: 1.2;
                }
                .blog-content h1 { font-size: 2.1rem; margin: 1.6em 0 0.55em; }
                .blog-content h2 { font-size: 1.7rem; margin: 1.75em 0 0.6em; }
                .blog-content h3 { font-size: 1.32rem; margin: 1.6em 0 0.55em; }
                .blog-content h4 { font-size: 1.1rem;  margin: 1.4em 0 0.45em; }

                .blog-content h2::before {
                    content: '';
                    display: block;
                    width: 36px;
                    height: 2px;
                    background: #BF9261;
                    margin: 0 0 14px;
                }

                .blog-content ul,
                .blog-content ol {
                    margin: 1.1em 0 1.4em 0;
                    padding-left: 1.4em;
                }
                .blog-content ul { list-style: none; padding-left: 0; }
                .blog-content ul li {
                    position: relative;
                    padding-left: 1.6em;
                    margin-bottom: 0.65em;
                }
                .blog-content ul li::before {
                    content: '';
                    position: absolute;
                    top: 0.85em;
                    left: 0;
                    width: 10px;
                    height: 1px;
                    background: #BF9261;
                }
                .blog-content ol li { margin-bottom: 0.5em; padding-left: 0.2em; }

                .blog-content strong {
                    color: #2D3630;
                    font-weight: 600;
                }

                .blog-content em, .blog-content i {
                    color: #2D3630;
                    font-style: italic;
                }

                .blog-content a {
                    color: #BF9261;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    text-decoration-thickness: 1px;
                }
                .blog-content a:hover { color: #2D3630; }

                .blog-content blockquote {
                    border-left: 3px solid #BF9261;
                    margin: 2em 0;
                    padding: 0.35em 0 0.35em 1.5em;
                    font-style: italic;
                    color: #2D3630;
                    font-family: 'Times New Roman', Georgia, serif;
                    font-size: 1.25em;
                    line-height: 1.55;
                    background: linear-gradient(90deg, rgba(191,146,97,0.06), transparent 70%);
                }

                .blog-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 4px;
                    margin: 1.8em 0;
                }

                .blog-content hr {
                    border: 0;
                    height: 1px;
                    background: rgba(45,54,48,0.15);
                    margin: 2.5em 0;
                }

                .blog-content code {
                    background: rgba(45,54,48,0.06);
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-size: 0.92em;
                    color: #2D3630;
                }
            `}</style>
        </main>
    );
}
