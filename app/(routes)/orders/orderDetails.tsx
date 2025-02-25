"use client";

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';

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

interface OrderDetailsModalProps {
    open: boolean;
    onClose: () => void;
    order: Order | null;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ open, onClose, order }) => {
    if (!order) return null;

    const totalAmount = order.items.reduce((total, item) =>
        total + (parseFloat(item.price_at_purchase) * item.quantity), 0
    ).toFixed(2);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="mt-3 sm:mt-5">
                                        <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 dark:text-white mb-4">
                                            Sifariş № {order.id}
                                        </Dialog.Title>

                                        <div className="mb-6 space-y-2">
                                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                                <span>Tarix:</span>
                                                <span>{format(new Date(order.created_at), 'dd.MM.yyyy HH:mm')}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">Status:</span>
                                                <div className="flex space-x-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${order.is_payed
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        }`}>
                                                        {order.is_payed ? 'Ödənilib' : 'Ödənilməyib'}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${order.is_done
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                        }`}>
                                                        {order.is_done ? 'Tamamlandı' : 'Gözləmədə'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="py-4">
                                                    <div className="flex justify-between">
                                                        <div className="space-y-1">
                                                            <h4 className="text-base font-medium text-gray-900 dark:text-white">
                                                                {item.product_title}
                                                            </h4>
                                                            <div className="flex items-center space-x-4">
                                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                    Ölçü: {item.size_name}
                                                                </p>
                                                                <div className="flex items-center">
                                                                    <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                                                                        Rəng:
                                                                    </span>
                                                                    <div
                                                                        className="w-4 h-4 rounded-full border border-gray-300"
                                                                        style={{ backgroundColor: item.color_code }}
                                                                        title={item.color_name}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-base font-medium text-gray-900 dark:text-white">
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

                                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex justify-between items-center">
                                                <span className="text-base font-medium text-gray-900 dark:text-white">
                                                    Ümumi məbləğ:
                                                </span>
                                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {totalAmount} AZN
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md bg-[#988d57] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#827749] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#988d57]"
                                        onClick={onClose}
                                    >
                                        Bağla
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default OrderDetailsModal;
