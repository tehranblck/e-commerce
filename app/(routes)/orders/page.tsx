'use client';
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import OrderDetailsModal from "./orderDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

type Item = {
    product: number;
    quantity: number;
    product_token: string;
    key: string;
};

type Order = {
    id: number;
    is_payed: boolean;
    is_done: boolean;
    created_at: string;
    items: Item[];
};

const OrdersPage: React.FC = () => {
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
                const response = await fetch(`https://api.muslimanshop.com/api/user/baskets/`, {
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
                console.log(orders)
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

    return (
        <div className="min-h-screen dark:bg-[#151515] text-gray-800 dark:text-white bg-white py-6 ">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold mb-6">Sifarişlərim</h1>

                {loading ? (
                    <p className="text-center">Yüklənir...</p>
                ) : orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white dark:bg-[#1E201E] p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">Sifariş ID: {order.id}</h2>
                                    <span className={`text-sm font-medium ${order.is_done ? "text-green-500" : "text-red-500"}`}>
                                        {order.is_done ? 'Tamamlandı' : 'Gözləmədə'}
                                    </span>
                                </div>
                                <div className="text-sm mt-2">
                                    <p>Ödəniş Statusu: {order.is_payed ? 'Ödənilib' : 'Ödənilməyib'}</p>
                                    <p>Yaradılma Tarixi: {new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                                {/* <div className="mt-4 space-y-2">
                                    <h3 className="font-medium">Məhsullar:</h3>
                                    {order.items.length > 0 ? (
                                        order.items.map((item, index) => (
                                            <div key={index} className="pl-4 text-sm border-l-2 border-gray-300">
                                                <p>Məhsul ID: {item.product}</p>
                                                <p>Miqdarı: {item.quantity}</p>
                                                <p>Token: {item.product_token}</p>
                                                <p>Açar: {item.key}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">Məhsul yoxdur.</p>
                                    )}
                                </div> */}
                                <button
                                    onClick={() => handleOpen(order)}
                                    className="mt-4 bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
                                >
                                    Detallar
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <ShoppingCartIcon className="text-yellow-500 text-6xl mb-4" />
                        <p className="text-lg">Sifarişiniz yoxdur.</p>
                        <Link href="/products">
                            <button className="mt-4 bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition">
                                Məhsullara get.
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            <OrderDetailsModal open={open} onClose={handleClose} order={selectedOrder} />
        </div>
    );
};

export default OrdersPage;
