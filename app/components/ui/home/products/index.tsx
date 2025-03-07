import React from "react";
import ProductList from "../../shared/ProductList";

interface Category {
  id: number;
  name: string;
}

interface ProductsResponse {
  count: number;
  results: any[];
}

const ITEMS_PER_PAGE = 10;
const API_BASE_URL = "https://admin.raelli.az/api";

async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/products/type/?page_size=20`, {
      next: { revalidate: 3600 }
    });
    const data = await res.json();
    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));
  } catch (error) {
    console.error("Categories loading error:", error);
    return [];
  }
}

async function getProducts(page: number = 1, category?: string) {
  try {
    const url = category
      ? `${API_BASE_URL}/products/?page=${page}&page_size=${ITEMS_PER_PAGE}&type=${category}`
      : `${API_BASE_URL}/products/?page=${page}&page_size=${ITEMS_PER_PAGE}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }
    });
    return await res.json();
  } catch (error) {
    console.error("Products loading error:", error);
    return { count: 0, results: [] };
  }
}

export default async function Products({ isInforBarVisible }: { isInforBarVisible: boolean }) {
  const categories = await getCategories();
  const products = await getProducts(1);

  return (
    <section className="dark:bg-[#121212] py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {/* Category List */}
        <div className="relative flex items-center justify-center w-full mb-6">
          <div className="flex gap-2 md:gap-3 px-2 md:px-4 py-2 overflow-x-auto scrollbar-hide scroll-smooth">
            <button
              className="whitespace-nowrap min-w-fit px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 bg-blue-500 text-white shadow-lg transform scale-105"
            >
              Bütün Məhsullar
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                className="whitespace-nowrap min-w-fit px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <ProductList products={products?.results || []} />
      </div>
    </section>
  );
}
