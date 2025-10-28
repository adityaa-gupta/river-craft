"use client";

import { useState, useEffect, useCallback } from "react";
import { getProductsByPage } from "./../_services/product";
import { Product } from "../_type/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

// Initialize the font
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const categories = [
  { id: "mirror", name: "Mirror" },
  { id: "painting", name: "Painting" },
  { id: "nameplate", name: "Nameplate" },
  { id: "canvas", name: "Canvas" },
];

export default function DiscoverPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const fetchProducts = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      try {
        const skip = (page - 1) * ITEMS_PER_PAGE;
        const { products: newProducts, totalCount } = await getProductsByPage(
          selectedCategory,
          ITEMS_PER_PAGE,
          skip
        );
        setProducts(newProducts);
        setCurrentPage(page);
        setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory] // ✅ this ensures fetchProducts only changes when category changes
  );

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setTotalPages(1);

    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    fetchProducts(); // safe
  }, [selectedCategory, pathname, router, searchParams, fetchProducts]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? "" : categoryId);
  };

  return (
    <div className="min-h-screen bg-[#f9f7f5]">
      {/* Hero section with parallax effect */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden mb-8 bg-[#2a3342]">
        {/* Darker gradient overlay for better text contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-black/30"></div>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.jpg')",
            transform: "scale(1.1)",
            filter: "brightness(0.85)", // Slightly darken the image itself
          }}
        />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 ${playfairDisplay.className}`}
            style={{
              textShadow: "0px 2px 8px rgba(0,0,0,0.5)", // Stronger text shadow
            }}
          >
            Discover Handcrafted Art
          </h1>
          <p
            className="text-white text-lg md:text-xl max-w-2xl mx-auto"
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.4)" }}
          >
            Unique pieces crafted with passion and precision for your space
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Category Navigation */}
        <div className="flex flex-wrap items-center justify-center mb-10 gap-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${
                !selectedCategory
                  ? "bg-gradient-to-r from-[#8B0000] to-[#DAA520] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            All Items
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#8B0000] to-[#DAA520] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {category.name}s
            </button>
          ))}
        </div>

        {/* Products Header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className={`text-2xl md:text-3xl text-gray-900 relative inline-block ${playfairDisplay.className}`}
          >
            {selectedCategory
              ? `${categories.find((c) => c.id === selectedCategory)?.name}s`
              : "All Creations"}
            <span className="absolute -bottom-2 left-0 h-1 w-1/2 bg-gradient-to-r from-[#8B0000] to-[#DAA520]"></span>
          </h2>

          <span className="text-gray-500 text-sm">{products.length} items</span>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-t-4 border-[#DAA520] rounded-full animate-spin"></div>
              <div
                className="absolute inset-3 border-t-4 border-[#8B0000] rounded-full animate-spin"
                style={{ animationDirection: "reverse" }}
              ></div>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              We couldn&apos;t find any products in this category.
            </p>
          </div>
        ) : (
          <div>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg overflow-hidden flex flex-col h-full shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Product Image with hover effects */}
                  <div className="relative pb-[100%] overflow-hidden">
                    <Image
                      fill
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="object-cover absolute top-0 left-0 w-full h-full transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      // priority={product.featured}
                    />

                    {/* Layered hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-white/80 backdrop-blur-sm text-xs px-3 py-1.5 rounded-full text-gray-700 font-medium shadow-sm">
                      {categories.find((c) => c.id === product.category)
                        ?.name || product.category}
                    </span>
                  </div>

                  {/* Product Info with modern styling */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3
                      className={`text-lg font-medium mb-2 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#DAA520] transition-all duration-300 ${playfairDisplay.className}`}
                    >
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-3">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase">
                          Price
                        </span>
                        <p
                          className="text-lg font-semibold"
                          style={{
                            background:
                              "linear-gradient(to right, #8B0000, #DAA520)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          ₹{product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Subtle border gradient on hover */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "linear-gradient(to right, #8B0000, #DAA520)",
                      padding: "1px",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex flex-col items-center justify-center space-y-4">
              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                {/* Previous Page Button */}
                <button
                  onClick={() =>
                    currentPage > 1 && fetchProducts(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }).map((_, i) => {
                  if (
                    i === 0 ||
                    i === totalPages - 1 ||
                    (i >= currentPage - 2 && i <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => fetchProducts(i + 1)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md ${
                          currentPage === i + 1
                            ? "bg-gradient-to-r from-[#8B0000] to-[#DAA520] text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  } else if (i === 1 || i === totalPages - 2) {
                    return (
                      <span
                        key={i}
                        className="w-10 h-10 flex items-center justify-center text-gray-500"
                      >
                        …
                      </span>
                    );
                  }
                  return null;
                })}

                {/* Next Page Button */}
                <button
                  onClick={() =>
                    currentPage < totalPages && fetchProducts(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Showing page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
