"use client";

import React, { useState, useEffect } from "react";
import Navlinks from "./Navlinks";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { setUser, clearUser } from "@/app/store/features/auth/authSlice";
import { getCookie, deleteCookie } from "cookies-next";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserProfile = async (token: string) => {
      try {
        const profileResponse = await fetch(
          "https://api.muslimanshop.com/api/user/profile/",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          },
        );

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userProfile = await profileResponse.json();
        dispatch(setUser(userProfile));
        setBalance(userProfile.balance);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (!user) {
      const storedUser = getCookie("userProfile");
      const userToken = getCookie("userToken");

      if (storedUser && userToken) {
        const parsedUser = JSON.parse(storedUser as string);
        dispatch(setUser(parsedUser));
        setBalance(parsedUser.balance);
        fetchUserProfile(JSON.parse(userToken as string));
      }
    } else {
      setBalance(parseFloat(user.balance));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    deleteCookie("userProfile");
    deleteCookie("userToken");
  };

  return (
    <div className="bg-[#1E201E] px-4">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        <Navlinks />
        <div className="flex items-center space-x-6 whitespace-nowrap text-[#fff] py-4">
          <NotificationsNoneIcon className="cursor-pointer hover:bg-yellow-500 hover:text-black rounded-full transition-all duration-500" />
          <div className="flex items-center">
            {user ? (
              <>
                <span className="flex text-4 items-center cursor-pointer hover:text-yellow-400 transition-all duration-300">
                  <Person2Icon className="mr-2 hover:bg-yellow-500 hover:text-black rounded-full transition-all duration-500" />
                  {user?.first_name} ({balance} ₼)
                </span>
                <span className="mx-1"> / </span>
                <Link
                  href={"/"}
                  onClick={handleLogout}
                  className="flex text-4 cursor-pointer hover:text-yellow-400 transition-all duration-300"
                >
                  <LogoutIcon className="mr-2" />
                  <span className="hidden xl:visible"> Hesabdan çıx </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/auth/login"}
                  className="flex text-4 cursor-pointer hover:text-yellow-400 transition-all duration-300"
                >
                  <Person2Icon className="mr-2 hover:bg-yellow-500 hover:text-black rounded-full transition-all duration-500" />
                  Daxil ol
                </Link>
                <span className="mx-1"> / </span>
                <Link
                  href={"/auth/signup"}
                  className="flex text-4 cursor-pointer hover:text-yellow-400 transition-all duration-300"
                >
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
