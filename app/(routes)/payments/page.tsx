'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Payment = {
    receipt_image: string;
    claimed_amount: string;
};

const PaymentsPage: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('https://api.muslimanshop.com/api/user/receipt/', {
                    method: 'GET',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }

                const data = await response.json();
                setPayments(data.results);
            } catch (error) {
                setError('An error occurred while fetching payments.');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [token]);

    // Function to open image modal
    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    // Function to close image modal
    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className=" bg-gray-100 dark:bg-[#151515] text-gray-800 dark:text-white sm:py-46 md:40 py-56">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold mb-6">Ödənişlərim</h1>

                {loading ? (
                    <p className="text-center">Yüklənir...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : payments.length > 0 ? (
                    <div className="space-y-4">
                        {payments.map((payment, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-[#1E201E] p-6 rounded-lg shadow-md flex items-center space-x-4"
                            >
                                <Image width={100} height={100}
                                    src={payment.receipt_image}
                                    alt={`Receipt ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded cursor-pointer"
                                    onClick={() => openImageModal(payment.receipt_image)} // Open image modal on click
                                />
                                <div>
                                    <p className="text-lg font-medium">Tamamlanmış ödəmə: {payment.claimed_amount} ₼</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-16">Ödəmə tapılmadı.</p>
                )}
            </div>

            {/* Modal for viewing image */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closeImageModal} // Close modal when clicking outside the image
                >
                    <div className="relative flex items-center">
                        <Image width={500}
                            height={500}
                            src={selectedImage}
                            alt="Selected Receipt"
                            className="max-w-[90vw] max-h-[80vh] mt-32 rounded shadow-lg"
                            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the image
                        />
                        <button
                            onClick={closeImageModal}
                            className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentsPage;
