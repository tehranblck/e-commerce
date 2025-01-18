'use client';
import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";

type Notification = {
    id: number;
    message: string;
    created_at: string;
    is_read: boolean;
};

const NotificationsDropdown = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [hasNewNotification, setHasNewNotification] = useState<boolean>(false);
    const token = typeof window !== "undefined" && localStorage.getItem("token");

    const fetchNotifications = async () => {
        if (!token) {
            console.error("Token bulunamadı. Kullanıcı giriş yapmamış.");
            return;
        }

        try {
            const response = await fetch(`https://admin.raelli.az/api/user/notifications/`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`, // Bearer eklenmeli
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Bildirimlər alınırken hata:", errorMessage);
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setNotifications(data.results || []);

            const hasUnread = data.results?.some((notification: Notification) => !notification.is_read);
            setHasNewNotification(hasUnread);
        } catch (error) {
            console.error("Bildirimləri çəkərkən xəta baş verdi:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                await fetchNotifications();
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchNotifications();
        }, 60000);

        return () => clearInterval(interval); // Temizlik
    }, [token]);

    const markAllAsRead = () => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => ({ ...notification, is_read: true }))
        );
        setHasNewNotification(false);
    };

    const unreadCount = notifications.filter(notification => !notification.is_read).length;

    return (
        <Menu as="div" className="relative dark:text-[#9b936c] text-white inline-block text-left">
            <div className="relative">
                <Menu.Button className="cursor-pointer flex items-center hover:bg-yellow-500 hover:text-black rounded-full transition-all duration-500 sm:p-2">
                    <Badge
                        badgeContent={unreadCount > 0 ? unreadCount : null}
                        color="error"
                        overlap="circular"
                        invisible={!hasNewNotification && unreadCount === 0}
                    >
                        <NotificationsNoneIcon />
                    </Badge>
                </Menu.Button>
            </div>

            <Menu.Items className="absolute -right-[200px] sm:right-0 mt-2 w-80 origin-top-right bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
                <div className="px-4 py-2 flex justify-between items-center">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Bildirimlər</span>
                    <button
                        onClick={markAllAsRead}
                        className="text-blue-500 text-sm hover:underline"
                    >
                        Oxundu olaraq işarələ
                    </button>
                </div>

                <div className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <Menu.Item key={notification.id}>
                                {({ active }) => (
                                    <div
                                        className={`flex flex-col px-4 py-3 ${active ? "bg-gray-100 dark:bg-gray-700" : ""
                                            } ${notification.is_read ? "text-gray-500" : "text-gray-800 dark:text-gray-100"}`}
                                    >
                                        <span className="text-sm">{notification.message}</span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(notification.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </Menu.Item>
                        ))
                    ) : (
                        <div className="px-4 outline-none py-3 text-gray-500 text-center">Yeni bildirim yoxdur</div>
                    )}
                </div>
            </Menu.Items>
        </Menu>
    );
};

export default NotificationsDropdown;
