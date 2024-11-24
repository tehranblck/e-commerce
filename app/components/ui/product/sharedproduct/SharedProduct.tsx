"use client";
import React, { useState, useEffect } from "react";
import ProductTokenInput from "../producttokeninput/ProductTokenInput";
import ProductDetailActions from "../productdetailactions/ProductDetailActions";
import { Product } from "@/app/models/ui/Product";

const SharedProduct = ({ product }: { product: Product }) => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false); // Başlangıçta false
  const [pubgId, setPubgId] = useState<string>(""); // Kullanıcının girdiği değer
  const [placeholder, setPlaceholder] = useState<string>(""); // Placeholder değeri

  useEffect(() => {
    // Backend'den gelen need_token bilgisine göre görünürlük ve placeholder'ı ayarla
    if (product.need_token) {
      setIsInputVisible(true);
      setPlaceholder(product.token_placeholder || ""); // Eğer token_placeholder yoksa boş string kullan
    } else {
      setIsInputVisible(false);
    }
  }, [product.need_token, product.token_placeholder]);

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPubgId(e.target.value.trim());
  };

  return (
    <>
      {isInputVisible && (
        <ProductTokenInput
          need_token={product.need_token}
          pubgId={pubgId}
          productType={product.type}
          placeholder={placeholder} // Placeholder prop'u
          onchange={handleChangeEvent}
        />
      )}
      <ProductDetailActions product={product} pubgId={pubgId} />
    </>
  );
};

export default SharedProduct;
