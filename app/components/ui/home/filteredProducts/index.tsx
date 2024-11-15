"use client";
import React, { useEffect, useState } from "react";
import InformationBar from "../../shared/InformationBar";
import { CategoryType } from "@/app/models/ui/categoryType";
import Image from "next/image";
import Link from "next/link";

const FilteredProductsComponent = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.muslimanshop.com/api/products/type/?page_size=20");
        const data = await res.json();

        if (data.results) {
          const categoriesData = data.results.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image || "/assets/images/categories/default.png",
            hasSubTypes: item.sub_types && item.sub_types.length > 0, // Alt kategori kontrolü
          }));
          setCategories(categoriesData);
        } else {
          console.error("Data format is incorrect:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Yüklənir...</div>;
  }

  if (!categories.length) {
    return <div>Kateqoriyalar yüklənmədi...</div>;
  }

  // Gösterilecek kategori sayısını belirler
  const displayedCategories = showAll ? categories : categories.slice(0, 10);

  return (
    <section className="dark:bg-[#121212] py-6">
      <div className="max-w-[600px] md:max-w-[1280px] mx-auto">
        <div className="px-2">
          <InformationBar link="/categories" HasButton={true} title="Məhsul tipləri" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 px-2 justify-center">
          {displayedCategories.map((category) => (
            <Link
              href={
                category.hasSubTypes
                  ? `/categories/${category.name}/sub`
                  : `/categories/${category.name}`
              }
              key={category.id}
              className="dark:bg-[#1f1f1f] overflow-hidden dark:border-0 border-2 px-8 w-full hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(75,0,130,0.6)] duration-300 transition-all ease-in-out cursor-pointer h-[140px] rounded-md flex items-center justify-center"
            >
              <Image
                width={170}
                height={50}
                src={category.image}
                alt={category.name}
                className="w-full h-auto object-cover"
              />
            </Link>
          ))}
        </div>

        {/* Daha çok/daha az göster butonu */}
        {categories.length > 10 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="relative transition-all duration-500 ease-in-out px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-white"
            >
              {showAll ? "Daha az göstər" : "Daha çox göstər"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilteredProductsComponent;
