// components/ui/home/products.tsx
"use client";

import React, { useEffect, useState } from "react";
import InformationBar from "../../shared/InformationBar";
import ProductList from "../../shared/ProductList";
import BasicPagination from "../../shared/Pagination";
import Loading from "../../shared/Loading";
import { useSearchParams } from "next/navigation";

const Products = ({ isInforBarVisible }: { isInforBarVisible: boolean }) => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    setCurrentPage(page);

    async function fetchProduct(page: number) {
      const baseUrl = 'https://api.muslimanshop.com/api/products';
      const url = new URL(baseUrl);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('page_size', '10');

      const res = await fetch(url.toString(), {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }

      return res.json();
    }

    setLoading(true);
    fetchProduct(page)
      .then((data) => {
        setProducts(data);
        const total = Math.ceil(data.count / 10);
        setTotalPages(total);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="bg-[#121212] py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {isInforBarVisible && <InformationBar title="Məhsullar" />}
        <ProductList products={products.results} />
        <div className="flex items-center justify-center pt-8">
          <BasicPagination count={totalPages} page={currentPage} />
        </div>
      </div>
    </section>
  );
};

export default Products;
