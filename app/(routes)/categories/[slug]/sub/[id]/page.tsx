'use client';
import FutureCard from '@/app/components/ui/shared/FutureCard';
import InformationBar from '@/app/components/ui/shared/InformationBar';
import React, { useEffect, useState } from 'react';
import { fetchCategoryData } from './service';
import Image from 'next/image';
import Link from 'next/link';

const Page = ({ params }: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState<string>(''); // Kategori adı
    const [loading, setLoading] = useState<boolean>(true);
    const { slug } = params; // Slug parametresi
    const { id } = params; // Slug parametresi

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);

                // Tüm kategorileri çek
                const categoriesResponse = await fetch(`https://api.muslimanshop.com/api/products/type/?page_size=20`);
                if (!categoriesResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const categoriesData = await categoriesResponse.json();

                // Slug ile eşleşen kategoriyi bul
                const matchingCategory = categoriesData.results.find((category: any) => category.name === slug);
                if (!matchingCategory) {
                    throw new Error(`Category not found for slug: ${slug}`);
                }

                const categoryId = matchingCategory.id;

                // Bulunan ID ile ürünleri çek
                const categoryData = await fetchCategoryData(id, categoryId);
                const data = categoryData.results || [];

                setProducts(data);
                setCategoryName(matchingCategory.name);
            } catch (error) {
                console.error('Error fetching category products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchCategoryProducts();
        }
    }, [slug]);

    return (
        <section className="mx-auto text-center  pb-[20px] dark:bg-[#121212]">
            <div className="flex flex-col max-w-[1280px] mx-auto px-4">
                <div className="flex items-center justify-center w-full mb-6">
                    <h1 className="text-[36px] lg:text-[42px] font-semibold dark:text-[#fff]">
                        {loading ? 'Produktlar yüklənir...' : categoryName || 'Bu kateqoriya tapılmadı'}
                    </h1>
                </div>
                <InformationBar HasButton={false} title={categoryName || 'Yüklənir...'} />

                {/* Ürün listesi */}
                <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-2 mt-4">
                    {!loading && products.length > 0 ? (
                        products.map((product: any) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}/${product.title}`}
                                className="md:mx-0 my-2 rounded-md"
                            >
                                <div className="dark:bg-[#181818] dark:border-0 border-2 h-full py-4 px-8 rounded-md lg:w-[] ">
                                    <div className="overflow-hidden w-full h-full rounded-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(255,255,0,0.6)]">
                                        <Image
                                            width={350}
                                            height={150}
                                            src={product.image}
                                            className="w-full h-full object-contain rounded-md md:w-[200px] max-h-[100px] sm:max-h-[140px] md:max-h-[180px]"
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
                    ) : loading ? (
                        <p className="text-white text-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                            Yüklənir...
                        </p>
                    ) : (
                        <p className="text-white text-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                            Bu kateqoriyada produkt tapılmadı.
                        </p>
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
