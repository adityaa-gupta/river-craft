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
                <div className="relative h-8 w-8">
                  <Image
                    fill
                    src="/file.svg"
                    alt="River Craft"
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="font-semibold text-lg text-gray-900">
                  River Craft
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

          {/* Social */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-full bg-gray-100 hover:bg-[#109c9e] transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 hover:text-[#109c9e]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.633 7.997c.013.176.013.352.013.53 0 5.39-4.103 11.606-11.606 11.606-2.305 0-4.447-.676-6.247-1.844.321.038.63.05.963.05 1.917 0 3.68-.65 5.084-1.77a4.095 4.095 0 0 1-3.823-2.84c.25.037.5.062.762.062.365 0 .73-.05 1.07-.138a4.086 4.086 0 0 1-3.283-4.012v-.05c.551.306 1.188.5 1.87.525a4.08 4.08 0 0 1-1.82-3.406c0-.75.2-1.425.55-2.013a11.62 11.62 0 0 0 8.426 4.275 4.607 4.607 0 0 1-.1-.937 4.084 4.084 0 0 1 7.073-2.794 8.11 8.11 0 0 0 2.605-.994 4.06 4.06 0 0 1-1.793 2.262 8.23 8.23 0 0 0 2.347-.64 8.78 8.78 0 0 1-2.04 2.106z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 hover:text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.393 7.865 10.922.575.1.785-.25.785-.55 0-.275-.013-1.2-.013-2.175-3.2.7-3.875-1.55-3.875-1.55-.512-1.287-1.25-1.625-1.25-1.625-1.025-.7.075-.688.075-.688 1.138.075 1.737 1.162 1.737 1.162 1.012 1.737 2.662 1.237 3.312.938.1-.725.4-1.237.725-1.525-2.55-.288-5.225-1.288-5.225-5.75 0-1.275.45-2.325 1.187-3.15-.125-.287-.512-1.462.112-3.05 0 0 .962-.3 3.15 1.188.913-.25 1.887-.375 2.862-.375.975 0 1.95.125 2.863.375 2.187-1.5 3.15-1.188 3.15-1.188.624 1.588.237 2.763.112 3.05.737.825 1.187 1.875 1.187 3.15 0 4.475-2.688 5.45-5.25 5.737.412.362.8 1.087.8 2.212 0 1.6-.012 2.887-.012 3.287 0 .3.212.65.787.55A10.997 10.997 0 0 0 23.5 12c0-6.352-5.148-11.5-11.5-11.5z" />
                </svg>
              </a>
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
