import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/app/models/ui/Product";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center mt-4">
      {products.map((product) => (
        <ProductCard key={product.id} productData={product} />
      ))}
    </div>
  );
};

export default ProductList;
