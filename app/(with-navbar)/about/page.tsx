/* eslint-disable react/no-unescaped-entities */

"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] text-black relative z-10">
      {/* Decorative Background with Overlay */}
      <div className="absolute inset-0 bg-fixed bg-cover bg-center -z-10" />
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md -z-10" />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#109c9e]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-[#109c9e] rounded-full text-sm font-medium">
            <span>❤️</span>
            <span>Handcrafted with Love</span>
          </div>

          <h1 className="font-serif text-5xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-600">
            Where creativity meets excellence
          </h1>

          <p className="text-lg md:text-xl max-w-4xl mx-auto text-pretty leading-relaxed text-gray-600 ">
            Every piece tells a story. Every creation carries a piece of our
            heart. Welcome to our world of handmade artistry.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className=" px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  fill
                  src="hand-mirror.png"
                  alt="Handcrafted Mirror"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#109c9e] rounded-2xl -z-10" />
            </div>

            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[#109c9e] font-medium uppercase tracking-wider text-sm">
                  Our Story
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance text-gray-900">
                  Born from passion, crafted with purpose
                </h2>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  What started as a small passion project in a cozy studio has
                  blossomed into a celebration of handmade artistry. We believe
                  that every home deserves pieces that are as unique as the
                  people who live in them.
                </p>

                <p>
                  Each item we create is more than just decor—it's a labor of
                  love, carefully designed and meticulously crafted to bring
                  joy, personality, and warmth to your space. From decorated
                  mirrors that reflect your style to custom nameplates that
                  welcome guests with character, we pour our hearts into every
                  detail.
                </p>

                <p>
                  We don't believe in mass production or cookie-cutter designs.
                  Instead, we embrace the beauty of imperfection, the charm of
                  handmade touches, and the magic that happens when creativity
                  meets craftsmanship.
                </p>
              </div>

              {/* Values */}
              <div className="grid sm:grid-cols-3 gap-6 pt-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    Made with Love
                  </h3>
                  <p className="text-sm text-gray-600">
                    Every piece carries our passion
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    Uniquely Yours
                  </h3>
                  <p className="text-sm text-gray-600">
                    Custom designs for your vision
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    Artisan Quality
                  </h3>
                  <p className="text-sm text-gray-600">
                    Crafted to last and inspire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance text-gray-900">
              Let's create something beautiful together
            </h2>
            <p className="text-lg text-gray-600 text-pretty leading-relaxed">
              Have a custom design in mind? Want to see more of our work? We'd
              love to hear from you! Reach out through Instagram or WhatsApp,
              and let's bring your vision to life.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="h-full p-8 bg-[#f2e8fa] rounded-2xl border border-[#fff]/20 hover:border-[#e81722]/40 transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image fill src="instagram.png" alt="Instagram" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">
                      Follow on Instagram
                    </h3>
                    <p className="text-sm text-gray-600">
                      See our latest creations and get inspired
                    </p>
                  </div>
                  <div className="mt-4 bg-transparent text-[#57060a] py-2 px-4 rounded-lg font-semibold hover:bg-[#3d0b54] hover:text-white transition-colors duration-200">
                    Visit Profile
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="h-full p-8 bg-[#daf5d5] rounded-2xl border border-blue-600/20 hover:border-blue-600/40 transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image fill src="whatsapp.png" alt="WhatsApp" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">
                      Chat on WhatsApp
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quick responses for orders and inquiries
                    </p>
                  </div>
                  <div className="mt-4 bg-transparent text-[#045912] py-2 px-4 rounded-lg font-semibold hover:bg-[#045912] hover:text-white transition-colors duration-200">
                    Start Chat
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Additional Contact Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <Image fill src="mail.png" alt="Mail" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-gray-900">Email Us</h4>
                  <p className="text-sm text-gray-600">hello@rivercraft.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Image fill src="whatsapp.png" alt="WhatsApp" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-gray-900">
                    Drop message at
                  </h4>
                  <p className="text-sm text-gray-600">
                    +91 xxxxxxxxxx, +91 xxxxxxxxxx
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Closing Message */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 italic text-pretty">
              "We don't just make products—we create memories, one handcrafted
              piece at a time."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
