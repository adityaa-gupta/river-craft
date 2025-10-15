"use client";

import Link from "next/link";
import { Playfair_Display, Lato } from "next/font/google";
import Image from "next/image";

// Initialize fonts
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

const categories = [
  {
    id: "mirror",
    name: "Mirrors",
    image: "hand-mirror.png",
    description: "Elegant reflections for your space",
  },
  {
    id: "painting",
    name: "Paintings",
    image: "paint.png",
    description: "Handcrafted visual expressions",
  },
  {
    id: "nameplate",
    name: "Nameplates",
    image: "signboard.png",
    description: "Custom identity for your home",
  },
  {
    id: "canvas",
    name: "Canvases",
    image: "canvas.png",
    description: "Artistic storytelling on fabric",
  },
];

export default function HomePage() {
  return (
    <div
      className={`min-h-screen bg-[#f9f7f5] text-gray-800 relative z-10 ${lato.className}`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-fixed bg-[url('/subtle-pattern.png')] opacity-5 -z-10" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#f8f6f1] to-[#f9f7f5] px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full h-full opacity-20">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                fill="#DAA520"
                d="M46.5,-77.5C59.1,-70.5,67.8,-55.8,74.5,-40.6C81.1,-25.5,85.8,-9.8,83.9,4.9C82.1,19.7,73.8,33.5,63.4,44.2C52.9,54.8,40.3,62.3,26.6,69C12.9,75.8,-1.9,81.7,-15.9,79.6C-29.9,77.5,-43,67.5,-53.2,55.7C-63.3,44,-70.3,30.5,-74.7,15.6C-79.1,0.6,-80.8,-15.9,-76,-29.9C-71.2,-43.9,-59.8,-55.4,-46.5,-62.3C-33.1,-69.1,-17.9,-71.3,-0.9,-69.9C16.1,-68.5,33.9,-84.5,46.5,-77.5Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 relative">
          {/* Hero Content */}
          <div className="flex-1 space-y-6 text-center md:text-left mb-8 md:mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-sm font-medium mb-2">
              <span className="text-amber-700">✦</span>
              <span
                style={{
                  background: "linear-gradient(to right, #8B0000, #DAA520)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Handcrafted with Love
              </span>
              <span className="text-amber-700">✦</span>
            </div>

            <h1
              className={`${playfairDisplay.className} text-4xl sm:text-5xl md:text-6xl font-bold leading-tight`}
            >
              <span className="block">Discover Exquisite</span>
              <span
                style={{
                  background:
                    "linear-gradient(to right, #8B0000 0%, #DAA520 50%, #8B4513 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Art & Crafts
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto md:mx-0">
              Explore our curated collection of unique artworks and handcrafted
              pieces. Each creation tells a story and brings a touch of artistry
              to your space.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <Link
                href="/"
                className="inline-block py-3 px-6 sm:px-8 rounded-md font-medium text-white shadow-md hover:shadow-lg transition-all duration-300"
                style={{
                  background: "linear-gradient(to right, #8B0000, #DAA520)",
                }}
              >
                Explore Collection
              </Link>

              <Link
                href="/about"
                className="inline-block py-3 px-6 sm:px-8 rounded-md font-medium text-gray-800 border border-gray-300 hover:border-amber-400 transition-colors duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Hero Image - Improved mobile responsiveness */}
          <div className="flex-1 relative w-full max-w-lg mx-auto md:mx-0">
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/hero.jpg"
                alt="Handcrafted Art"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gradient border overlay */}
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: "linear-gradient(to right, #8B0000, #DAA520)",
                  padding: "3px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                }}
              ></div>
            </div>
            {/* Decorative elements - hidden on small screens */}
            <div className="absolute -bottom-5 -left-5 w-20 h-20 sm:w-24 sm:h-24 border-2 rounded-lg -z-10 border-amber-200 hidden sm:block"></div>
            <div
              className="absolute -top-5 -right-5 w-24 h-24 sm:w-32 sm:h-32 rounded-lg -z-10 hidden sm:block"
              style={{
                background:
                  "linear-gradient(45deg, rgba(139,0,0,0.1), rgba(218,165,32,0.1))",
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2
              className={`${playfairDisplay.className} text-3xl md:text-4xl lg:text-5xl font-bold`}
              style={{
                background: "linear-gradient(to right, #8B0000, #DAA520)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Explore by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each category represents our commitment to quality and
              craftsmanship. Discover pieces that speak to your soul.
            </p>
            <div
              className="w-24 h-1 mx-auto"
              style={{
                background: "linear-gradient(to right, #8B0000, #DAA520)",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/?category=${category.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl h-full flex flex-col relative">
                  {/* Category Image */}
                  <div className="h-48 overflow-hidden relative">
                    <div className="h-full bg-amber-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                      <Image
                        height={112}
                        width={112}
                        src={category.image}
                        alt={category.name}
                        className="h-28 w-28 object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {/* Gradient overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(139,0,0,0.1), rgba(218,165,32,0.1))",
                      }}
                    ></div>
                  </div>

                  {/* Category Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3
                      className={`${playfairDisplay.className} text-xl font-semibold mb-2 group-hover:text-transparent bg-clip-text transition-colors duration-300`}
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #8B0000, #DAA520)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm flex-1 mb-4">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium">
                      Browse Collection
                      <svg
                        className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Bottom border that expands on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(to right, #8B0000, #DAA520)",
                    }}
                  ></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 relative bg-[#f9f7f5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(139,0,0,0.03) 0%, rgba(218,165,32,0.03) 90%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold mb-4`}
            >
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The joy our creations bring to our clients is our greatest reward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {/* Stars */}
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-6 italic">
                "I ordered a custom nameplate for our new home, and it exceeded
                all expectations. The attention to detail and craftsmanship is
                outstanding. It's now the first thing visitors compliment when
                they come over!"
              </blockquote>
              <div className="flex items-center">
                <div className="ml-4">
                  <p
                    className={`${playfairDisplay.className} font-medium text-gray-900`}
                  >
                    Priya Sharma
                  </p>
                  <p className="text-sm text-gray-500">Mumbai</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {/* Stars */}
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-6 italic">
                "The hand-painted mirror I purchased is truly a work of art.
                Every time I look at it, I discover new details to appreciate.
                It's become the centerpiece of my living room."
              </blockquote>
              <div className="flex items-center">
                <div className="ml-4">
                  <p
                    className={`${playfairDisplay.className} font-medium text-gray-900`}
                  >
                    Rajesh Patel
                  </p>
                  <p className="text-sm text-gray-500">Delhi</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                {/* Stars */}
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-6 italic">
                "I commissioned a canvas painting for my mother's birthday. The
                artist captured exactly what I wanted, and the communication
                throughout the process was excellent. My mother was moved to
                tears!"
              </blockquote>
              <div className="flex items-center">
                <div className="ml-4">
                  <p
                    className={`${playfairDisplay.className} font-medium text-gray-900`}
                  >
                    Anika Gupta
                  </p>
                  <p className="text-sm text-gray-500">Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#8B0000] to-[#DAA520] rounded-xl overflow-hidden shadow-xl">
            <div className="px-8 py-16 md:py-20 md:px-12 lg:px-16 text-center">
              <h2
                className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-white mb-6`}
              >
                Ready to Add Elegance to Your Space?
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                Discover our collection of handcrafted treasures or request a
                custom piece designed just for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="py-3 px-8 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors shadow-md"
                >
                  Browse Collection
                </Link>
                <Link
                  href="/contact"
                  className="py-3 px-8 bg-transparent text-white border border-white/80 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  Request Custom Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
