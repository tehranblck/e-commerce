'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InformationBar from '@/app/components/ui/shared/InformationBar';
import Image from 'next/image';

const Page = ({ params }: any) => {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [typeDetails, setTypeDetails] = useState<any>(null); // Store type details for `about` and `how_to_use`
    const [activeTab, setActiveTab] = useState<'about' | 'how_to_use'>('about'); // Default tab set to 'about'
    const { slug } = params;

    useEffect(() => {
        const fetchProductBySlug = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch all types
                const typeResponse = await fetch(`https://api.muslimanshop.com/api/products/type/?page_size=20`);
                if (!typeResponse.ok) {
                    throw new Error('Failed to fetch types');
                }

                const typeData = await typeResponse.json();

                // Find the type matching the slug
                const matchingType = typeData.results.find((type: any) => type.name === slug);
                if (!matchingType) {
                    throw new Error(`No type found for slug: ${slug}`);
                }

                const typeId = matchingType.id;

                // Fetch type details for `about` and `how_to_use`
                const typeDetailsResponse = await fetch(`https://api.muslimanshop.com/api/products/type/${typeId}/`);
                const typeDetailsData = await typeDetailsResponse.json();
                setTypeDetails(typeDetailsData);

                // Fetch product subtypes
                const productResponse = await fetch(`https://api.muslimanshop.com/api/products/type/${typeId}`);
                if (!productResponse.ok) {
                    throw new Error('Failed to fetch product data');
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
        <div className="min-h-screen">
            <div className="flex flex-col max-w-[1280px] mx-auto px-2">
                <div className="px-2">
                    <InformationBar HasButton={false} title="Alt Kateqoriyalar" />
                </div>

                {/* Subtype List */}
                {product ? (
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                            {product.sub_types.map((subType: any) => (
                                <div key={subType.id} className="flex flex-col items-center justify-center">
                                    <Link
                                        prefetch={false}
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

                        {/* About and How to Use Tabs */}
                        {typeDetails && (
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-[#181818] rounded-md shadow-md">
                                <div className="flex justify-center space-x-4 mb-6 bg-yellow-500">
                                    <button
                                        onClick={() => setActiveTab('about')}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'about'
                                            ? 'bg-yellow-600'
                                            : '  dark:text-black hover:bg-yellow-600'
                                            }`}
                                    >
                                        Məhsul haqqında
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('how_to_use')}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'how_to_use'
                                            ? 'bg-yellow-600 '
                                            : '  dark:text-black hover:bg-yellow-600'
                                            }`}
                                    >
                                        İstifadə qaydaları
                                    </button>
                                </div>
                                {activeTab === 'about' && (
                                    <div>
                                        <p className="dark:text-gray-300">{typeDetails.about || 'Məlumat mövcud deyil.'}</p>
                                    </div>
                                )}
                                {activeTab === 'how_to_use' && (
                                    <div>
                                        <p className="dark:text-gray-300">{typeDetails.how_to_use || 'Məlumat mövcud deyil.'}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center">Bu kateqoriyaya aid alt kateqoriyalar tapılmadı.</p>
                )}
            </div>
        </div>
    );
};

export default Page;
