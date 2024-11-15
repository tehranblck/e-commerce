'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InformationBar from '@/app/components/ui/shared/InformationBar';
import Image from 'next/image';

const Page = ({ params }: any) => {
    const [product, setProduct] = useState<any>(null);
    const { slug } = params;

    useEffect(() => {
        const fetchTypeIdAndProduct = async () => {
            try {
                // İlk olarak tüm türleri çekiyoruz
                const typeResponse = await fetch(`https://api.muslimanshop.com/api/products/type/`);
                if (!typeResponse.ok) {
                    throw new Error("Failed to fetch types");
                }

                const typeData = await typeResponse.json();

                // Gelen türlerde `slug` ile eşleşen type ID'yi buluyoruz
                const matchingType = typeData.results.find((type: any) => type.name === slug);

                if (!matchingType) {
                    throw new Error(`No type found for slug: ${slug}`);
                }

                const typeId = matchingType.id;

                const productResponse = await fetch(`https://api.muslimanshop.com/api/products/type/${typeId}`);
                if (!productResponse.ok) {
                    throw new Error("Failed to fetch product data");
                }

                const productData = await productResponse.json();

                setProduct(productData);
                console.log(await productData)
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchTypeIdAndProduct();

    }, [slug]);

    return (
        <div className='pt-[250px] lg:pt-[200px] min-h-screen'>
            <div className="flex flex-col max-w-[1280px] mx-auto px-2">
                <div className="px-2">
                    <InformationBar HasButton={false} title="Alt Kateqoriyalar" />
                </div>

                {product ? (
                    <div className=''>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                            {product.sub_types.map((subType: any) => (
                                <div className='flex-col items-center justify-center'>
                                    <Link
                                        key={subType.id}
                                        href={`/categories/${product.name}/sub/${subType.id}`}
                                        className="dark:bg-[#1f1f1f] overflow-hidden dark:border-0 border-2 px-0 sm:px-6 w-full hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(75,0,130,0.6)] duration-300 transition-all ease-in-out cursor-pointer h-[140px] rounded-md flex flex-col items-center justify-center"
                                    >
                                        <Image width={300} height={300} quality={86} src={subType.image} alt={subType.name} className="w-full h-auto object-cover rounded-md mb-2" />

                                    </Link>
                                    <h3 className="text-lg text-center font-bold">{subType.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Page;
