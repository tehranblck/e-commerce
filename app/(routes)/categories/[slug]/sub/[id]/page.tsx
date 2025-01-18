'use client';
import FutureCard from '@/app/components/ui/shared/FutureCard';
import InformationBar from '@/app/components/ui/shared/InformationBar';
import React, { useEffect, useState } from 'react';
import { fetchCategoryData } from './service';
import { fetchSubtypesById } from './fetchSubtypeInfo';
import Image from 'next/image';

const Page = ({ params }: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState<string>(''); // Category name
    const [loading, setLoading] = useState<boolean>(true);
    const [subtype, setSubtype] = useState<any>(null); // Subtype details
    const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
    const [totalPages, setTotalPages] = useState<number>(1); // Total pages from API
    const [activeTab, setActiveTab] = useState<'about' | 'how_to_use'>('about'); // Default tab set to 'about'
    const { slug } = params;
    const { id } = params;

    useEffect(() => {
        const fetchCategoryProductsAndSubtype = async () => {
            try {
                setLoading(true);

                // Fetch categories
                const categoriesResponse = await fetch(`https://admin.raelli.az/api/products/type/?page_size=20`);
                if (!categoriesResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const categoriesData = await categoriesResponse.json();
                const matchingCategory = categoriesData.results.find((category: any) => category.name === slug);
                if (!matchingCategory) {
                    throw new Error(`Category not found for slug: ${slug}`);
                }

                const categoryId = matchingCategory.id;

                // Fetch subtype details
                const subTypeFetch = await fetchSubtypesById(categoryId);
                setSubtype(subTypeFetch);

                // Fetch products
                const categoryData = await fetchCategoryData(id, categoryId, currentPage);
                setProducts(categoryData.results || []);
                setTotalPages(Math.ceil(categoryData.count / 10)); // Calculate total pages
                setCategoryName(matchingCategory.name);
            } catch (error) {
                console.error('Error fetching category products or subtypes:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchCategoryProductsAndSubtype();
        }
    }, [slug, currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <section className="mx-auto text-center pb-[20px] dark:bg-[#121212]">
            <div className="flex flex-col max-w-[1280px] mx-auto px-4">
                <div className="flex items-center justify-center w-full mb-6">
                    <h1 className="text-[36px] lg:text-[42px] font-semibold dark:text-[#fff]">
                        {loading ? 'Məlumatlar yüklənir...' : categoryName || 'Bu kateqoriya tapılmadı'}
                    </h1>
                </div>
                <InformationBar HasButton={false} title={categoryName || 'Yüklənir...'} />

                {/* Product List */}
                <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-2 mt-4">
                    {!loading && products.length > 0 ? (
                        products.map((product: any) => (
                            <div key={product.id} className="cursor-pointer md:mx-0 my-2 rounded-md">
                                <div className="dark:bg-[#181818] dark:border-0 border-2 h-full py-4 px-8 rounded-md">
                                    <div className="overflow-hidden w-full h-full rounded-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(255,255,0,0.6)]">
                                        <Image
                                            width={350}
                                            height={150}
                                            src={product.image}
                                            className="w-full h-full object-contain rounded-md"
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-center mt-4">
                                        <h2 className="dark:text-[#fff] text-sm">{product.title}</h2>
                                        <span className="text-indigo-500 text-sm">{product.price} AZN</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : loading ? (
                        <p className="text-white text-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                            Yüklənir...
                        </p>
                    ) : (
                        <p className="text-white text-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                            Bu kateqoriyada məhsul tapılmadı.
                        </p>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-1 rounded-md bg-gray-200 dark:bg-[#181818] dark:text-white hover:bg-gray-300 disabled:opacity-50"
                    >
                        Əvvəlki
                    </button>
                    <span className="px-4 py-2 mx-1 rounded-md bg-gray-100 dark:bg-[#181818] dark:text-white">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-1 rounded-md bg-gray-200 dark:bg-[#181818] dark:text-white hover:bg-gray-300 disabled:opacity-50"
                    >
                        Növbəti
                    </button>
                </div>

                {/* Subtype Tabs */}
                {subtype && (
                    <div className="mt-8 p-4 bg-gray-100 dark:bg-[#181818] rounded-md">
                        <div className="flex justify-center bg-yellow-500 space-x-4 mb-6">
                            <button
                                onClick={() => setActiveTab('about')}
                                className={`px-4 py-2 rounded-md ${activeTab === 'about'
                                    ? ' text-white bg-yellow-600'
                                    : ' dark:text-white hover:bg-yellow-600'
                                    }`}
                            >
                                Məhsul haqqında
                            </button>
                            <button
                                onClick={() => setActiveTab('how_to_use')}
                                className={`px-4 py-2 rounded-md ${activeTab === 'how_to_use'
                                    ? ' text-white bg-yellow-600'
                                    : ' dark:text-white hover:bg-yellow-600'
                                    }`}
                            >
                                İstifadə qaydaları
                            </button>
                        </div>
                        {activeTab === 'about' && (
                            <div>
                                <h2 className="text-lg font-semibold mb-2 dark:text-[#fff]">Məhsul haqqında:</h2>
                                <p className="dark:text-gray-300 text-left">{subtype?.sub_types?.[0].about || 'Məlumat mövcud deyil.'}</p>
                            </div>
                        )}
                        {activeTab === 'how_to_use' && (
                            <div>
                                <h2 className="text-lg font-semibold mb-2 dark:text-[#fff]">İstifadə qaydaları:</h2>
                                <p className="dark:text-gray-300 text-left">{subtype?.sub_types?.[0].how_to_use || 'Məlumat mövcud deyil.'}</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <FutureCard />
                </div>
            </div>
        </section>
    );
};

export default Page;
