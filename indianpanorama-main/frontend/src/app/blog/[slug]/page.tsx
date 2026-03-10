import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import { notFound } from "next/navigation";

interface BlogPostProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;

    let post = null;
    try {
        const res = await fetch(`https://api.indianpanoramachelsea.co.uk/api/blogs/slug/${slug}`, {
            cache: 'no-store'
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
        year: 'numeric'
    });

    return (
        <main className="min-h-screen bg-[#E9E1DC]">
            <Header />

            <article className="max-w-[800px] mx-auto px-4 py-24 md:py-32">
                {/* Back button */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-[#BF9261] hover:text-[#2D3630] transition-colors mb-12 font-[var(--font-jost)] text-[14px] font-medium tracking-wide">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    BACK TO BLOGS
                </Link>

                {/* Header Section */}
                <header className="mb-12">
                    <p className="text-[#BF9261] tracking-[2px] text-[12px] md:text-[14px] uppercase font-[var(--font-jost)] mb-4">INDIAN PANORAMA BLOG</p>
                    <h1 className="text-[40px] md:text-[56px] leading-[1.1] text-[#2D3630] font-serif mb-8 algin-middle">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-[#666666] font-[var(--font-jost)] text-[14px]">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#363636]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
                            {formattedDate}
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#363636]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                            {post.author || 'Admin'}
                        </div>
                    </div>
                </header>

                {/* Main Feature Image */}
                {post.image && (
                    <div className="relative w-full aspect-[16/9] mb-16 overflow-hidden rounded-sm">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Blog Content */}
                <div className="prose prose-lg max-w-none text-[#363636] font-[var(--font-jost)] leading-[1.8]">
                    {/* Assuming content might contain markup, parsing dangerously or just rendering text based on admin setup */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </article>

            <Footer />
        </main>
    );
}
