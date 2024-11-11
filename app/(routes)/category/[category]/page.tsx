"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/components/ui/shared/Loading";
import ProductList from "@/app/components/ui/shared/ProductList";
import FutureCard from "@/app/components/ui/shared/FutureCard";
import { fetchProductsByCategory } from "@/app/services/modules/categorizedProductsService";
import InformationBar from "@/app/components/ui/shared/InformationBar";

const CategorizedProductComponent = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [panelProducts, setPanelProducts] = useState([]); // State for panel products
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const keywords = [
    "Bəyəni",
    "Takipçi",
    "Yorum",
    "Şərh",
    "Abunə",
    "Baxış",
    "Like",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const filteredProducts = await fetchProductsByCategory(
          page,
          category || "",
        );

        const filteredPanelProducts = filteredProducts.filter((product: any) =>
          keywords.some((keyword) => product.title.includes(keyword)),
        );

        const nonPanelProducts = filteredProducts.filter(
          (product: any) =>
            !keywords.some((keyword) => product.title.includes(keyword)),
        );

        setProducts(nonPanelProducts);
        setPanelProducts(filteredPanelProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [category, page]);

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
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-[36px] text-white">
            <span className="text-yellow-500 uppercase italic font-bold">
              {category}
            </span>
          </h1>
          <div className=" w-full max-w-[1380px] px-4 pt-2">
            <InformationBar HasButton={false}
              sideInfo="Ən çox satılan"
              title={category?.toString().toUpperCase() || ""}
            />
          </div>

          {/* Main Product List (without panel products) */}
          <div>
            {products.length > 0 ? (
              <ProductList styleCss="px-4" products={products} />
            ) : (
              <p className="text-[24px] pt-10 pb-[140px] text-white">
                Produkt tapılmadı
              </p>
            )}
          </div>
        </div>

        {/* Panels Section */}
        <div className="flex justify-center">
          {panelProducts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-[30px] text-yellow-500 uppercase font-bold italic">
                Panel xidmətləri
              </h2>
              <div className=" w-full max-w-[1380px] px-4 pt-2">
                <InformationBar HasButton={false}
                  sideInfo="Panel xidmətləri"
                  title={category?.toString().toUpperCase() || ""}
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
