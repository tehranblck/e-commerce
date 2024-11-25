'use client'
import React, { useEffect, useState, useRef } from "react";
import ProductList from "../../shared/ProductList";
import BasicPagination from "../../shared/Pagination";
import Loading from "../../shared/Loading";
import { fetchProducts } from "@/app/services/modules/products";
import { usePagination } from "@/app/hooks/usePaginations";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Font Awesome ikonları

const Products = ({ isInforBarVisible }: { isInforBarVisible: boolean }) => {
  const { currentPage, totalPages, setTotalPages } = usePagination();
  const [products, setProducts] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]); // Kategorileri tutar
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Seçili kategori ID
  const [loading, setLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null); // Slider için referans

  // Kategorileri Fetch Etme ve LocalStorage'a Kaydetme
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.muslimanshop.com/api/products/type/?page_size=20"
        );
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
        console.error("Error fetching categories:", error);
      }
    };

    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      fetchCategories();
    }
  }, []);

  // Ürünleri Fetch Etme
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let data;

        if (selectedCategory) {
          const savedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
          const category = savedCategories.find((cat: any) => cat.name === selectedCategory);

          if (!category) throw new Error("Category not found");

          const res = await fetch(
            `https://api.muslimanshop.com/api/products?type=${category.id}&page=${currentPage}`
          );
          if (!res.ok) throw new Error("Failed to fetch products");
          data = await res.json();
        } else {
          data = await fetchProducts(currentPage);
        }

        setProducts(data);
        const total = data.count;
        setTotalPages(total);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, currentPage, setTotalPages]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="dark:bg-[#121212] dark:border-0 py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {/* Slider Bar */}
        <div style={{ overflowX: 'hidden' }} className="relative flex items-center px-12">
          <button
            onClick={handleScrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-3 z-10 hover:bg-gray-800 transition-all flex items-center justify-center"
          >
            <FaChevronLeft size={20} />
          </button>
          <div
            ref={scrollRef}
            className="bg-yellow-400 px-4 rounded-md mt-4 flex gap-2 overflow-x-hidden scrollbar-hide"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-black font-semibold rounded-md border transition-all border-yellow-400 duration-300 
            ${selectedCategory === null ? "border-black bg-black text-white shadow-md" : "hover:bg-gray-200 border-transparent"}`}
            >
              Bütün Məhsullar
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 text-black font-semibold rounded-md transition-all duration-300 border 
              ${selectedCategory === category.name
                    ? "bg-black text-white shadow-md border-l-yellow-500 border-r-yellow-500"
                    : "hover:bg-gray-200 border-transparent"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleScrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-3 z-10 hover:bg-gray-800 transition-all flex items-center justify-center"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Product List */}
        <ProductList products={products?.results || []} />

        <div className="flex items-center justify-center pt-8">
          <BasicPagination count={totalPages} page={currentPage} />
        </div>
      </div>
    </section>
  );
};

export default Products;
