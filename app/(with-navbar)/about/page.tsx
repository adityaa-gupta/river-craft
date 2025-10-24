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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f9f7f5] text-gray-800 relative z-10">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-fixed bg-[url('/subtle-pattern.png')] opacity-5 -z-10" />

      {/* Hero Section */}
      <section className="relative px-6 py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-48 h-48 bg-[#DAA520]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#8B0000]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-sm font-medium">
            <span className="text-amber-700">✦</span>
            <span
              style={{
                background: "linear-gradient(to right, #8B0000, #DAA520)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Artisan Craftsmanship
            </span>
            <span className="text-amber-700">✦</span>
          </div>

          <h1
            className={`${playfairDisplay.className} text-5xl md:text-6xl lg:text-7xl font-bold leading-tight`}
            style={{
              background:
                "linear-gradient(to right, #8B0000 0%, #DAA520 50%, #8B4513 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Where Creativity Meets Excellence
          </h1>

          <p
            className={`${lato.className} text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-gray-700`}
          >
            Every piece tells a story. Every creation carries a piece of our
            heart. Welcome to our world of handmade artistry at Sonoj Arts.
          </p>

          <div
            className="w-40 h-1 mx-auto my-2"
            style={{
              background: "linear-gradient(to right, #8B0000, #DAA520)",
            }}
          ></div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/hero.jpg"
                  alt="Handcrafted Mirror"
                  fill
                  className="object-cover"
                  quality={100}
                  priority
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
              {/* Decorative element */}
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-lg -z-10"
                style={{
                  background: "linear-gradient(45deg, #8B0000, #DAA520)",
                }}
              />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 rounded-lg -z-10 border-amber-200"></div>
            </div>

            {/* Content Side */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <p
                  className={`${lato.className} font-medium uppercase tracking-wider text-sm`}
                  style={{
                    background: "linear-gradient(to right, #8B0000, #DAA520)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Our Story
                </p>
                <h2
                  className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-balance text-gray-900`}
                >
                  Born from Passion, Crafted with Purpose
                </h2>
              </div>

              <div
                className={`space-y-6 text-gray-700 leading-relaxed ${lato.className}`}
              >
                <p className="text-lg">
                  What started as a small passion project in a cozy studio has
                  blossomed into a celebration of handmade artistry. We believe
                  that every home deserves pieces that are as unique as the
                  people who live in them.
                </p>

                <p>
                  Each item we create is more than just decor—it&apos;s a labor
                  of love, carefully designed and meticulously crafted to bring
                  joy, personality, and warmth to your space. From decorated
                  mirrors that reflect your style to custom nameplates that
                  welcome guests with character, we pour our hearts into every
                  detail.
                </p>

                <p>
                  We don&apos;t believe in mass production or cookie-cutter
                  designs. Instead, we embrace the beauty of imperfection, the
                  charm of handmade touches, and the magic that happens when
                  creativity meets craftsmanship.
                </p>
              </div>

              {/* Values */}
              <div className="grid sm:grid-cols-3 gap-6 pt-6">
                <div className="space-y-2 relative p-4 bg-white rounded-lg shadow-sm group hover:shadow-md transition-shadow">
                  <div
                    className="w-10 h-1 mb-4 group-hover:w-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(to right, #8B0000, #DAA520)",
                    }}
                  ></div>
                  <h3
                    className={`${playfairDisplay.className} font-semibold text-gray-900`}
                  >
                    Made with Love
                  </h3>
                  <p className={`${lato.className} text-sm text-gray-600`}>
                    Every piece carries our passion
                  </p>
                </div>

                <div className="space-y-2 relative p-4 bg-white rounded-lg shadow-sm group hover:shadow-md transition-shadow">
                  <div
                    className="w-10 h-1 mb-4 group-hover:w-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(to right, #8B0000, #DAA520)",
                    }}
                  ></div>
                  <h3
                    className={`${playfairDisplay.className} font-semibold text-gray-900`}
                  >
                    Uniquely Yours
                  </h3>
                  <p className={`${lato.className} text-sm text-gray-600`}>
                    Custom designs for your vision
                  </p>
                </div>

                <div className="space-y-2 relative p-4 bg-white rounded-lg shadow-sm group hover:shadow-md transition-shadow">
                  <div
                    className="w-10 h-1 mb-4 group-hover:w-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(to right, #8B0000, #DAA520)",
                    }}
                  ></div>
                  <h3
                    className={`${playfairDisplay.className} font-semibold text-gray-900`}
                  >
                    Artisan Quality
                  </h3>
                  <p className={`${lato.className} text-sm text-gray-600`}>
                    Crafted to last and inspire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-40 h-40 bg-[#8B0000]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#DAA520]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto" id="contact-section">
          <div className="text-center space-y-6 mb-12">
            <h2
              className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-balance`}
              style={{
                background: "linear-gradient(to right, #8B0000, #DAA520)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Let&apos;s Create Something Beautiful Together
            </h2>
            <p
              className={`${lato.className} text-lg text-gray-700 text-pretty leading-relaxed`}
            >
              Have a custom design in mind? Want to see more of our work?
              We&apos;d love to hear from you! Reach out through Instagram or
              WhatsApp, and let&apos;s bring your vision to life.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <Link
              href="https://www.instagram.com/rivercrafting?igsh=MXNxNG9ocDhlYzdneg=="
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div
                className="h-full p-8 bg-white rounded-lg shadow-sm hover:shadow-xl border-t-4 transition-all duration-300"
                style={{ borderColor: "#8B0000" }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/instagram.png"
                      alt="Instagram"
                      width={56} // pixel size
                      height={56}
                      className="w-14 h-14"
                    />
                  </div>
                  <div>
                    <h3
                      className={`${playfairDisplay.className} font-semibold text-xl mb-2 text-gray-900`}
                    >
                      Follow on Instagram
                    </h3>
                    <p className={`${lato.className} text-sm text-gray-600`}>
                      See our latest creations and get inspired
                    </p>
                  </div>
                  <div
                    className={`${lato.className} mt-4 py-2.5 px-6 rounded font-medium group-hover:text-white transition-all duration-300`}
                    style={{
                      background: "linear-gradient(to right, #8B0000, #DAA520)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <span className="group-hover:text-white transition-colors duration-300">
                      Visit Profile
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href="https://wa.me/9929285047"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div
                className="h-full p-8 bg-white rounded-lg shadow-sm hover:shadow-xl border-t-4 transition-all duration-300"
                style={{ borderColor: "#DAA520" }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/whatsapp.png"
                      alt="WhatsApp"
                      width={56}
                      height={56}
                      className="w-14 h-14"
                    />
                  </div>
                  <div>
                    <h3
                      className={`${playfairDisplay.className} font-semibold text-xl mb-2 text-gray-900`}
                    >
                      Chat on WhatsApp
                    </h3>
                    <p className={`${lato.className} text-sm text-gray-600`}>
                      Quick responses for orders and inquiries
                    </p>
                  </div>
                  <div
                    className={`${lato.className} mt-4 py-2.5 px-6 rounded font-medium group-hover:text-white transition-all duration-300`}
                    style={{
                      background: "linear-gradient(to right, #DAA520, #8B0000)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <span className="group-hover:text-white transition-colors duration-300">
                      Start Chat
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Additional Contact Info */}
          <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow border border-gray-100">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-full p-2"
                  style={{
                    background: "linear-gradient(to right, #8B0000, #DAA520)",
                  }}
                >
                  <Image
                    src="/mail.png"
                    alt="Mail"
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 invert"
                  />
                </div>
                <div>
                  <h4
                    className={`${playfairDisplay.className} font-semibold mb-1 text-gray-900`}
                  >
                    Email Us
                  </h4>
                  <p className={`${lato.className} text-sm text-gray-600`}>
                    sonoj.arts@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-full p-2"
                  style={{
                    background: "linear-gradient(to right, #DAA520, #8B0000)",
                  }}
                >
                  <Image
                    src="/whatsapp.png"
                    alt="Phone"
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 invert"
                  />
                </div>
                <div>
                  <h4
                    className={`${playfairDisplay.className} font-semibold mb-1 text-gray-900`}
                  >
                    Drop message at
                  </h4>
                  <p className={`${lato.className} text-sm text-gray-600`}>
                    +91 9929285047, +91 9602220735
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Closing Message */}
          <div className="mt-16 text-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="relative bg-[#f9f7f5] px-6">
              <span
                className={`${playfairDisplay.className} italic text-lg`}
                style={{
                  background: "linear-gradient(to right, #8B0000, #DAA520)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                We don&apos;t just make products—we create memories, one
                handcrafted piece at a time.
              </span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
