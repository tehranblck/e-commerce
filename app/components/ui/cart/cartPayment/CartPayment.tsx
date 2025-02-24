"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "@/app/models/ui/Product";
import Link from "next/link";
import { RootState } from "@/app/store/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearBasket } from "@/app/store/features/product/productSlice";

const CartPayment = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();

  const calculateTotalAmount = (products: Product[]) => {
    let totalAmount = 0;
    products.forEach((product: Product) => {
      totalAmount += product.price * (product?.quantity ?? 0);
    });
    return totalAmount;
  };
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  console.log(token)
  const handlePaymentSubmit = async () => {
    if (!token) {
      toast.error("Zəhmət olmasa daxil olun", {
        position: "top-left",
      });
      router.push('/auth/login');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Products:', products);
      const basketItems = products.map((product: Product) => ({
        product: product.id,
        quantity: product.quantity,
        product_token: "123",
        key: "123",
        size: product.selectedSize,
        color: product.selectedColor
      }));
      console.log('Basket Items:', basketItems);

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body: JSON.stringify({ items: basketItems }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ödəniş xətası baş verdi");
      }

      // Başarılı ödeme durumunda
      dispatch(clearBasket());
      toast.success("Ödəniş uğurla başa çatdı", {
        position: "top-left",
      });

      // Eğer API redirect URL döndürüyorsa ona yönlendir
      if (data.redirect_url) {
        router.push(data.redirect_url);
      } else {
        router.push('/orders');
      }

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Ödəniş uğursuz oldu", {
        position: "top-left",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="text-[#fff] bg-[#121212] px-10 mb-5 lg:mb-10 rounded-md py-5 md:h-[200px] w-full md:w-[370px] mt-4 lg:mt-0 flex flex-col items-center justify-between">
          <div className="flex items-center justify-center">
            <h2 className="text-xl text-indigo-500 pb-4">Səbət İcmalı</h2>
          </div>

          <div className="flex flex-col space-between w-full">
            <div className="flex flex-col justify-center items-center w-full md:w-[300px] border-[2px] border-[#282828] rounded-md py-2">
              <span>Ödəniləcək Məbləğ</span>
              <span>{calculateTotalAmount(products).toFixed(2) + " AZN"}</span>
            </div>

            {isSubmitting ? (
              <span className="flex items-center justify-center mt-2">
                <svg
                  className="w-5 h-5 mr-3 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6h2z"
                  ></path>
                </svg>
                Yüklənir...
              </span>
            ) : (
              <button
                onClick={handlePaymentSubmit}
                className="flex flex-col mt-2 justify-center bg-yellow-500 hover:bg-white transition-all duration-300 text-black font-bold cursor-pointer items-center w-full md:w-[300px] border-[2px] border-[#282828] rounded-md py-2"
              >
                <span>Ödə</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPayment;
