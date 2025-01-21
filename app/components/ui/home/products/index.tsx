"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductList from "../../shared/ProductList";
import BasicPagination from "../../shared/Pagination";
import Loading from "../../shared/Loading";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

const Products = ({ isInforBarVisible }: { isInforBarVisible: boolean }) => {
  // State tanımlamaları
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);

  // Kategorileri getir
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/type/?page_size=20`);
      const data = await res.json();

      if (data.results) {
        const formattedCategories = data.results.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));

        localStorage.setItem("categories", JSON.stringify(formattedCategories));
        setCategories(formattedCategories);
      }
    } catch (error) {
      console.error("Kategoriler yüklenirken hata:", error);
    }
  }, []);

  // Ürünleri getir
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/products?page=${currentPage}&page_size=${ITEMS_PER_PAGE}`;

      if (selectedCategory) {
        const category = categories.find(cat => cat.name === selectedCategory);
        if (category) {
          url += `&type=${category.id}`;
          console.log('Seçili Kategori:', category);
          console.log('API URL:', url);
        }
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Məhsullar yüklənmədi");

      const data = await res.json();
      console.log('API Yanıtı:', {
        selectedCategory,
        totalProducts: data.count,
        products: data.results
      });

      setProducts(data);
      setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Məhsullar yüklənərkən xəta:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, categories]);

  // Kategorileri yükle
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      fetchCategories();
    }
  }, [fetchCategories]);

  // Ürünleri yükle
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Slider kontrolleri
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Kategori seçimi
  const handleCategorySelect = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1); // Kategori değiştiğinde sayfa 1'e dön
  };

  if (loading) return <Loading />;

  return (
    <section className="dark:bg-[#121212] py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {/* Kategori Slider */}
        <div className="relative flex items-center px-12">
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-3 z-10 hover:bg-gray-800 transition-all"
            aria-label="Sola kaydır"
          >
            <FaChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="bg-[#988d57] border-2 border-white text-white px-4 rounded-md mt-4 flex gap-2 overflow-x-hidden scrollbar-hide"
          >
            <button
              onClick={() => handleCategorySelect(null)}
              className={`px-4 py-2 text-black font-semibold rounded-md border transition-all duration-300 
                ${selectedCategory === null
                  ? "border-black border-l-yellow-500 border-r-yellow-500 bg-black text-white shadow-md"
                  : "hover:bg-gray-200 border-transparent"}`}
            >
              Bütün Məhsullar
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.name)}
                className={`px-4 py-2 text-black font-semibold rounded-md transition-all duration-300 border 
                  ${selectedCategory === category.name
                    ? "bg-black text-white shadow-md border-l-yellow-500 border-r-yellow-500"
                    : "hover:bg-gray-200 border-transparent"}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-3 z-10 hover:bg-gray-800 transition-all"
            aria-label="Sağa kaydır"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Ürün Listesi */}
        <ProductList products={products?.results || []} />

        {/* Sayfalama */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center pt-8">
            <BasicPagination
              count={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
