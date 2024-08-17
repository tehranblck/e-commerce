"use client";

import React, { useState, useEffect } from "react";
import Navlinks from "./Navlinks";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

const TopNavbar = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const getUsername = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://api.muslimanshop.com/api/user/profile/", {
          method: "GET",
          headers: {
            Authorization: token, 
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();
        setUsername(data.first_name); 
      } catch (error) {
        setUsername(null);
      }
    };

    getUsername();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
  };

  return (
    <div className="bg-[#1E201E] px-4 ">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        <Navlinks />
        <div className="flex items-center space-x-6 whitespace-nowrap text-[#fff] py-4">
          <NotificationsNoneIcon className="cursor-pointer hover:bg-yellow-500 hover:text-black rounded-full transition-all  duration-500" />
          <div className="flex items-center">
            {username ? (
              <>
                <span className="flex text-4 items-center cursor-pointer hover:text-yellow-400 transition-all duration-300">
                  <Person2Icon className="mr-2 hover:bg-yellow-500 hover:text-black rounded-full transition-all  duration-500" />
                  {username} (0 ₼)
                </span>
                <span className="mx-1"> / </span>
                <Link href={"/"} onClick={handleLogout} className="flex text-4 cursor-pointer hover:text-yellow-400 transition-all duration-300">
                  <LogoutIcon className="mr-2 " />
                  Hesabdan çıx
                </Link>
              </>
            ) : (
              <>
                <Link href={"/auth/login"} className="flex text-4 cursor-pointer hover:text-yellow-400 transition-all duration-300">
                  <Person2Icon className="mr-2 hover:bg-yellow-500 hover:text-black rounded-full transition-all  duration-500" />
                  Daxil ol
                </Link>
                <span className="mx-1"> / </span>
                <Link href={"/auth/signup"} className="flex text-4 cursor-pointer hover:text-yellow-400 transition-all duration-300">
                  Qeydiyyatdan keç
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
