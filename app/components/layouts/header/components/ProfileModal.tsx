import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";
import { fetchUserProfile } from "@/app/services/auth/loginService";
import { useLogout } from "@/app/hooks/useLogout";



const ProfileModal = ({ onClose }: { onClose: () => void }) => {

    const [userData, setUserData] = useState<{
        name: string;
        email: string;
        balance: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
                    console.error("Error loading user data:", error);
                } finally {
                    setLoading(false);
                }
            };
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = useLogout();

    return (
        <div className="transform scale-100 dark:border-[#121212] dark:border-[1px] border-[1px] border-gray-300 opacity-100 transition-transform duration-300 ease-out absolute top-[50px] right-4 z-50 w-[300px] bg-white dark:bg-[#1E201E] p-6 rounded-lg shadow-lg">
            {loading ? (
                <p className="text-center text-md dark:text-gray-200 text-black mb-2">Yüklənir...</p>
            ) : userData ? (
                <div className="text-md dark:text-gray-200 space-y-4">
                    <div className="flex items-center space-x-2">
                        <PersonIcon className="text-gray-600 dark:text-yellow-400" />
                        <span className="text-black dark:text-white">{userData.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <EmailIcon className="text-gray-600 dark:text-yellow-400" />
                        <span className="text-black dark:text-white">{userData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MonetizationOnIcon className="text-gray-600 dark:text-yellow-400" />
                        <span className="font-medium text-black dark:text-white">Balans:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{userData.balance} ₼</span>
                    </div>
                    <Link
                        href="/orders"
                        onClick={onClose}
                        className="flex items-center justify-center space-x-2 mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        <AssignmentIcon />
                        <span>Sifarişlərim</span>
                    </Link>
                    <Link
                        href={"/balance"}
                        className="flex items-center justify-center space-x-2 mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                        <ExitToAppIcon />
                        <span>Balans Artırma</span>
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
                <p className="text-center text-md dark:text-gray-200 text-black mb-2">Məlumat tapıla bilmədi.</p>
            )}
            <button
                onClick={onClose}
                className="mt-4 w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition duration-300"
            >
                Bağla
            </button>
        </div>
    );
};

export default ProfileModal;
