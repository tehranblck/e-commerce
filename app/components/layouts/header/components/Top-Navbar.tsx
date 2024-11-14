// TopNavbar.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
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
import ProfileModal from "./ProfileModal";
import Navlinks from "./Navlinks";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [balance, setBalance] = useState<number | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const handleLogout = useLogout();
  const modalRef = useRef<HTMLDivElement>(null); // Modal reference for outside click handling
  const buttonRef = useRef<HTMLButtonElement>(null); // Button reference

  // Fetch user data (similar logic from your previous code)
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

  // Toggle Profile Modal
  const toggleProfileModal = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click from propagating to the document
    setIsProfileModalOpen((prev) => !prev);
  };

  // Close modal when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsProfileModalOpen(false);
    }
  };

  // Manage event listener for clicks outside the modal
  useEffect(() => {
    if (isProfileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileModalOpen]);

  return (
    <div className="dark:bg-[#1E201E] bg-white px-4 relative">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        <Navlinks />
        <div className="flex items-center space-x-4 whitespace-nowrap dark:text-[#fff] py-4">
          <Switch />
          <NotificationsDropdown />

          <div className="flex items-center relative">
            {user ? (
              <div className="relative flex">
                {isProfileModalOpen && (
                  <div ref={modalRef}>
                    <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
                  </div>
                )}
                <button
                  ref={buttonRef}
                  onClick={toggleProfileModal} // Toggle modal on click
                  className="flex items-center cursor-pointer hover:text-yellow-400 transition-all duration-300"
                >
                  <Person2Icon className="mr-2 rounded-full transition-all duration-500" />
                  {user?.first_name} ({balance} ₼)
                </button>
                <span className="mx-1"> / </span>
                <Link
                  href={"/"}
                  onClick={handleLogout}
                  className="flex cursor-pointer transition-all duration-300"
                >
                  <LogoutIcon className="mr-2" />
                  <span className="hidden xl:visible"> Hesabdan çıx </span>
                </Link>
              </div>
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
