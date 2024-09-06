"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/components/ui/shared/Loading";
import ProductList from "@/app/components/ui/shared/ProductList";
import FutureCard from "@/app/components/ui/shared/FutureCard";

const CategorizedProductComponent = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.muslimanshop.com/api/products?page=${page}&page_size=100`,
        );
        const data = await response.json();
        const filteredProducts = data.results.filter(
          (product: any) => product.type === category,
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [category, page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center pt-48 pb-20 w-full bg-[#181818]">
        <Loading />
      </div>
    );
  }

  return (
    <section className="bg-[#121212] ">
      <div className="mx-auto pt-[210px] text-center lg:pt-[160px] pb-[10px]">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-[36px] text-white">
            <span className="text-yellow-500 uppercase italic font-bold">
              {category}
            </span>
          </h1>

          <div className="">
            {products.length > 0 ? (
              <ProductList styleCss="px-4" products={products} />
            ) : (
              <p className="text-[24px] pt-10 pb-[140px] text-white">
                Produkt tapılmadı
              </p>
            )}
          </div>
        </div>
        <div>
          <FutureCard />
        </div>
      </div>
    </section>
  );
};

export default CategorizedProductComponent;
