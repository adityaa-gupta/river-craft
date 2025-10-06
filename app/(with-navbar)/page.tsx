"use client";

import { useState, useEffect, useCallback } from "react";
import { getProductsPaginated } from "./../_services/product";
import { Product } from "../_type/product";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

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
        console.log("PROD : ", newProducts);
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
  }, [selectedCategory, pathname, router, searchParams, fetchProducts]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mobile Filter (top) */}
      <div className="lg:hidden mb-6">
        <div className="max-w-xs ml-0 border border-gray-100 rounded-lg bg-white/50 p-4">
          <label
            htmlFor="mobile-category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Category
          </label>
          <select
            id="mobile-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white h-10 [&>option]:py-2 [&>option]:px-2 [&>option]:bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Desktop Filter (left) */}
        <div className="hidden lg:block">
          <div className="bg-white/50 rounded-lg shadow-sm p-6 sticky top-20 border border-gray-100">
            <h1 className="text-lg font-semibold text-900 mb-4">Filters</h1>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="desktop-category"
                  className="block font-medium text-gray-700 mb-3"
                >
                  Category
                </label>
                <select
                  id="desktop-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full border-gray-200 shadow-md border h-10 [&>option]:py-2 [&>option]:px-2"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedCategory
              ? `${categories.find((c) => c.id === selectedCategory)?.name}s`
              : "All Products"}
          </h1>

          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <InfiniteScroll
              dataLength={products.length}
              next={() => fetchProducts(true)}
              hasMore={hasMore}
              loader={
                <p className="text-gray-500 text-center mt-8">
                  Loading more...
                </p>
              }
              endMessage={
                products.length > 0 &&
                !hasMore && (
                  <p className="text-gray-500 text-center mt-8">
                    No more products to load.
                  </p>
                )
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-200"
                  >
                    <div
                      className="w-full relative overflow-hidden"
                      style={{ paddingBottom: "100%" }}
                    >
                      <Image
                        fill
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className="object-cover absolute top-0 left-0 w-full h-full group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
}
