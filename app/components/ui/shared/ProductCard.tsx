import { Product } from "@/app/models/ui/Product";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ productData }: { productData: Product }) => {
  const truncateTitle = (title: string, length: number) => {
    return title?.length > length ? `${title.substring(0, length)}...` : title;
  };

  return (
    <Link href={`/products/${productData.id}/${productData.slug}`} className="md:mx-0 my-2 rounded-md">
      <div className="dark:bg-[#181818] dark:border-0 border-2 border-[#988d57] h-full py-4 px-8 rounded-md lg:w-[] ">
        <div className="overflow-hidden w-full h-full rounded-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(255,255,0,0.6)]">
          <Image
            width={350}
            height={150}
            src={productData.image}
            className="w- h-full object-contain rounded-md  md:w-[200px] max-h-[100px] sm:max-h-[140px] md:max-h-[180px] "
            alt={productData.title}
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <h2 className="dark:text-[#fff] text-white text-sm">
            {truncateTitle(productData.title, 20)}
          </h2>
          <span className="dark:text-indigo-500 text-white text-sm">
            {productData.price?.toFixed(2)} Azn
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
