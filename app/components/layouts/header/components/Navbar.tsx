"use client";

import React, { useState, useEffect } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import Logo from "../../../../../public/assets/images/MUSLIMANSHOP-LOGO.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import InputSearch from "./İnput";

const Navbar = () => {
  const [categories, setCategories] = useState<string[]>([]); // Kategoriler
  const products = useSelector((state: any) => state.product.products); // Redux'dan ürünleri al
  const router = useRouter();

  // Tam eşleşme arama fonksiyonu
  const handleExactMatchSearch = (query: string) => {
    // Backend'den içerik çekmek için bir API çağrısı yapılabilir
  };

  // Genel arama fonksiyonu
  const handleSearch = (query: string) => {
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  // Kategorileri LocalStorage'dan al
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      const parsedCategories = JSON.parse(savedCategories);
      const categoryNames = parsedCategories.map(
        (category: { name: string }) => category.name
      );
      setCategories(categoryNames);
    }
  }, []);

  return (
    <nav className="dark:bg-[#151515] bg-white px-4">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto text-[#fff] py-2 md:space-y-0 flex-col md:flex-row">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href={"/"}>
            <Image
              src={Logo}
              width={150}
              height={150}
              className="text-yellow-600"
              alt="logo"
            />
          </Link>
        </div>

        {/* Arama Kutusu */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <InputSearch
            dataset={categories}
            onSearch={handleSearch}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Balance Link */}
          <Link
            href={"/balance"}
            className="transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white relative text-sm md:text-base"
          >
            <span>
              <AccountBalanceWalletIcon className="mr-2" />
              Balans
            </span>
          </Link>

          {/* Cart Link */}
          <Link
            href={"/cart"}
            className="relative transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white text-sm md:text-base"
          >
            <p className="w-full">
              <span className="text-[#fff] bg-indigo-500 rounded-full px-2 absolute top-[-10px] right-[-10px] text-xs">
                {products?.length || 0}
              </span>
              <ShoppingCartIcon className="mr-2" />
              Səbət
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
