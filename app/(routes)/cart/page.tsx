import React, { useState } from "react";
import FutureCard from "@/app/components/ui/shared/FutureCard";
import CartItemList from "@/app/components/ui/cart/cartItemList/CartItemList";
import CartPayment from "@/app/components/ui/cart/cartPayment/CartPayment";

const ShoppingCart = () => {
  return (
    <section className="bg-[#121212] py-6">
      <div className=" flex items-center justify-center w-full pt-[190px]  lg:pt-[130px]">
        <h1 className="text-[42px] text-[#fff]">Səbət</h1>
      </div>
      <div
        className={`justify-center flex flex-col lg:flex-row  max-w-[1280px] mx-auto pt-10 border-none px-2 space-x-0 lg:space-x-1`}
      >
        <CartItemList />
        <CartPayment />
      </div>
      <FutureCard />
    </section>
  );
};

export default ShoppingCart;
