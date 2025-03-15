"use client";

import React from "react";
import ProductList from "../../shared/ProductList";
import { useState, useEffect, useCallback } from "react";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  type: string;
  slug: string;
  price: number;
}

interface ProductsResponse {
  count: number;
  results: Product[];
}

interface ProductsProps {
  initialCategories: Category[];
  initialProducts: Product[];
  totalCount: number;
  isInforBarVisible: boolean;
}

const ITEMS_PER_PAGE = 12;
const API_BASE_URL = "https://admin.raelli.az/api";

async function getProducts(page: number = 1, category?: string): Promise<ProductsResponse> {
  try {
    const url = new URL(`${API_BASE_URL}/products/`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('page_size', ITEMS_PER_PAGE.toString());
    if (category) url.searchParams.append('type', category);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();
    return data as ProductsResponse;
  } catch (error) {
    console.error("Products loading error:", error);
    return { count: 0, results: [] };
  }
}

export default function Products({
  initialCategories,
  initialProducts,
  totalCount,
  isInforBarVisible
}: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialProducts.length >= ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch products when category changes
  useEffect(() => {
    if (!selectedCategory) {
      setProducts(initialProducts);
      setHasMore(initialProducts.length >= ITEMS_PER_PAGE);
      setPage(1);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPage(1);

    getProducts(1, selectedCategory)
      .then((data) => {
        setProducts(data.results);
        setHasMore(data.results.length >= ITEMS_PER_PAGE);
      })
      .catch((err) => setError("Məhsulları yükləyərkən xəta baş verdi"))
      .finally(() => setIsLoading(false));
  }, [selectedCategory, initialProducts]);

  // Handle category selection
  const handleCategoryClick = useCallback((categoryId: number | null) => {
    setSelectedCategory(categoryId?.toString() || null);
  }, []);

  // Load more products
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await getProducts(nextPage, selectedCategory);
      setProducts(prev => [...prev, ...data.results]);
      setHasMore(data.results.length >= ITEMS_PER_PAGE);
      setPage(nextPage);
    } catch (err) {
      setError("Əlavə məhsulları yükləyərkən xəta baş verdi");
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, page, selectedCategory]);

  // Handle scroll-based loading
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        if (hasMore && !isLoadingMore) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoadingMore, loadMore]);

  return (
    <section className="dark:bg-[#121212] py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {/* Category List */}
        <div className="relative flex items-center justify-center w-full mb-6">
          <div className="flex gap-2 md:gap-3 px-2 md:px-4 py-2 overflow-x-auto scrollbar-hide scroll-smooth">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`whitespace-nowrap min-w-fit px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 ${selectedCategory === null
                ? "bg-blue-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
            >
              Bütün Məhsullar
            </button>

            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`whitespace-nowrap min-w-fit px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 ${selectedCategory === category.id.toString()
                  ? "bg-blue-500 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product List with Loading States */}
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            {error}
          </div>
        ) : (
          <>
            <ProductList products={products} />
            {isLoadingMore && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
