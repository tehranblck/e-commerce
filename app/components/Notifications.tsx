// NotificationsDropdown.tsx
import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

type Notification = {
    id: number;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
};

const sampleNotifications: Notification[] = [
    {
        id: 1,
        title: "Yeni Mesaj",
        message: "Destekten yeni bir mesaj aldınız.",
        timestamp: "2023-11-05T08:30:00",
        read: false,
    },
    {
        id: 2,
        title: "Sipariş Güncellemesi",
        message: "Siparişiniz #12345 gönderildi.",
        timestamp: "2023-11-04T15:45:00",
        read: false,
    },
];

const NotificationsDropdown = () => {
    const [notifications, setNotifications] = useState(sampleNotifications);

    const markAllAsRead = () => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => ({ ...notification, read: true }))
        );
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="cursor-pointer flex items-center hover:bg-yellow-500 hover:text-black rounded-full transition-all duration-500 p-2">
                    <NotificationsNoneIcon />
                </Menu.Button>
            </div>

            <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
                <div className="px-4 py-2 flex justify-between items-center">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Bildirimler</span>
                    <button
                        onClick={markAllAsRead}
                        className="text-blue-500 text-sm hover:underline"
                    >
                        Tümünü Okundu Yap
                    </button>
                </div>

                <div className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <Menu.Item key={notification.id}>
                                {({ active }) => (
                                    <div
                                        className={`flex flex-col px-4 py-3 ${active ? "bg-gray-100 dark:bg-gray-700" : ""
                                            } ${notification.read ? "text-gray-500" : "text-gray-800 dark:text-gray-100"}`}
                                    >
                                        <span className="font-semibold">{notification.title}</span>
                                        <span className="text-sm">{notification.message}</span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(notification.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </Menu.Item>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-gray-500 text-center">Yeni bildirim yok</div>
                    )}
                </div>
            </Menu.Items>
        </Menu>
    );
};

export default NotificationsDropdown;
