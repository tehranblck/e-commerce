// pages/products.tsx
import React from "react";
import InformationBar from "../../shared/InformationBar";
import { Product } from "@/app/models/ui/Product";
import ProductCard from "../../shared/ProductCard";
import { ProductResponse } from "@/app/models/ui/Product";

async function fetchProducts() {
  const res = await fetch("https://api.muslimanshop.com/api/products/?page=1", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

const Products = async () => {
  const products: ProductResponse = await fetchProducts();

  return (
    <section className="bg-[#121212] py-6">
      <div className="flex flex-col max-w-[1280px] mx-auto px-2">
        <InformationBar title="Məhsullar" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center mt-4">
          {products &&
            products.results.map((product: Product) => (
              <ProductCard key={product.id} productData={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
