import { Jost, Roboto_Serif } from "next/font/google";
import "./globals.css";
import VisitorTracker from "./VisitorTracker";


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
