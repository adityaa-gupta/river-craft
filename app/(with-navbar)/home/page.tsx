"use client";

import Link from "next/link";

const categories = [
  { id: "mirror", name: "Mirrors", image: "hand-mirror.png" },
  { id: "painting", name: "Paintings", image: "paint.png" },
  { id: "nameplate", name: "Nameplates", image: "signboard.png" },
  { id: "canvas", name: "Canvases", image: "canvas.png" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] text-black relative z-10">
      {/* Hero Section */}
      <section className="relative bg-white/80 backdrop-blur-md py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-center"
        />
        <div className="relative max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-gray-600">
            Discover Amazing
          </h1>
          <h1 className="text-6xl font-bold mb-4 text-[#109c9e]">
            Art & Crafts
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Explore a curated collection of unique artworks and handcrafted pieces from talented artists around the world. We find the pearls in eternal river of art and craft and provide to you.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#109c9e] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#109c9e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Explore by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/?category=${category.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center p-6 h-48"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-24 w-24 object-contain mb-4 group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-lg font-semibold text-gray-900 group-hover:text-[#107a7c] transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}