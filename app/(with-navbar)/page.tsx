"use client";

import { useState, useEffect, useCallback } from "react";
import { getProductsPaginated } from "./../_services/product";
import { Product } from "../_type/product";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
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
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const fetchProducts = useCallback(
    async (isMore: boolean = false) => {
      if (!isMore) setLoading(true);
      try {
        const { products: newProducts, lastDoc: newLastDoc } =
          await getProductsPaginated(
            selectedCategory,
            15,
            isMore ? lastDoc : null
          );
        setProducts((prev) =>
          isMore ? [...prev, ...newProducts] : newProducts
        );
        setLastDoc(newLastDoc);
        setHasMore(newProducts.length === 15);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        if (!isMore) setLoading(false);
      }
    },
    [selectedCategory, lastDoc]
  );

  useEffect(() => {
    setProducts([]);
    setLastDoc(null);
    setHasMore(true);
    // update the path params
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("filter");
    }

    router.replace(`${pathname}?${params.toString()}`);
    fetchProducts();
  }, [selectedCategory, pathname, router, searchParams]);

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
              We couldn't find any products in this category.
            </p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={products.length}
            next={() => fetchProducts(true)}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-t-2 border-[#DAA520] rounded-full animate-spin"></div>
              </div>
            }
            endMessage={
              products.length > 0 &&
              !hasMore && (
                <p className="text-gray-500 text-center mt-8 italic">
                  You've seen all our creations
                </p>
              )
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Product Image */}
                  <div className="relative pb-[100%] overflow-hidden">
                    <Image
                      fill
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="object-cover absolute top-0 left-0 w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3
                      className={`text-lg font-medium text-gray-800 mb-1 ${playfairDisplay.className}`}
                    >
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-1">
                      {product.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
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
                        ${product.price.toFixed(2)}
                      </p>
                      <button className="text-sm px-3 py-1 border border-gray-300 rounded hover:border-amber-500 hover:text-amber-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-gray-700">
                      {categories.find((c) => c.id === product.category)
                        ?.name || product.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-white py-12 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2
            className={`text-2xl md:text-3xl text-gray-900 mb-4 ${playfairDisplay.className}`}
            style={{
              background: "linear-gradient(to right, #8B0000, #DAA520)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Stay Updated with New Creations
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to see our latest
            handcrafted pieces.
          </p>

          <div className="flex max-w-md mx-auto flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <button className="px-6 py-3 rounded-md bg-gradient-to-r from-[#8B0000] to-[#DAA520] text-white font-medium shadow-sm hover:shadow-md transition-shadow">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
