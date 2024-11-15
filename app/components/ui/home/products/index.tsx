// /components/ui/home/Products.tsx
"use client";

import React, { useEffect, useState } from 'react';
import InformationBar from '../../shared/InformationBar';
import ProductList from '../../shared/ProductList';
import BasicPagination from '../../shared/Pagination';
import Loading from '../../shared/Loading';
import { fetchProducts } from '@/app/services/modules/products';
import { usePagination } from '@/app/hooks/usePaginations';

const Products = ({ isInforBarVisible }: { isInforBarVisible: boolean }) => {
  const { currentPage, totalPages, setTotalPages } = usePagination();
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetchProducts(currentPage)
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
  }, [currentPage, setTotalPages]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="dark:bg-[#121212]  dark:border-0  py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {isInforBarVisible && <InformationBar HasButton={true} link='/products' title="Məhsullar" />}
        <ProductList products={products?.results} />
        <div className="flex  items-center justify-center pt-8">
          <BasicPagination count={totalPages} page={currentPage} />
        </div>
      </div>
    </section>
  );
};

export default Products;
