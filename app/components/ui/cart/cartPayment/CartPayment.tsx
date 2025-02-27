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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();

  const validateAzerbaijanPhoneNumber = (phone: string) => {
    // Azerbaycan telefon numarası formatı: +994 XX XXX XX XX
    const phoneRegex = /^(\+994|0)(50|51|55|70|77|99)[0-9]{7}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (value && !validateAzerbaijanPhoneNumber(value)) {
      setPhoneError("Düzgün Azərbaycan nömrəsi daxil edin (+994 XX XXX XX XX)");
    } else {
      setPhoneError("");
    }
  };

  const calculateTotalAmount = (products: Product[]) => {
    let totalAmount = 0;
    products.forEach((product: Product) => {
      totalAmount += product.price * (product?.quantity ?? 0);
    });
    return totalAmount;
  };

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handlePaymentSubmit = async () => {
    if (!token) {
      toast.error("Zəhmət olmasa daxil olun", {
        position: "top-left",
      });
      router.push('/auth/login');
      return;
    }

    if (!phoneNumber || !validateAzerbaijanPhoneNumber(phoneNumber)) {
      toast.error("Zəhmət olmasa düzgün telefon nömrəsi daxil edin", {
        position: "top-left",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const basketItems = products.map((product: Product) => ({
        product: product.id,
        quantity: product.quantity,
        product_token: "123",
        key: "123",
        size: product.selectedSize,
        color: product.selectedColor
      }));

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body: JSON.stringify({
          items: basketItems,
          phone_number: phoneNumber.replace(/\s+/g, '') // Boşlukları kaldır ve doğru key adını kullan
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ödəniş xətası baş verdi");
      }

      dispatch(clearBasket());
      toast.success("Ödəniş uğurla başa çatdı", {
        position: "top-left",
      });

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
        <div className="text-[#fff] bg-[#121212] px-10 mb-5 lg:mb-10 rounded-md py-5  w-full md:w-[370px] mt-4 lg:mt-0 flex flex-col items-center justify-between">
          <div className="flex items-center justify-center">
            <h2 className="text-xl text-indigo-500 pb-4">Səbət İcmalı</h2>
          </div>

          <div className="flex flex-col space-between w-full">
            <div className="flex flex-col justify-center items-center w-full md:w-[300px] border-[2px] border-[#282828] rounded-md py-2">
              <span>Ödəniləcək Məbləğ</span>
              <span>{calculateTotalAmount(products).toFixed(2) + " AZN"}</span>
            </div>

            <div className="flex flex-col w-full md:w-[300px] mt-4">
              <label htmlFor="phone" className="text-sm text-gray-300 mb-1">
                Əlaqə üçün telefon nömrənizi qeyd edin
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="+994 XX XXX XX XX"
                  className="w-full px-3 py-2 bg-[#1f1f1f] text-white border-[2px] border-[#282828] rounded-md focus:outline-none focus:border-yellow-500 placeholder:text-gray-500"
                  required
                />
                {phoneNumber && !phoneError && validateAzerbaijanPhoneNumber(phoneNumber) && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                    ✓
                  </span>
                )}
              </div>
              {phoneError && (
                <span className="text-red-500 text-xs mt-1">{phoneError}</span>
              )}
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
