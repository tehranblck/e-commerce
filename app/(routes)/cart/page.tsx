"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/app/models/ui/Product";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeProduct } from "@/app/store/features/product/productSlice";
import { RootState } from "@/app/store/store";
import Link from "next/link";

const ShoppingCart = () => {
  const products = useSelector(
    (state: Product[] | any) => state.product.products,
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const calculateSingleProductTotalPrice = (product: Product) => {
    return product.price * (product?.quantity ?? 0);
  };

  const calculateTotalAmount = (products: Product[]) => {
    let totalAmount = 0;
    products.map((product: Product) => {
      totalAmount += product.price * (product?.quantity ?? 0);
    });
    return totalAmount;
  };

  

  return (
    <section className="bg-[#121212] py-6">
      <div className=" flex items-center justify-center w-full">
        <h1 className="text-[42px] text-[#fff]">Səbət</h1>
      </div>

      <div
        className={`${
          products.length > 0 ? "justify-between" : "justify-center"
        } flex flex-col lg:flex-row  max-w-[1280px] mx-auto pt-10 border-none px-2 space-x-0 lg:space-x-1`}
      >
        <div className="overflow-x-auto w-full xl:w-[800px] rounded-md">
          {products.length > 0 ? (
            <table className="min-w-full bg-[#1E201E] border-none">
              <thead className="bg-black text-white">
                <tr>
                  <th className="w-1/4 py-3 px-6 text-left ">Məhsul</th>
                  <th className="w-1/4 py-3 px-6 text-left">Qiymət</th>
                  <th className="w-1/4 py-3 px-6 text-left">Ədəd</th>
                  <th className="w-1/4 py-3 px-6 text-left">Ümumi</th>
                  <th className="w-1/4 py-3 px-6 text-left">Sil</th>
                </tr>
              </thead>

              <tbody className="">
                {products.map((product: Product) => (
                  <tr
                    key={product.id}
                    className="text-white border-b-[1.2px]  border-b-black"
                  >
                    <td className="py-4 px-6 ">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.title}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <span className="ml-4 xl:w-[180px] hidden xl:table-cell">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      {product.price.toFixed(2)} AZN
                    </td>
                    <td className="py-3 px-6">{product.quantity}</td>
                    <td className="py-3 px-6">
                      {calculateSingleProductTotalPrice(product).toFixed(2)} Azn
                    </td>
                    <td
                      onClick={() => dispatch(removeProduct(product))}
                      className="py-3 px-6 cursor-pointer"
                    >
                      <DeleteIcon className="text-red-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex text-xl text-white py-4 items-center w-full justify-center ">
              Səbət Boşdur!
            </div>
          )}
        </div>
        {products.length > 0 && (
          <div className="text-[#fff] bg-[#1E201E] px-10  rounded-md py-5 md:h-[200px] w-full md:w-[370px] mt-4 lg:mt-0 flex flex-col items-center justify-between ">
            <div className="flex items-center justify-center">
              <h2 className="text-xl text-indigo-500 pb-4 ">Səbət İcmalı</h2>
            </div>

            <div className="flex flex-col space-between w-full ">
              <div className="flex flex-col justify-center items-center w-full md:w-[300px] border-[2px] border-[#282828]  rounded-md py-2 ">
                <span className="bg-[#]">Ödəniləcək Məbləğ</span>
                <span>{calculateTotalAmount(products).toFixed(2)}</span>
              </div>
              {user != undefined ? (
                <div className="flex flex-col mt-2 justify-center bg-yellow-500 hover:bg-white transition-all duration-300  text-black font-bold cursor-pointer items-center w-full md:w-[300px] border-[2px] border-[#282828]  rounded-md py-2 ">
                  <Link href={"/balance"} className="">
                    Kartla Ödə
                  </Link>
                </div>
              ) : (
                <Link
                  href={"/auth/login"}
                  className="flex flex-col mt-2 justify-center bg-transparent  transition-all duration-300  text-black font-bold cursor-pointer items-center w-full md:w-[300px] border-[2px] border-[#282828]  rounded-md py-2 "
                >
                  <span className="text-red-500">Daxil Ol</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;
