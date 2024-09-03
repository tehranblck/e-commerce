import { Product } from "@/app/models/ui/Product";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ productData }: { productData: Product }) => {
  const truncateTitle = (title: string, length: number) => {
    return title.length > length ? `${title.substring(0, length)}...` : title;
  };

  return (
    <Link href={`/${productData.id}`} className="md:mx-0 my-2 rounded-md">
      <div className="bg-[#181818] py-4 px-8 rounded-md ">
        <div className="overflow-hidden w-full h-full rounded-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(255,255,0,0.6)]">
          <Image
           width={250}
           height={120}
            src={productData.image}
            className="w-full h-full object-contain rounded-md lg:max-h-[150px] "
            alt={productData.title}
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <h2 className="text-[#fff] text-sm">
            {truncateTitle(productData.title, 20)}
          </h2>
          <span className="text-indigo-500 text-sm">
            {productData.price.toFixed(2)} Azn
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
