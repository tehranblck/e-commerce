"use client";
import React, { useState, useEffect } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Image from "next/image";
import Logo from "../../../../../public/assets/images/MUSLIMANSHOP-LOGO.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { fetchUserProfile } from "@/app/services/auth/loginService";
import { useRouter } from "next/navigation";
import { useLogout } from "@/app/hooks/useLogout";

const Navbar = () => {
  const [balancePopupOpen, setBalancePopupOpen] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string; balance: string } | null>(null);
  const [loading, setLoading] = useState(true); // loading state ekledik
  const products = useSelector((state: any) => state.product.products);
  const auth = localStorage.getItem('token')
  const router = useRouter();
  const logout = useLogout();

  useEffect(() => {
    const token = localStorage.getItem("token"); // `localStorage` erişimi
    if (token) {
      const getUserData = async () => {
        try {
          const profile = await fetchUserProfile(token);
          setUserData({
            name: profile.first_name,
            email: profile.email,
            balance: profile.balance,
          });
        } catch (error) {
          console.error("Kullanıcı verisi yüklenirken hata oluştu:", error);
        } finally {
          setLoading(false); // Yüklenme işlemi tamamlandı
        }
      };
      getUserData();
    } else {
      setLoading(false); // Eğer token yoksa bile yüklenme işlemi tamamlanır
    }
  }, [logout, userData, auth]);

  const toggleBalancePopup = () => {
    setBalancePopupOpen(!balancePopupOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setBalancePopupOpen(false);
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="dark:bg-[#151515] bg-white px-4 xl:px-0">
      <div className="flex items-center justify-between max-w-[1280px] lg:h-[70px] mx-auto text-[#fff] py-2">
        <Link href={"/"}>
          <Image
            src={Logo}
            width={220}
            height={220}
            className="text-yellow-600"
            alt="logo"
          />
        </Link>
        <div className="sm:space-x-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row relative">
          {/* Balans Butonu */}
          <button
            onClick={toggleBalancePopup}
            className="transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white relative"
          >
            <span>
              <AccountBalanceWalletIcon className="mr-2" />
              Balans
            </span>
          </button>

          {/* Gelişmiş Balans Popup */}
          {balancePopupOpen && (
            <div
              className="transform scale-100 opacity-100 transition-transform duration-300 ease-out absolute top-[50px] right-12 sm:right-24 sm:left-[-80%] z-50 w-[250px] bg-white dark:bg-[#1E201E] p-6 rounded-lg shadow-lg"
            >
              {loading ? (
                <p className="text-center text-md dark:text-gray-200 mb-2">
                  Yükleniyor...
                </p>
              ) : userData ? (
                <div className="text-md dark:text-gray-200 space-y-4">
                  <div className="flex items-center space-x-2">
                    <PersonIcon className="text-gray-600 dark:text-yellow-400" />
                    <span>{userData.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EmailIcon className="text-gray-600 dark:text-yellow-400" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MonetizationOnIcon className="text-gray-600 dark:text-yellow-400" />
                    <span className="font-medium">Balans:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{userData.balance} ₼</span>
                  </div>
                  <Link
                    href="/orders"
                    className="flex items-center justify-center space-x-2 mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    <AssignmentIcon />
                    <span>Sifarişlərim</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    <ExitToAppIcon />
                    <span>Hesabdan Çıx</span>
                  </button>
                </div>
              ) : (
                <p className="text-center text-md dark:text-gray-200 mb-2">
                  Kullanıcı bilgisi alınamadı.
                </p>
              )}
              <button
                onClick={() => setBalancePopupOpen(false)}
                className="mt-4 w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition duration-300"
              >
                Kapat
              </button>
            </div>
          )}

          <Link
            href={"/cart"}
            className="relative transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white"
          >
            <p className="w-full top-0">
              <span className="text-[#fff] bg-indigo-500 rounded-full px-1 absolute top-[-10px] right-[-10px]">
                {products.length !== 0 && products.length}
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
