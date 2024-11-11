'use client'
import React, { useState, useEffect } from "react";
import Navlinks from "./Navlinks";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { setUser } from "@/app/store/features/auth/authSlice";
import { getCookie } from "cookies-next";
import { fetchUserProfile } from "@/app/services/auth/loginService";
import { useLogout } from "@/app/hooks/useLogout";
import Switch from "@/app/components/ThemeToggler";
import NotificationsDropdown from "@/app/components/Notifications";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [balance, setBalance] = useState<number | null>(null);
  const handleLogout = useLogout();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedUser = getCookie("userProfile");
        const userToken = getCookie("userToken");

        if (storedUser && userToken) {
          const parsedUser = JSON.parse(storedUser as string);
          dispatch(setUser(parsedUser));
          setBalance(parsedUser.balance);
          const userProfile = await fetchUserProfile(
            JSON.parse(userToken as string),
          );
          dispatch(setUser(userProfile));
          setBalance(userProfile.balance);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    };

    if (!user) {
      initializeUser();
    } else {
      setBalance(parseFloat(user.balance));
    }
  }, [dispatch, user]);

  return (
    <div className="dark:bg-[#1E201E] bg-white px-4 relative">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        <Navlinks />
        <div className="flex items-center space-x-6 whitespace-nowrap dark:text-[#fff] py-4">
          <Switch />
          <NotificationsDropdown /> {/* Bildirim bileşeni */}
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
                  <span className="hidden xl:visible"> Hesabdan çık </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/auth/login"}
                  className="relative transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white"
                >
                  <Person2Icon className="mr-2 hover:bg-yellow-500 hover:text-black rounded-full transition-all duration-500" />
                  Daxil ol
                </Link>
                <span className="mx-1"> </span>
                <Link
                  href={"/auth/signup"}
                  className="relative transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white"
                >
                  Qeydiyyat
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
