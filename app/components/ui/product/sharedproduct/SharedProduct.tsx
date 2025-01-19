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
    <div className="space-y-6">
      {isInputVisible && (
        <ProductTokenInput
          need_token={product.need_token}
          productType={product.type}
          placeholder={placeholder}
        />
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Rəng seçin
          </label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.name)}
                className={`
                  w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${selectedColor === color.name ? 'border-yellow-500 scale-110' : 'border-transparent'}
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500
                `}
                style={{ backgroundColor: color.code }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Ölçü seçin
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.name)}
                className={`
                  px-4 py-2 rounded-md border transition-all duration-300
                  ${selectedSize === size.name
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                  }
                  hover:bg-yellow-500 hover:text-white hover:border-yellow-500
                  focus:outline-none focus:ring-2 focus:ring-yellow-500
                `}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProductDetailActions
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </div>
  );
};

export default SharedProduct;
