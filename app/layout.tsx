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
  title: "River Craft",
  description: "Discover unique handcrafted items",
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
