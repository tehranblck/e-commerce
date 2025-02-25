"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import OrderDetailsModal from "./orderDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface OrderItem {
    id: number;
    color: number;
    color_code: string;
    color_name: string;
    created_at: string;
    key: string | null;
    price_at_purchase: string;
    product: number;
    product_price: string;
    product_title: string;
    product_token: string;
    quantity: number;
    size: number;
    size_name: string;
}

interface Order {
    id: number;
    created_at: string;
    is_done: boolean;
    is_payed: boolean;
    items: OrderItem[];
}

const OrdersPage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user || !token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://admin.raelli.az/api/shops/basket/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await response.json();
                setOrders(data.results);
                console.log(data.results)
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, token]);

    const handleOpen = (order: Order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#988d57] border-t-transparent"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-xl text-gray-600 dark:text-gray-400">Sifariş tapılmadı</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-200 dark:text-white">Sifarişlərim</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Sifariş № {order.id}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Tarix: {format(new Date(order.created_at), 'dd.MM.yyyy HH:mm')}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <span className={`px-3 py-1 rounded-full text-sm ${order.is_payed
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    }`}>
                                    {order.is_payed ? 'Ödənilib' : 'Ödənilməyib'}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm ${order.is_done
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    }`}>
                                    {order.is_done ? 'Tamamlandı' : 'Gözləmədə'}
                                </span>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                {item.product_title}
                                            </h3>
                                            <div className="mt-1 flex items-center space-x-4">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Ölçü: {item.size_name}
                                                </p>
                                                <div className="flex items-center">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                                                        Rəng:
                                                    </span>
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: item.color_code }}
                                                        title={item.color_name}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-medium text-gray-900 dark:text-white">
                                                {item.price_at_purchase} AZN
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Miqdar: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between">
                                <span className="text-lg font-medium text-gray-900 dark:text-white">
                                    Ümumi məbləğ:
                                </span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    {order.items.reduce((total, item) =>
                                        total + (parseFloat(item.price_at_purchase) * item.quantity), 0
                                    ).toFixed(2)} AZN
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleOpen(order)}
                            className="mt-4 bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
                        >
                            Detallar
                        </button>
                    </div>
                ))}
            </div>
            <OrderDetailsModal open={open} onClose={handleClose} order={selectedOrder} />
        </div>
    );
};

export default OrdersPage;
