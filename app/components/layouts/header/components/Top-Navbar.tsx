import React from "react";
import Navlinks from "./Navlinks";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

const TopNavbar = () => {
  return (
    <div className="bg-[#1E201E] px-4 ">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        <Navlinks />
        <div className="flex items-center space-x-6 whitespace-nowrap text-[#fff] py-4">
          <NotificationsNoneIcon className="cursor-pointer hover:bg-yellow-500 hover:text-black rounded-full transition-all  duration-500" />
         <div className="flex items-center">
          <Link href={"/auth/login"} className="flex text-4 cursor-pointer  hover:text-yellow-400 transition-all duration-300">
            <Person2Icon className="mr-2 hover:bg-yellow-500 hover:text-black rounded-full transition-all  duration-500" />
            {/* user (0 ₼) */}Daxil ol
          </Link>
          <span className="mx-1"> / </span>
          <Link href={"/auth/signup"} className="flex text-4 cursor-pointer hover:text-yellow-400 transition-all duration-300">
            Qeydiyyatdan keç
          </Link>
          </div>

          <Link href={"/"} className="flex tet-4 cursor-pointer">
            <LogoutIcon className="mr-2 " />
            <span className="hidden md:block">Hesabdan çıx</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
