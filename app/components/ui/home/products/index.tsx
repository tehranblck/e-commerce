"use client";
import React, { useEffect, useState, useRef } from "react";
import ProductList from "../../shared/ProductList";
import BasicPagination from "../../shared/Pagination";
import Loading from "../../shared/Loading";
import { fetchProducts } from "@/app/services/modules/products";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Font Awesome ikonları

const Products = ({ isInforBarVisible }: { isInforBarVisible: boolean }) => {
  const [currentPage, setCurrentPage] = useState<number>(1); // Aktif sayfa
  const [totalPages, setTotalPages] = useState<number>(0); // Toplam sayfa sayısı
  const [products, setProducts] = useState<any>(null); // Ürünler
  const [categories, setCategories] = useState<any[]>([]); // Kategoriler
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Seçili kategori
  const [loading, setLoading] = useState<boolean>(true); // Yüklenme durumu
  const scrollRef = useRef<HTMLDivElement>(null); // Kategori slider için referans
  const itemsPerPage = 10; // Sayfa başına ürün sayısı

  // Kategorileri Fetch Etme ve LocalStorage'a Kaydetme
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://admin.raelli.az/api/products/type/?page_size=20"
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
            `https://admin.raelli.az/api/products?type=${category.id}&page=${currentPage}&page_size=${itemsPerPage}`
          );
          if (!res.ok) throw new Error("Failed to fetch products");
          data = await res.json();
        } else {
          const res = await fetch(
            `https://admin.raelli.az/api/products?page=${currentPage}&page_size=${itemsPerPage}`
          );
          if (!res.ok) throw new Error("Failed to fetch products");
          data = await res.json();
        }

        setProducts(data);
        const total = Math.ceil(data.count / itemsPerPage); // Toplam sayfa sayısını hesapla
        setTotalPages(total);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, currentPage]);

  // Kategori Slider Sola Kaydır
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Kategori Slider Sağa Kaydır
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="dark:bg-[#121212]   py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {/* Slider Bar */}
        <div style={{ overflowX: "hidden" }} className="relative flex  items-center px-12">
          <button
            onClick={handleScrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-3 z-10 hover:bg-gray-800 transition-all flex items-center justify-center"
          >
            <FaChevronLeft size={20} />
          </button>
          <div
            ref={scrollRef}
            className="bg-[#988d57] border-2 border-white text-white px-4 rounded-md mt-4 flex gap-2 overflow-x-hidden scrollbar-hide"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-black font-semibold rounded-md border transition-all duration-300 
            ${selectedCategory === null ? "border-black border-l-yellow-500 border-r-yellow-500 bg-black text-white shadow-md" : "hover:bg-gray-200 border-transparent"}`}
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

        {/* Pagination */}
        <div className="flex items-center justify-center pt-8">
          <BasicPagination
            count={totalPages}
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
