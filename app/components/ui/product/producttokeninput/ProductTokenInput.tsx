import React from "react";

type Props = {
  pubgId: string;
  productType: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; // Opsiyonel placeholder
  need_token: boolean; // need_token bilgisi
};

const ProductTokenInput = ({
  pubgId,
  productType,
  onchange,
  placeholder,
  need_token,
}: Props) => {
  console.log(productType);

  return (
    <input
      required
      type="text"
      className={`${!pubgId ? "border-[1px] border-red-500" : ""
        } w-full rounded-md border-[1px] border-[#282828] dark:text-white text-black dark:bg-[#1e1e1e] p-2 placeholder-black dark:placeholder-white`}
      placeholder={need_token ? placeholder : ""}
      value={pubgId}
      onChange={onchange}
    />
  );
};

export default ProductTokenInput;
