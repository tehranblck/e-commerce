import React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import Logo from "../../../../../public/assets/svg/MS.svg";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" bg-[#151515] px-4 xl:px-0">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto text-[#fff] py-2">
        <span>
          <Image
            src={Logo}
            width={120}
            height={120}
            className="text-yellow-600 "
            alt="logo"
          />
        </span>
        <div className="sm:space-x-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row">
          <Link
            href={"/balance"}
            className=" transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white "
          >
            <span>
              <AccountBalanceWalletIcon className="mr-2" />
              Balans
            </span>
          </Link>
          <Link
            href={"/cart"}
            className=" transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white"
          >
            <span>
              <ShoppingCartIcon className="mr-2" />
              Səbət
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
