// components/ProfileModal.tsx
import React, { forwardRef } from "react";
import Link from "next/link";

type ProfileModalProps = {
    onClose: () => void;
};

const ProfileModal = forwardRef<HTMLDivElement, ProfileModalProps>(({ onClose }, ref) => {
    return (
        <div
            ref={ref}
            className="absolute top-14 right-[50%] z-50 w-[250px] transform scale-100 dark:border-[#121212] dark:border-[1px] border-[1px] border-gray-300 opacity-100 transition-transform duration-300 ease-out  sm:right-24 sm:left-[-80%]  bg-white dark:bg-[#1E201E] p-6 rounded-lg shadow-lg bg-white dark:bg-[#1E201E] p-6 rounded-lg shadow-lg"
        >
            <div className="text-md dark:text-gray-200 space-y-4">
                <Link
                    href="/payments"
                    onClick={onClose} // Modali kapat
                    className="flex items-center justify-center space-x-2 mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    <span>Ödənişlərim</span>
                </Link>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition duration-300"
                >
                    Bağla
                </button>
            </div>
        </div>
    );
});

ProfileModal.displayName = "ProfileModal"; // forwardRef için displayName ayarı
export default ProfileModal;
