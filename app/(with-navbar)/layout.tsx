"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

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
    <div className="flex flex-col min-h-screen w-screen h-screen bg-fixed bg-cover bg-center relative">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/60 z-0"></div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm h-16">
        <div
          className="absolute inset-0 bg-contain bg-left-top"
          style={{
            backgroundImage: "url(/colorSpalsh4.png)",
            backgroundRepeat: "repeat-x",
            opacity: ".60",
            height: "64px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex items-center space-x-2">
                <div className="relative h-12 w-12">
                  <Image
                    fill
                    src="/hand-made2.png"
                    alt="River Craft"
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="font-bold text-lg text-gray-900">
                  Sonoj Art and Craft
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {paths.map((pathOption) => (
                <Link
                  key={pathOption.path}
                  href={pathOption.path}
                  className={`inline-flex items-center px-3 pt-1 border-b-2 text-base font-medium transition-colors duration-200
                  ${
                    pathname === pathOption.path
                      ? "border-[#109c9e] text-[#109c9e]"
                      : "border-transparent text-gray-600 hover:text-[#109c9e] hover:border-[#109c9e]"
                  }`}
                >
                  {pathOption.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#109c9e] hover:bg-[#109c9e] transition-colors duration-200"
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
              ? "max-h-48 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url(/splash6.png)",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                opacity: "0.85",
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: "#ebf3ebff",
              }}
            />
            <div className="pt-2 pb-3 space-y-1 relative">
              {paths.map((pathOption) => (
                <Link
                  key={pathOption.path}
                  href={pathOption.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200
                ${
                  pathname === pathOption.path
                    ? "text-[#109c9e]"
                    : "text-gray-900 hover:text-[#109c9e]"
                }`}
                >
                  {pathOption.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}{" "}
      <Suspense fallback={<div>Loading...</div>}>
        <main className="flex-1 pt-16 pb-24 relative z-10">{children}</main>
      </Suspense>
      {/* Footer */}
      <Footer />
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/80 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-9 w-9">
                <Image
                  fill
                  src="/file.svg"
                  alt="River Craft"
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-lg text-gray-900">
                River Craft
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Building creative digital experiences with modern design and
              performance.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Navigation
            </h4>
            <div className="flex flex-col space-y-1">
              {paths.map((p) => (
                <Link
                  key={p.path}
                  href={p.path}
                  className="text-sm text-gray-600 hover:text-[#109c9e] transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          © {year} River Craft. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
