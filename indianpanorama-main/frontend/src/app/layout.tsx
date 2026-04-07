import { Jost, Roboto_Serif } from "next/font/google";
import "./globals.css";
import VisitorTracker from "./VisitorTracker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indian Panorama Chelsea",
  description: "Authentic Indian cuisine in the heart of Chelsea, London.",
  verification: {
    google: "OcqTiDgN8MAd7o98VZgENF8UaZk9_3l9cXt-68fgcOU",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.png",
  },
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
      <body className="antialiased">
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
