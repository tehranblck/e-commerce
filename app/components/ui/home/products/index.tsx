"use client";

import React, { useState, useEffect } from "react";
import InformationBar from "../../shared/InformationBar";
import { Product } from "@/app/models/ui/Product";
import ProductCard from "../../shared/ProductCard";
import { ProductResponse } from "@/app/models/ui/Product";
import BasicPagination from "../../shared/Pagination"; // Adjust the import path as needed
import Loading from "../../shared/Loading";

const Products = ({ isInforBarVisible }: { isInforBarVisible: boolean }) => {
  const [products, setProducts] = useState<ProductResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = async (page: number) => {
    const res = await fetch(
      `https://api.muslimanshop.com/api/products/?page=${page}&page_size=10`,
      {
        cache: "no-cache",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    setProducts(data);
    setTotalPages(Math.floor(data.count / 10 + 1) || 1); // Assuming the API returns total pages
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  if (!products) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <section className="bg-[#121212] py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {isInforBarVisible && <InformationBar title="Məhsullar" />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center mt-4">
          {products &&
            products.results.map((product: Product) => (
              <ProductCard key={product.id} productData={product} />
            ))}
        </div>
        <div className="flex items-center justify-center pt-8">
          <BasicPagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
