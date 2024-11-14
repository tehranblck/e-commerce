"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/app/components/ui/shared/Loading";
import ProductList from "@/app/components/ui/shared/ProductList";
import FutureCard from "@/app/components/ui/shared/FutureCard";
import { fetchProductsByCategory } from "@/app/services/modules/categorizedProductsService";
import InformationBar from "@/app/components/ui/shared/InformationBar";

const CategorizedProductComponent = ({ params }: any) => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [panelProducts, setPanelProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState("");
    const { slug } = params;

    const keywords = ["Bəyəni", "Takipçi", "Yorum", "Şərh", "Abunə", "Baxış", "Like"];

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            setLoading(true);
            try {
                // Tüm kategorileri çek
                const categoriesRes = await fetch("https://api.muslimanshop.com/api/products/type/");
                if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
                const categoriesData = await categoriesRes.json();

                // `slug` ile eşleşen kategoriyi bul
                const matchingCategory = categoriesData.results.find(
                    (category: any) => category.name === slug
                );

                if (!matchingCategory) {
                    throw new Error("Category not found");
                }

                setCategoryName(matchingCategory.name); // Kategori adını ayarla

                // Eşleşen kategorinin ID'sine göre ürünleri çek
                const productsResponse = await fetchProductsByCategory(page, matchingCategory.id);
                const results = productsResponse.results || productsResponse;

                // Panel ürünlerini ve diğer ürünleri filtrele
                const filteredPanelProducts = results.filter((product: any) =>
                    keywords.some((keyword) => product.title?.includes(keyword))
                );
                const nonPanelProducts = results.filter(
                    (product: any) => !keywords.some((keyword) => product.title?.includes(keyword))
                );

                setProducts(nonPanelProducts);
                setPanelProducts(filteredPanelProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchCategoryAndProducts();
        } else {
            setLoading(false);
        }
    }, [slug, page]);

    if (loading) {
        return (
            <div className="flex justify-center items-center pt-48 pb-20 w-full bg-[#181818]">
                <Loading />
            </div>
        );
    }

    return (
        <section className="dark:bg-[#121212]">
            <div className="mx-auto pt-[210px] text-center lg:pt-[160px] pb-[10px]">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-[36px] text-white">
                        <span className="text-yellow-500 uppercase italic font-bold">
                            {categoryName || slug}
                        </span>
                    </h1>
                    <div className="w-full max-w-[1380px] px-4 pt-2">
                        <InformationBar
                            HasButton={false}
                            sideInfo="Ən çox satılan"
                            title={categoryName?.toUpperCase() || ""}
                        />
                    </div>

                    {/* Ana Ürün Listesi */}
                    <div>
                        {products.length > 0 ? (
                            <ProductList styleCss="px-4" products={products} />
                        ) : (
                            <p className="text-[24px] pt-10 pb-[140px] text-white">
                                Bu kategoride ürün bulunamadı
                            </p>
                        )}
                    </div>
                </div>

                {/* Panel Ürünleri Bölümü */}
                <div className="flex justify-center">
                    {panelProducts.length > 0 && (
                        <div className="mt-10">
                            <h2 className="text-[30px] text-yellow-500 uppercase font-bold italic">
                                Panel xidmətləri
                            </h2>
                            <div className="w-full max-w-[1380px] px-4 pt-2">
                                <InformationBar
                                    HasButton={false}
                                    sideInfo="Panel xidmətləri"
                                    title={categoryName?.toUpperCase() || ""}
                                />
                            </div>
                            <div className="mt-4">
                                <ProductList styleCss="px-4" products={panelProducts} />
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <FutureCard />
                </div>
            </div>
        </section>
    );
};

export default CategorizedProductComponent;
