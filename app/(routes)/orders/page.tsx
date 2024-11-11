'use client'
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import OrderDetailsModal from "./orderDetails";

type Order = {
    id: number;
    productName: string;
    price: number;
    purchaseDate: string;
    status: string;
    details: string;
    quantity: number;
    shippingAddress: string;
    estimatedDelivery: string;
    paymentMethod: string;
};

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: 1,
            productName: "Product A",
            price: 49.99,
            purchaseDate: "2023-10-01",
            status: "Tamamlanıb",
            details: "This order includes 2 items with free shipping and a 1-year warranty.",
            quantity: 2,
            shippingAddress: "123 Elm St, Baku, Azerbaijan",
            estimatedDelivery: "2023-10-15",
            paymentMethod: "Credit Card"
        },
        {
            id: 2,
            productName: "Product B",
            price: 29.99,
            purchaseDate: "2023-10-05",
            status: "Tamamlanıb",
            details: "This order is currently being shipped and is expected to arrive within 5 days.",
            quantity: 1,
            shippingAddress: "456 Oak St, Ganja, Azerbaijan",
            estimatedDelivery: "2023-10-12",
            paymentMethod: "PayPal"
        },
        {
            id: 3,
            productName: "Product C",
            price: 99.99,
            purchaseDate: "2023-10-10",
            status: "Tamamlanıb",
            details: "This order is currently being processed and will ship within the next 2 days.",
            quantity: 3,
            shippingAddress: "789 Pine St, Sumgait, Azerbaijan",
            estimatedDelivery: "2023-10-20",
            paymentMethod: "Debit Card"
        },
    ]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleOpen = (order: Order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="min-h-screen dark:bg-[#151515] text-gray-800 dark:text-white bg-white py-6 pt-[200px] lg:pt-[150px]">
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
