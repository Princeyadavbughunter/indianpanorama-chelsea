import React from 'react';
import { notFound } from 'next/navigation';
import Head from 'next/head';

async function getSlugData(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/slugs/path/${slug}`, {
            next: { revalidate: 60 } // Revalidate every minute
        });
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch data');
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
        title: data.metaTitle || data.title,
        description: data.metaDescription || data.description,
    };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getSlugData(slug);

    if (!data || data.status !== 'Published') {
        notFound();
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: data.backgroundColor || '#ffffff',
            color: data.textColor || '#000000',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Hero Section */}
            <div style={{
                padding: '60px 20px',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {data.image && (
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${data.image}`}
                        alt={data.title}
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: '400px',
                            borderRadius: '12px',
                            marginBottom: '32px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                    />
                )}

                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    marginBottom: '16px',
                    lineHeight: 1.2
                }}>
                    {data.title}
                </h1>

                {data.description && (
                    <p style={{
                        fontSize: '1.25rem',
                        opacity: 0.8,
                        marginBottom: '32px',
                        lineHeight: 1.6
                    }}>
                        {data.description}
                    </p>
                )}

                {data.ctaLink && data.ctaText && (
                    <a
                        href={data.ctaLink}
                        style={{
                            display: 'inline-block',
                            padding: '16px 32px',
                            backgroundColor: data.textColor || '#0f172a',
                            color: data.backgroundColor || '#ffffff',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                        }}
                    >
                        {data.ctaText}
                    </a>
                )}
            </div>

            {/* Main Content */}
            {data.content && (
                <div
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '40px 20px',
                        lineHeight: 1.8,
                        fontSize: '1.1rem'
                    }}
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            )}
        </div>
    );
}
