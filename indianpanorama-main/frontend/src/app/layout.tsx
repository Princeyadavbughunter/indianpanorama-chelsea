import { Jost, Roboto_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import VisitorTracker from "./VisitorTracker";
import type { Metadata } from "next";

const GOOGLE_ADS_ID = "AW-17806719928";
const SITE_URL = "https://indianpanoramachelsea.co.uk";

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "Indian Panorama Chelsea",
  alternateName: "Indian Panorama",
  description:
    "Top-rated Indian dining in Chelsea. Authentic regional Indian fine dining on Draycott Avenue, SW3 London. Slow-cooked curries, charcoal-kissed tandoor, signature Raan-e-Panorama and lobster panchphoran.",
  url: SITE_URL,
  telephone: "+442030514535",
  email: "info@indianpanoramachelsea.co.uk",
  image: [
    `${SITE_URL}/images/hero.png`,
    `${SITE_URL}/images/logo2.png`,
  ],
  logo: `${SITE_URL}/images/logo2.png`,
  priceRange: "£££",
  servesCuisine: ["Indian", "North Indian", "Regional Indian", "Tandoori"],
  acceptsReservations: "True",
  address: {
    "@type": "PostalAddress",
    streetAddress: "149 Draycott Avenue",
    addressLocality: "Chelsea",
    addressRegion: "London",
    postalCode: "SW3 3AL",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.4924,
    longitude: -0.1688,
  },
  areaServed: [
    { "@type": "Place", name: "Chelsea" },
    { "@type": "Place", name: "South Kensington" },
    { "@type": "Place", name: "Knightsbridge" },
    { "@type": "Place", name: "Sloane Square" },
    { "@type": "Place", name: "SW3" },
    { "@type": "Place", name: "London" },
  ],
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Indian+Panorama+Chelsea+149+Draycott+Avenue+London+SW3+3AL",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "17:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "13:00",
      closes: "22:30",
    },
  ],
  sameAs: [
    "https://www.instagram.com/indianpanoramachelsea",
    "https://www.facebook.com/indianpanoramachelsea",
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/reservation`,
      inLanguage: "en-GB",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Reserve a table at Indian Panorama Chelsea",
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Indian Panorama Chelsea",
  publisher: { "@id": `${SITE_URL}/#restaurant` },
  inLanguage: "en-GB",
};

export const metadata: Metadata = {
  title: "Indian Restaurant Chelsea | Fine Dining & Lunch | Indian Panorama",
  description:
    "Experience authentic Indian fine dining in the heart of Chelsea. Indian Panorama presents a thoughtfully crafted menu in an elegant atmosphere. Reserve a table.",
  keywords: [
    // Core Location & High-Intent (Local SEO)
    "indian restaurant chelsea london",
    "best indian food sw3",
    "indian dining near draycott avenue",
    "top rated indian restaurant chelsea",
    "fine dining indian london sw3",
    "indian takeaway chelsea delivery",
    "best curry in chelsea london",
    "indian restaurant near sloane square",
    "restaurants near royal hospital chelsea",
    "authentic indian cuisine chelsea",
    // Signature Dishes & Menu Specifics
    "old delhi butter chicken london",
    "authentic chicken malabar chelsea",
    "signature raan-e-panorama",
    "lamb chops tandoori london",
    "best samosa chaat chelsea",
    "lobster panchphoran london sw3",
    "paneer tikka chelsea",
    "authentic lamb biryani chelsea",
    "slow cooked dal makhani london",
    "indian small plates chelsea",
    // Lifestyle, Dietary & Atmosphere
    "halal indian restaurant chelsea",
    "vegan friendly indian food london",
    "gluten free indian dishes sw3",
    "romantic indian dinner chelsea",
    "indian restaurant with outdoor seating london",
    "luxury indian dining experience chelsea",
    "family friendly indian restaurant chelsea",
    "modern indian restaurant london sw3",
    "indian business lunch chelsea",
    "stylish indian cocktail bar chelsea",
    // Event-Based & Seasonal
    "chelsea flower show dinner reservations",
    "best restaurants near royal hospital road",
    "london marathon post race meal chelsea",
    "christmas party venue chelsea indian",
    "group dining chelsea restaurants",
    "private dining indian restaurant chelsea",
    "indian catering services chelsea",
    "weekend brunch chelsea indian",
    "pre-theatre dinner chelsea london",
    "indian afternoon tea chelsea",
    // Competitor & Broad Category
    "indian food london hidden gems",
    "best indian restaurants in west london",
    "top curry houses south west london",
    "gourmet indian food chelsea",
    "regional indian cuisine london",
    "traditional tandoori restaurant chelsea",
    "upscale indian food london",
    "best indian thali chelsea",
    "fusion indian restaurant london",
    "indian panorama chelsea reviews",
  ],
  authors: [{ name: "Indian Panorama Chelsea" }],
  creator: "Indian Panorama Chelsea",
  publisher: "Indian Panorama Chelsea",
  metadataBase: new URL("https://indianpanoramachelsea.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://indianpanoramachelsea.co.uk",
    siteName: "Indian Panorama Chelsea",
    title: "Indian Restaurant Chelsea | Fine Dining & Lunch | Indian Panorama",
    description:
      "Experience authentic Indian fine dining in the heart of Chelsea. Indian Panorama presents a thoughtfully crafted menu in an elegant atmosphere. Reserve a table.",
    images: [
      {
        url: "/images/hero.png",
        width: 1536,
        height: 1024,
        alt: "Indian Panorama Chelsea — authentic regional Indian fine dining on Draycott Avenue, SW3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Restaurant Chelsea | Fine Dining & Lunch | Indian Panorama",
    description:
      "Experience authentic Indian fine dining in the heart of Chelsea. Indian Panorama presents a thoughtfully crafted menu in an elegant atmosphere. Reserve a table.",
    images: [
      {
        url: "/images/hero.png",
        alt: "Indian Panorama Chelsea — authentic regional Indian fine dining on Draycott Avenue, SW3",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "OcqTiDgN8MAd7o98VZgENF8UaZk9_3l9cXt-68fgcOU",
  },
  // Icons auto-generated from src/app/icon.png and src/app/apple-icon.png
};


const jost = Jost({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jost",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-roboto-serif",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jost.variable} ${robotoSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>

        {/* Google Translate — multilingual support */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,fr,es,it,ar,zh-CN',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            };
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
