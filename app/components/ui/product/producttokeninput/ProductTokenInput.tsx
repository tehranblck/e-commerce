import React from "react";

type Props = {
  productType: string;
  placeholder?: string;
  need_token: boolean;
};

const ProductTokenInput = ({
  productType,
  placeholder,
  need_token,
}: Props) => {
  return (
    <input
      type="text"
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder || `${productType} ID'nizi girin`}
    />
  );
};

export default ProductTokenInput;
