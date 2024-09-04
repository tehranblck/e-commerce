"use client";
import React, { useState } from "react";
import ProductTokenInput from "../producttokeninput/ProductTokenInput";
import ProductDetailActions from "../productdetailactions/ProductDetailActions";
import { Product } from "@/app/models/ui/Product";

const SharedProduct = ({ product }: { product: Product }) => {
  const [pubgId, setPubgId] = useState<string>("");
  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPubgId(e.target.value.trim());
  };

  return (
    <>
      <ProductTokenInput
        pubgId={pubgId}
        productType={product.type}
        onchange={handleChangeEvent}
      />
      <ProductDetailActions product={product} pubgId={pubgId} />
    </>
  );
};

export default SharedProduct;
