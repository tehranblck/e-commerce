'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InformationBar from '@/app/components/ui/shared/InformationBar';
import Image from 'next/image';

const Page = ({ params }: any) => {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { slug } = params;

    useEffect(() => {
        const fetchProductBySlug = async () => {
            setLoading(true);
            setError(null);
            try {
                // Tüm türleri çek
                const typeResponse = await fetch(`https://api.muslimanshop.com/api/products/type/?page_size=20`);
                if (!typeResponse.ok) {
                    throw new Error("Failed to fetch types");
                }

                const typeData = await typeResponse.json();

                // Slug ile eşleşen ID'yi bul
                const matchingType = typeData.results.find((type: any) => type.name === slug);
                if (!matchingType) {
                    throw new Error(`No type found for slug: ${slug}`);
                }

                const typeId = matchingType.id;

                // ID'ye göre ürün verilerini çek
                const productResponse = await fetch(`https://api.muslimanshop.com/api/products/type/${typeId}`);
                if (!productResponse.ok) {
                    throw new Error("Failed to fetch product data");
                }

                const productData = await productResponse.json();
                setProduct(productData);
            } catch (err) {
                console.error(err);
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductBySlug();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="pt-[250px] lg:pt-[200px] min-h-screen">
            <div className="flex flex-col max-w-[1280px] mx-auto px-2">
                <div className="px-2">
                    <InformationBar HasButton={false} title="Alt Kateqoriyalar" />
                </div>

                {product ? (
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                            {product.sub_types.map((subType: any) => (
                                <div key={subType.id} className="flex flex-col items-center justify-center">
                                    <Link
                                        href={`/categories/${product.name}/sub/${subType.id}`}
                                        className="dark:bg-[#1f1f1f] overflow-hidden dark:border-0 border-2 px-0 w-full hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(75,0,130,0.6)] duration-300 transition-all ease-in-out cursor-pointer h-[140px] rounded-md flex flex-col items-center justify-center"
                                    >
                                        <Image
                                            width={300}
                                            height={300}
                                            quality={86}
                                            src={subType.image}
                                            alt={subType.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </Link>
                                    <h3 className="text-lg text-center font-bold">{subType.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-center">Bu kateqoriyaya aid alt kateqoriyalar tapılmadı.</p>
                )}
            </div>
        </div>
    );
};

export default Page;
