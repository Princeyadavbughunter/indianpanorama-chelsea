import type { MetadataRoute } from "next";

const SITE_URL = "https://indianpanoramachelsea.co.uk";

type DynamicEntry = { slug: string; updatedAt?: string };

async function fetchDynamicSlugs(): Promise<DynamicEntry[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];
  try {
    const res = await fetch(`${apiUrl}/api/slugs`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data)
      ? data
          .filter((d: { isPublished?: boolean }) => d.isPublished !== false)
          .map((d: { slug: string; updatedAt?: string }) => ({ slug: d.slug, updatedAt: d.updatedAt }))
      : [];
  } catch {
    return [];
  }
}

async function fetchBlogSlugs(): Promise<DynamicEntry[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];
  try {
    const res = await fetch(`${apiUrl}/api/blogs`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data)
      ? data
          .filter((b: { isPublished?: boolean }) => b.isPublished)
          .map((b: { slug: string; updatedAt?: string }) => ({ slug: b.slug, updatedAt: b.updatedAt }))
      : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/reservation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/group`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const [slugs, blogs] = await Promise.all([fetchDynamicSlugs(), fetchBlogSlugs()]);

  const slugRoutes: MetadataRoute.Sitemap = slugs.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: b.updatedAt ? new Date(b.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...slugRoutes, ...blogRoutes];
}
