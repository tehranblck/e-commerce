'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

type Order = {
    id: number;
    productName: string;
    price: number;
    purchaseDate: string;
    status: string;
};

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]); // Set as empty array for now
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating data loading delay
        setTimeout(() => {
            setLoading(false); // Stop loading after delay
        }, 1000);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#151515] text-gray-800 dark:text-gray-200">
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
                                    <h2 className="text-lg font-semibold">{order.productName}</h2>
                                    <span className="text-sm text-green-500 font-medium">{order.status}</span>
                                </div>
                                <div className="text-sm mt-2">
                                    <p className="dark:text-gray-400">Sifariş ID: {order.id}</p>
                                    <p className="dark:text-gray-400">Qiymət: {order.price} ₼</p>
                                    <p className="dark:text-gray-400">
                                        Alinma tarixi: {new Date(order.purchaseDate).toLocaleDateString()}
                                    </p>
                                </div>
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
        </div>
    );
};

export default OrdersPage;
