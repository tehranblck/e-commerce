import React from 'react';
import Image from 'next/image';

interface Props {
    params: {
        id: string;
    };
}

async function getProduct(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        if (!res.ok) throw new Error('Məhsul tapılmadı');
        return res.json();
    } catch (error) {
        console.error('Məhsul yüklənərkən xəta:', error);
        return null;
    }
}

const ProductDetail = async ({ params }: Props) => {
    const { id } = params;
    const product = await getProduct(id);

    if (!product) {
        return (
            <div className="container mx-auto py-8">
                <h1>Məhsul tapılmadı</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-[400px]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            {/* Diğer detaylar */}
                        </div>

                        <p className="text-gray-700 mb-4">{product.description}</p>

                        {/* Diğer detaylar */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 