import React from "react";


type Props = {
  pubgId: string;
  productType: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// (e) => setPubgId(e.target.value.trim()
const ProductTokenInput = ({ pubgId, productType, onchange }: Props) => {
  return (
    <input
      required
      type="text"
      className={`${!pubgId ? "border-[1px] border-red-500" : ""
        } w-full rounded-md border-[1px] border-[#282828] dark:text-white text-black dark:bg-[#1e1e1e] border-blue- p-2`}
      placeholder={
        productType == "Pubg Mobile" ? `Pubg ID *` : "Mobil nömrə *"
      }
      value={pubgId}
      onChange={onchange}
    />
  );
};

export default ProductTokenInput;
