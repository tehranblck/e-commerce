// OrderDetailsModal.tsx
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

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

type OrderDetailsModalProps = {
    open: boolean;
    onClose: () => void;
    order: Order | null;
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ open, onClose, order }) => {
    if (!order) return null;

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white dark:bg-[#1E201E] rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-md p-6">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                                    Sifariş Detalları - ID: {order.id}
                                </Dialog.Title>
                                <div className="mt-4">
                                    <p>Ödəniş Statusu: {order.is_payed ? 'Ödənilib' : 'Ödənilməyib'}</p>
                                    <p>Hazırlıq Statusu: {order.is_done ? 'Tamamlandı' : 'Gözləmədə'}</p>
                                    <p>Yaradılma Tarixi: {new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Məhsullar:</h4>
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
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={onClose}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
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
