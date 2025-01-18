"use client";
import React, { useState, useEffect } from "react";
import ProductTokenInput from "../producttokeninput/ProductTokenInput";
import ProductDetailActions from "../productdetailactions/ProductDetailActions";
import { Product } from "@/app/models/ui/Product";

const SharedProduct = ({ color, size, product }: { color: any, size: any, product: Product }) => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (product.need_token) {
      setIsInputVisible(true);
      setPlaceholder(product.token_placeholder || "");
    } else {
      setIsInputVisible(false);
    }
  }, [product.need_token, product.token_placeholder]);

  return (
    <>
      {isInputVisible && (
        <ProductTokenInput
          need_token={product.need_token}
          productType={product.type}
          placeholder={placeholder}
        />
      )}
      <ProductDetailActions
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </>
  );
};

export default SharedProduct;
