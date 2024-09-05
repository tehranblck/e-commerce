import React from "react";
import InformationBar from "../../shared/InformationBar";
import { Product } from "@/app/models/ui/Product";
import ProductCard from "../../shared/ProductCard";
import BasicPagination from "../../shared/Pagination"; // This is now client-side
import Loading from "../../shared/Loading";
import ProductList from "../../shared/ProductList";

const Products = async ({
  searchParams,
  isInforBarVisible,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
  isInforBarVisible: boolean;
}) => {
  const currentPage = searchParams?.page
    ? parseInt(searchParams.page as string, 10)
    : 1;

  async function fetchProduct(page: number) {
    const res = await fetch(
      `https://api.muslimanshop.com/api/products?page=${page}&page_size=10`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  }

  const products = await fetchProduct(currentPage);

  if (!products) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const totalPages = Math.ceil(products.count / 10);
  console.log(products, "products");

  return (
    <section className="bg-[#121212] py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        {isInforBarVisible && <InformationBar title="Məhsullar" />}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap- mt-4">
          {products.results.map((product: Product) => (
            <ProductCard key={product.id} productData={product} />
          ))}
        </div> */}
        <ProductList products={products.results}/>
        <div className="flex items-center justify-center pt-8">
          <BasicPagination count={totalPages} page={currentPage} />
        </div>
      </div>
    </section>
  );
};

export default Products;
