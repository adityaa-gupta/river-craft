import type { Metadata } from "next";
import { Inter, Give_You_Glory } from "next/font/google";
import "./globals.css";

// Configure the Inter font (already in use)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Add the Give You Glory font
const giveYouGlory = Give_You_Glory({
  weight: "400", // Only available in 400 weight
  subsets: ["latin"],
  display: "swap",
  variable: "--font-give-you-glory",
});

export const metadata: Metadata = {
  title: "Sonoj Arts - Handcrafted Art & Craft Items",
  description:
    "Explore Sonoj Arts' exclusive collection of handmade mirrors, paintings, nameplates, and canvases. Each piece is a unique work of art, crafted with love and precision to bring elegance to your space.",
  keywords: [
    "handcrafted art",
    "handmade craft items",
    "artisanal mirrors",
    "custom nameplates",
    "unique paintings",
    "handmade canvases",
    "home decor",
    "handicraft items",
    "art and craft for home",
    "Sonoj Arts",
  ],
  openGraph: {
    title: "Sonoj Arts - Handcrafted Art & Craft Items",
    description:
      "Explore Sonoj Arts' exclusive collection of handmade mirrors, paintings, nameplates, and canvases. Each piece is a unique work of art, crafted with love and precision to bring elegance to your space.",
    url: "https://www.sonoj-art-and-craft.com/",
    siteName: "Sonoj Arts",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Sonoj Arts - Handcrafted Art & Craft Items",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonoj Arts - Handcrafted Art & Craft Items",
    description:
      "Discover the beauty of handcrafted art and craft items at Sonoj Arts. Explore unique handmade mirrors, paintings, nameplates, and canvases, each crafted with passion and precision.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${giveYouGlory.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
