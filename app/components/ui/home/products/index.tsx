"use client";

import React, { useEffect, useState } from "react";
import InformationBar from "../../shared/InformationBar";
import ProductList from "../../shared/ProductList";
import BasicPagination from "../../shared/Pagination";
import Loading from "../../shared/Loading";
import { fetchProducts } from "@/app/services/modules/products";
import { usePagination } from "@/app/hooks/usePaginations";

const Products = ({ isInforBarVisible }: { isInforBarVisible: boolean }) => {
  const { currentPage, totalPages, setTotalPages } = usePagination();
  const [products, setProducts] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]); // Kategorileri tutar
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Seçili kategori ID
  const [loading, setLoading] = useState<boolean>(true);

  // Kategorileri Fetch Etme ve LocalStorage'a Kaydetme
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.muslimanshop.com/api/products/type/");
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

    // Eğer localStorage'da kategoriler varsa onları kullan, yoksa API'den çek
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
          // Seçili kategoriye göre ID'yi al
          const savedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
          const category = savedCategories.find((cat: any) => cat.name === selectedCategory);

          if (!category) throw new Error("Category not found");

          // ID'yi kullanarak ürünleri API'den çek
          const res = await fetch(
            `https://api.muslimanshop.com/api/products?type=${category.id}&page=${currentPage}`
          );
          if (!res.ok) throw new Error("Failed to fetch products");
          data = await res.json();
        } else {
          // Tüm ürünler
          data = await fetchProducts(currentPage);
        }

        setProducts(data);
        const total = Math.ceil(data.count / 10);
        setTotalPages(total);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, currentPage, setTotalPages]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="dark:bg-[#121212] dark:border-0 py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {isInforBarVisible && (
          <InformationBar HasButton={true} link="/products" title="Məhsullar" />
        )}

        <div className="bg-yellow-400 py-2 px-4 rounded-md mt-4 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 text-black font-semibold rounded-md ${selectedCategory === null ? "bg-black text-white" : "hover:bg-white"
              } transition-all duration-300`}
          >
            Bütün Məhsullar
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)} // Adı seçiyoruz
              className={`px-4 py-2 text-black font-semibold rounded-md ${selectedCategory === category.name ? "bg-black text-white" : "hover:bg-white"
                } transition-all duration-300`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <ProductList products={products?.results || []} />

        <div className="flex items-center justify-center pt-8">
          <BasicPagination count={totalPages} page={currentPage} />
        </div>
      </div>
    </section>
  );
};

export default Products;
