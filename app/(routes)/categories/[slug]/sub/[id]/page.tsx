'use client'
import FutureCard from '@/app/components/ui/shared/FutureCard';
import InformationBar from '@/app/components/ui/shared/InformationBar';
import React, { useEffect, useState } from 'react';
import { fetchCategoryData } from './service';
import Image from 'next/image';
import Link from 'next/link';

const Page = ({ params }: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');
    const { id } = params;

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const categoryData = await fetchCategoryData(id);
                const data = await categoryData.results;

                setProducts(data);
                console.log(data)
                setCategoryName(data[0].type);
                console.log(categoryName)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (id) {
            fetchCategoryProducts();
        }
    }, [id]);

    return (
        <section className="mx-auto pt-[120px] text-center lg:pt-[100px] pb-[20px] dark:bg-[#121212]">
            <div className="flex flex-col max-w-[1280px] mx-auto px-4">
                <div className="flex items-center justify-center w-full mb-6">
                    <h1 className="text-[36px] lg:text-[42px] font-semibold dark:text-[#fff]">
                        {categoryName || 'Kategori Yükleniyor...'}
                    </h1>
                </div>
                <InformationBar HasButton={false} title={categoryName || 'Yükleniyor...'} />

                {/* Ürün listesi */}
                <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-2 mt-4">
                    {products?.length > 0 ? (
                        products.map((product: any) => (
                            <Link key={product.id} href={`/products/${product.id}/${product.title}`} className="md:mx-0 my-2 rounded-md">
                                <div className="dark:bg-[#181818] dark:border-0 border-2 h-full py-4 px-8 rounded-md lg:w-[] ">
                                    <div className="overflow-hidden w-full h-full rounded-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(255,255,0,0.6)]">
                                        <Image
                                            width={350}
                                            height={150}
                                            src={product.image}
                                            className="w- h-full object-contain rounded-md  md:w-[200px] max-h-[100px] sm:max-h-[140px] md:max-h-[180px] "
                                            alt={product.name}
                                        />

                                    </div>
                                    <div className="flex flex-col justify-center items-center mt-4">
                                        <h2 className="dark:text-[#fff] text-sm">{product.title}</h2>
                                        <span className="text-indigo-500 text-sm">{product.price} AZN</span>
                                    </div>

                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-white text-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">Bu kategoride ürün bulunamadı.</p>
                    )}
                </div>

                <div className="mt-8">
                    <FutureCard />
                </div>
            </div>
        </section>
    );
};

export default Page;
