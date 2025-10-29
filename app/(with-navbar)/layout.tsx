"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
// Import the Playfair Display font instead
import { Lato, Playfair_Display } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

// Initialize the font with multiple weights for flexibility
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  // Include multiple weights for different use cases
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const paths = [
  { name: "Home", path: "/home" },
  { name: "Discover", path: "/" },
  { name: "About", path: "/about" },
];

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen w-screen h-screen bg-gray-50 relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm h-16">
        <div className="relative">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex items-center space-x-2">
                <div className="relative h-12 w-12"></div>
                {/* Apply the Playfair Display font */}
                <span
                  className={`font-extrabold text-2xl tracking-wide ${playfairDisplay.className}`}
                  style={{
                    background:
                      "linear-gradient(to right, #8B0000 0%, #DAA520 30%, #8B4513 60%, #B8860B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    // textFillColor: "transparent",
                    filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.15))",
                  }}
                >
                  Sonoj Arts
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <div className="sm:flex sm:space-x-6">
                {paths.map((pathOption) => (
                  <Link
                    key={pathOption.path}
                    href={pathOption.path}
                    className={`group inline-flex ${lato.className} items-center px-3 py-2 text-base font-medium transition-all duration-300 relative`}
                  >
                    {/* Base text that's always visible */}
                    <span
                      className={`relative ${
                        pathname === pathOption.path
                          ? "text-transparent"
                          : "text-gray-700 "
                      } transition-colors duration-300`}
                    >
                      {pathOption.name}
                    </span>

                    {/* Gold gradient text overlay - becomes visible on hover/active */}
                    <span
                      className="absolute inset-0 flex items-center"
                      style={{
                        background:
                          "linear-gradient(to right, #8B0000 0%, #DAA520 30%, #8B4513 60%, #B8860B 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        opacity: pathname === pathOption.path ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      {pathOption.name}
                    </span>

                    {/* Animated underline with gold gradient */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full transform origin-left transition-transform duration-300 ease-out
                    ${
                      pathname === pathOption.path
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                      style={{
                        background:
                          "linear-gradient(to right, #8B0000, #DAA520, #8B4513, #B8860B)",
                      }}
                    ></span>
                  </Link>
                ))}
              </div>

              {/* Contact Us button */}
              <a
                href="/about#contact-section"
                className="ml-3 px-4 py-1.5 mr-8 rounded-md text-white text-sm font-medium transition-all duration-300 shadow hover:shadow-md"
                style={{
                  background: "linear-gradient(to right, #8B0000, #DAA520)",
                  textShadow: "0px 1px 1px rgba(0,0,0,0.1)",
                }}
              >
                Contact Us
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-teal-600 hover:bg-gray-100 transition-colors duration-200"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle main menu"
              >
                <svg
                  className={`h-6 w-6 transition-transform duration-200 ${
                    isMobileMenuOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`sm:hidden transition-all duration-200 ease-in-out relative ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/90 shadow-md rounded-b-lg">
            <div className="pt-2 pb-3 space-y-0.5 relative">
              {paths.map((pathOption) => (
                <Link
                  key={pathOption.path}
                  href={pathOption.path}
                  className={`group relative block px-4 py-3 text-base font-medium ${
                    lato.className
                  } transition-all duration-200 overflow-hidden
                    ${pathname === pathOption.path ? "bg-amber-50" : ""}`}
                >
                  <span
                    className={`relative ${
                      pathname === pathOption.path
                        ? "text-transparent"
                        : "text-gray-700 group-hover:text-transparent"
                    } transition-colors duration-300`}
                  >
                    {pathOption.name}
                  </span>

                  {/* Gold gradient text */}
                  <span
                    className="absolute inset-0 flex items-center px-4 py-3"
                    style={{
                      background:
                        "linear-gradient(to right, #8B0000 0%, #DAA520 30%, #8B4513 60%, #B8860B 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      opacity: pathname === pathOption.path ? 1 : 0,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    {pathOption.name}
                  </span>

                  {/* Vertical accent line for active item */}
                  {pathname === pathOption.path && (
                    <span
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{
                        background:
                          "linear-gradient(to bottom, #8B0000, #DAA520)",
                      }}
                    ></span>
                  )}
                </Link>
              ))}
            </div>
            {/* Add a contact button to mobile menu */}
            <div className="px-4 py-3 border-t border-gray-100">
              <Link
                href="/about#contact-section"
                className="block w-full py-2 px-4 rounded text-center transition-all duration-300"
                style={{
                  background: "linear-gradient(to right, #8B0000, #DAA520)",
                  color: "white",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <Suspense fallback={<div>Loading...</div>}>
        <main className="flex-1 pt-16 pb-24 relative z-10">{children}</main>
      </Suspense>
      {/* Footer */}
      <Footer playfairDisplay={playfairDisplay} />
    </div>
  );
}

function Footer({ playfairDisplay }: { playfairDisplay: NextFont }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/80 backdrop-blur-lg relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-9 w-9">
                <Image
                  fill
                  src="/file.svg"
                  alt="Sonoj Arts"
                  className="object-contain"
                />
              </div>
              {/* Use Playfair Display with gold gradient */}
              <span
                className={`text-xl ${playfairDisplay.className}`}
                style={{
                  background:
                    "linear-gradient(to right, #8B0000 0%, #DAA520 30%, #8B4513 60%, #B8860B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Sonoj Arts
              </span>
            </Link>
            <p
              className={`text-sm text-gray-600 leading-relaxed max-w-sm ${lato.className}`}
            >
              Showcasing the beauty and skill of handmade creations.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-2">
            <h4
              className={`text-sm font-semibold uppercase tracking-wide ${playfairDisplay.className}`}
              style={{
                background:
                  "linear-gradient(to right, #8B0000 0%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Navigation
            </h4>
            <div className="flex flex-col space-y-1">
              {paths.map((p) => (
                <Link
                  key={p.path}
                  href={p.path}
                  className={`group text-sm ${lato.className} text-gray-600 hover:text-transparent transition-all duration-300 relative inline-block`}
                >
                  <span className=" transition-colors duration-300">
                    {p.name}
                  </span>
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to right, #8B0000 0%, #DAA520 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {p.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info column */}
          <div className="flex flex-col space-y-2">
            <h4
              className={`text-sm font-semibold uppercase tracking-wide ${playfairDisplay.className}`}
              style={{
                background:
                  "linear-gradient(to right, #8B0000 0%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Contact
            </h4>
            <div
              className={`flex flex-col space-y-2 text-sm text-gray-600 ${lato.className}`}
            >
              <a
                href="mailto:sonoj.arts@gmail.com"
                className="hover:text-amber-700 transition-colors"
              >
                sonoj.arts@gmail.com
              </a>
              <a
                href="https://wa.me/9929285047"
                className="hover:text-amber-700 transition-colors"
              >
                +91 9929285047
              </a>
              <div className="flex space-x-3 pt-2">
                <a
                  href="https://www.instagram.com/rivercrafting?igsh=MXNxNG9ocDhlYzdneg=="
                  className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/9929285047"
                  target="_blank"
                  className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                >
                  <img
                    src={'/whatsapp.png'}
                    alt="Whatsapp"
                    className="w-4 h-4"
                  >
                  </img>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-500 font-lato">
          © {year} Sonoj Arts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
