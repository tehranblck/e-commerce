import Products from "@/app/components/ui/home/products";
import FutureCard from "@/app/components/ui/shared/FutureCard";
import React from "react";

const ProductPage = () => {
  return (
    <section className="bg-[#121212]">
      <div className="pt-[200px] lg:pt-[150px]">
        <div className=" flex items-center justify-center w-full  ">
          <h1 className="text-[42px] text-[#fff]">Produktlar</h1>
        </div>
        <Products isInforBarVisible={false} />
        <FutureCard />
      </div>
    </section>
  );
};

export default ProductPage;
