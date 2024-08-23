import { Product } from "@/app/models/ui/Product";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UseSelector } from "react-redux";

const ProductCard = ({ productData }: { productData: Product }) => {
  return (
    <Link href={`/${productData.id}`} className=" mx- md:mx-0 my-2">
      <div className="bg-[#181818] py-4 px-8 rounded-md">
        <div className="overflow-hidden w-[210px] h-[240px] md:w-[150px] md:h-[170px] rounded-md transform transition-transform duration-300 ease-in-out hover:scale-105">
          <img
            src={productData.image}
            className="w-full h-full object-cover rounded-md "
            alt={productData.title}
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-4">  
          <h2 className="text-[#fff] text-sm">{productData.title}</h2>
          <span className="text-indigo-500 text-sm">
            {productData.price.toFixed(2)} Azn
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
