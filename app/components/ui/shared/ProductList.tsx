import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/app/models/ui/Product";

type Props = {
  products: Product[];
  styleCss?: string;
};

const ProductList = ({ products, styleCss }: Props) => {
  return (
    <div
      className={`${styleCss} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-2 mt-4`}
    >
      {products?.map((product) => (
        <ProductCard key={product.id} productData={product} />
      ))}
    </div>
  );
};

export default ProductList;
