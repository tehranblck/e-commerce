"use client";
import React, { useState, useEffect } from "react";
import ProductTokenInput from "../producttokeninput/ProductTokenInput";
import ProductDetailActions from "../productdetailactions/ProductDetailActions";
import { Product } from "@/app/models/ui/Product";

const SharedProduct = ({ product }: { product: Product }) => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(true);
  const [pubgId, setPubgId] = useState<string>("");


  useEffect(() => {
    console.log(product)
    setIsInputVisible(product.token_placeholder !== null);
  }, [product.token_placeholder]); // Burada yalnızca `product.token_placeholder`'a bağımlılık eklenir

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPubgId(e.target.value.trim());
  };

  return (
    <>
      {isInputVisible && (
        <ProductTokenInput
          pubgId={pubgId}
          productType={product.type}
          onchange={handleChangeEvent}
        />
      )}
      <ProductDetailActions product={product} pubgId={pubgId} />
    </>
  );
};

export default SharedProduct;
