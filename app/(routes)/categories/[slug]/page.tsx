"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/app/components/ui/shared/Loading";
import ProductList from "@/app/components/ui/shared/ProductList";
import FutureCard from "@/app/components/ui/shared/FutureCard";
import { fetchProductsByCategory } from "@/app/services/modules/categorizedProductsService";
import InformationBar from "@/app/components/ui/shared/InformationBar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Slug oluşturma yardımcı fonksiyonu
const createSlug = (text: string | undefined | null): string => {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/ə/g, 'e')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

interface Category {
    id: number;
    name: string;  // API'den gelen kategori adı
    image: string | null;
    sub_types: any[];
    about: string;
}

interface Product {
    id: number;
    title: string;  // API'den gelen ürün başlığı
    description: string;
    image: string;
    type: string;
}

const CategorizedProductComponent = ({ params }: any) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [panelProducts, setPanelProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categoryName, setCategoryName] = useState("");
    const { slug } = params;

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const categoriesRes = await fetch("https://admin.raelli.az/api/products/type/");
                if (!categoriesRes.ok) {
                    throw new Error("Kateqoriyaları yükləmək mümkün olmadı");
                }
                const categoriesData = await categoriesRes.json();

                // Eşleştirme yapmadan önce slug'ları kontrol et
                const searchSlug = createSlug(decodeURIComponent(slug));

                const matchingCategory = categoriesData.results.find(
                    (category: Category) => createSlug(category.name) === searchSlug
                );

                if (!matchingCategory) {
                    throw new Error("Kateqoriya tapılmadı");
                }

                setCategoryName(matchingCategory.name);

                const productsResponse = await fetchProductsByCategory(page, matchingCategory.id);

                // Yanıt kontrolü
                if (!productsResponse || !Array.isArray(productsResponse)) {
                    console.error('Geçersiz API yanıtı:', productsResponse);
                    throw new Error("Məhsullar yüklənərkən xəta baş verdi");
                }

                // Ürünlere slug ekle
                const productsWithSlugs = productsResponse.map((product: Product) => {
                    return {
                        ...product,
                        slug: createSlug(product.title)
                    };
                });

                setProducts(productsWithSlugs);
            } catch (err) {
                console.error("Error:", err);
                setError((err as Error).message);
                toast.error("Məhsulları yükləmək mümkün olmadı", {
                    position: "top-right"
                });
                router.push("/categories");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchCategoryAndProducts();
        } else {
            setLoading(false);
        }
    }, [slug, page, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center pt-48 pb-20 w-full bg-[#181818]">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center pt-48 pb-20 w-full bg-[#181818] text-red-500">
                {error}
            </div>
        );
    };

    return (
        <section className="dark:bg-[#121212]">
            <div className="mx-auto text-center pb-[10px]">
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

                    <div className="w-full max-w-[1380px] px-4 pt-2">
                        {products.length > 0 ? (
                            <ProductList products={products} />
                        ) : (
                            <p className="text-[24px] pt-10 pb-[140px] text-white">
                                Bu kateqoriyada məhsul tapılmadı
                            </p>
                        )}
                    </div>
                </div>



                <div>
                    <FutureCard />
                </div>
            </div>
        </section>
    );
};

export default CategorizedProductComponent;
