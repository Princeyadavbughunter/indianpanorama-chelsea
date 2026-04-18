import { notFound } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/footer';

type BookingButton = {
    label: string;
    url: string;
    style?: 'gold' | 'outline' | 'opentable' | 'sevenrooms' | 'deliveroo';
};

type SlugData = {
    _id: string;
    title: string;
    slug: string;
    heroSubtitle?: string;
    description?: string;
    content?: string;
    image?: string;
    status: 'Draft' | 'Published';
    bookingButtons?: BookingButton[];
    metaTitle?: string;
    metaDescription?: string;

    // Legacy (old records)
    ctaText?: string;
    ctaLink?: string;
};

async function getSlugData(slug: string): Promise<SlugData | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/slugs/path/${slug}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching slug:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getSlugData(slug);
    if (!data) return { title: 'Page Not Found' };
    return {
        title: data.metaTitle || `${data.title} — Indian Panorama Chelsea`,
        description: data.metaDescription || data.description,
    };
}

const BUTTON_STYLES: Record<NonNullable<BookingButton['style']>, React.CSSProperties> = {
    gold: { background: '#CBAC70', color: '#161d18', border: '1px solid #CBAC70' },
    outline: { background: 'transparent', color: '#161d18', border: '1px solid #161d18' },
    opentable: { background: '#DA3743', color: '#fff', border: '1px solid #DA3743' },
    sevenrooms: { background: '#0056b3', color: '#fff', border: '1px solid #0056b3' },
    deliveroo: { background: '#00CCBC', color: '#fff', border: '1px solid #00CCBC' },
};

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getSlugData(slug);

    if (!data || data.status !== 'Published') {
        notFound();
    }

    // Merge legacy single CTA into the buttons array so old records still render.
    const buttons: BookingButton[] = [
        ...(data.bookingButtons ?? []),
        ...(data.ctaText && data.ctaLink && !data.bookingButtons?.length
            ? [{ label: data.ctaText, url: data.ctaLink, style: 'gold' as const }]
            : []),
    ];

    const imageSrc = data.image
        ? (data.image.startsWith('http') ? data.image : `${process.env.NEXT_PUBLIC_API_URL}${data.image}`)
        : null;

    return (
        <main className="min-h-screen bg-[#161d18]">
            <Header />

            {/* Hero */}
            <section
                className="relative w-full overflow-hidden mt-[94px] flex items-center justify-center"
                style={{
                    minHeight: '58vh',
                    background: imageSrc
                        ? `linear-gradient(rgba(22,29,24,0.7), rgba(22,29,24,0.85)), url('${imageSrc}') center/cover no-repeat`
                        : 'linear-gradient(135deg, #1f2a24 0%, #161d18 60%, #0f1511 100%)',
                }}
            >
                <div className="relative z-10 text-center px-6 md:px-20 py-20 md:py-28 max-w-4xl">
                    <span
                        className="font-serif text-[#CBAC70] text-[11px] md:text-[13px] uppercase inline-flex items-center gap-3 mb-5"
                        style={{ letterSpacing: '0.38em' }}
                    >
                        <span className="h-px w-8 md:w-12 bg-[#CBAC70]" />
                        Chelsea · London
                        <span className="h-px w-8 md:w-12 bg-[#CBAC70]" />
                    </span>

                    <h1
                        className="font-serif text-[#f5ecd8] text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        style={{ letterSpacing: '0.03em' }}
                    >
                        {data.title}
                    </h1>

                    {data.heroSubtitle && (
                        <p
                            className="font-serif italic text-[#CBAC70] text-[17px] md:text-[21px] mt-6"
                            style={{ letterSpacing: '0.04em' }}
                        >
                            {data.heroSubtitle}
                        </p>
                    )}
                </div>
            </section>

            {/* Content card — overlaps hero */}
            <section className="relative z-10 px-4 md:px-8" style={{ marginTop: '-70px' }}>
                <div
                    className="max-w-[1000px] mx-auto bg-[#fbf7ef] text-[#1f2a24] shadow-[0_30px_60px_rgba(0,0,0,0.25)] px-6 md:px-14 py-12 md:py-16"
                    style={{
                        borderTop: '4px solid #CBAC70',
                    }}
                >
                    {data.description && (
                        <div className="text-center max-w-2xl mx-auto">
                            <p
                                className="font-serif text-[17px] md:text-[19px] leading-relaxed text-[#2c3e33]"
                                style={{ letterSpacing: '0.01em' }}
                            >
                                {data.description}
                            </p>
                        </div>
                    )}

                    {/* Booking buttons grid */}
                    {buttons.length > 0 && (
                        <div
                            className="grid gap-3 md:gap-4 mt-10 max-w-3xl mx-auto"
                            style={{
                                gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
                            }}
                        >
                            {buttons.map((btn, i) => {
                                const styleKey = (btn.style ?? 'gold') as keyof typeof BUTTON_STYLES;
                                const style = BUTTON_STYLES[styleKey] ?? BUTTON_STYLES.gold;
                                return (
                                    <a
                                        key={i}
                                        href={btn.url}
                                        target={btn.url.startsWith('http') ? '_blank' : undefined}
                                        rel={btn.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="font-serif uppercase text-center transition-all duration-300 hover:opacity-90 hover:-translate-y-[1px]"
                                        style={{
                                            ...style,
                                            padding: '16px 22px',
                                            fontSize: '12.5px',
                                            letterSpacing: '0.18em',
                                            fontWeight: 700,
                                            display: 'block',
                                        }}
                                    >
                                        {btn.label}
                                    </a>
                                );
                            })}
                        </div>
                    )}

                    {/* Main HTML content */}
                    {data.content && (
                        <article
                            className="slug-content max-w-3xl mx-auto mt-12 text-[#1f2a24] font-serif"
                            style={{
                                fontSize: '17px',
                                lineHeight: 1.85,
                            }}
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    )}

                    {/* Divider + signature */}
                    <div className="flex items-center justify-center gap-3 mt-14 text-[#CBAC70]">
                        <span className="h-px w-10 bg-[#CBAC70]" />
                        <span
                            className="font-serif italic text-sm"
                            style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
                        >
                            Indian Panorama
                        </span>
                        <span className="h-px w-10 bg-[#CBAC70]" />
                    </div>
                </div>
            </section>

            <div className="mt-20">
                <Footer />
            </div>

            <style>
                {`
                .slug-content h1, .slug-content h2, .slug-content h3 {
                    color: #161d18;
                    font-family: serif;
                    letter-spacing: 0.01em;
                    margin-top: 1.6em;
                    margin-bottom: 0.5em;
                }
                .slug-content h1 { font-size: 2rem; }
                .slug-content h2 { font-size: 1.55rem; }
                .slug-content h3 { font-size: 1.25rem; }
                .slug-content p { margin: 0 0 1em 0; }
                .slug-content a { color: #b08f55; text-decoration: underline; }
                .slug-content ul, .slug-content ol { padding-left: 1.4em; margin: 1em 0; }
                .slug-content li { margin-bottom: 0.4em; }
                .slug-content strong { color: #161d18; }
                .slug-content img { max-width: 100%; height: auto; margin: 1.4em 0; }
                .slug-content blockquote {
                    border-left: 3px solid #CBAC70;
                    padding: 0.4em 1.2em;
                    margin: 1.4em 0;
                    font-style: italic;
                    color: #2c3e33;
                    background: rgba(203,172,112,0.06);
                }
                `}
            </style>
        </main>
    );
}
