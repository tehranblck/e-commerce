"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "@/app/components/ui/shared/ProductList";
import Loading from "@/app/components/ui/shared/Loading";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query) {
            const fetchSearchResults = async () => {
                setLoading(true);
                try {
                    const res = await fetch(
                        `https://api.muslimanshop.com/api/products?search=${encodeURIComponent(query)}`
                    );
                    const data = await res.json();
                    setProducts(data.results);
                    console.log(await data.results)
                } catch (error) {
                    console.error("Error fetching search results:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchSearchResults();
        }
    }, [query]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="max-w-[1280px] mx-auto py-6 ">
            <h1 className="text-2xl font-semibold mb-4 mt-8">Axtarış Nəticələri: {query}</h1>
            {products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <p className="text-gray-500">Heç bir nəticə tapılmadı.</p>
            )}
        </div>
    );
};

export default SearchPage;
