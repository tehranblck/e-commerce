"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/app/store/features/product/productSlice";
import Image from "next/image";
import Link from "next/link";
import SharedProduct from "@/app/components/ui/product/sharedproduct/SharedProduct";
import ProductDetailActions from "@/app/components/ui/product/productdetailactions/ProductDetailActions";
import { Product } from "@/app/models/ui/Product";

const ClientProductDetail = ({ product }: { product: Product }) => {
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const dispatch = useDispatch();

    return (
        <section className="bg-[#212121]  py-6">
            <div className="flex justify-center items-center text-[#fff] mx-2 px-2">
                <div className="dark:bg-[#181818]  py-10 px-6 rounded-3xl">
                    <div className="flex sm:w-[300px] border-2 border-[#988d57] p-6 rounded-3xl md:w-[400px] lg:w-[500px] xl:w-full flex-col xl:flex-row justify-between xl:space-x-4">
                        <Image
                            width={350}
                            height={950}
                            quality={100}
                            src={product.image}
                            className="w-full h-full rounded-md"
                            alt={product.title || product.image}
                        />

                        <div className="w-full flex flex-col justify-between space-y-8">
                            <div className="flex flex-col space-y-3 mt-4 xl:mt-0">
                                <h2 className="sm:text-[16px] md:text-[28px] dark:text-[#988d57] text-white xl:text-[32px] font-bold">
                                    {product.title}
                                </h2>
                                <p className="dark:text-[#5d5d5d] text-white">{product.description}</p>
                                <Link href={"/"} className="text-[14px] text-yellow-500">
                                    Digər məhsullar {"-->"}
                                </Link>
                            </div>
                            <div>
                                <div className="flex space-x-4">
                                    <span className="text-white">Rəng:</span>
                                    {product.colors.map((color) => (
                                        <span
                                            key={color.id}
                                            style={{ backgroundColor: color.code }}
                                            className={`w-6 h-6 rounded-full inline-block cursor-pointer ${selectedColor === color.id ? 'border-4 border-red-900' : ''}`}
                                            onClick={() => setSelectedColor(color.id)}
                                        ></span>
                                    ))}
                                </div>
                                <div className="flex space-x-4 mt-2">
                                    <span className="text-white">Ölçü:</span>
                                    {product.sizes.map((size) => (
                                        <span
                                            key={size.id}
                                            className={`px-2 py-1 border rounded-md cursor-pointer ${selectedSize === size.id ? 'bg-blue-500' : ''}`}
                                            onClick={() => setSelectedSize(size.id)}
                                        >
                                            {size.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Pass selectedColor and selectedSize as props */}
                            <ProductDetailActions
                                product={product}
                                selectedColor={selectedColor}
                                selectedSize={selectedSize}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientProductDetail;
