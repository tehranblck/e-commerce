import React from "react";
import { CategoryType } from "@/app/models/ui/categoryType";
import Link from "next/link";
import { headers } from "next/headers";

async function getCategories(): Promise<CategoryType[]> {
  try {
    const res = await fetch("https://admin.raelli.az/api/products/type/?page_size=20", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      throw new Error("Kategorileri yükləmək mümkün olmadı");
    }
    const data = await res.json();

    if (data.results) {
      return data.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image || "/assets/images/categories/default.png",
        hasSubTypes: item.sub_types && item.sub_types.length > 0,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function FilteredProductsComponent() {
  const pathname = headers().get("x-pathname") || "/";
  const categories = await getCategories();

  if (!categories.length) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-gray-500">
        Kateqoriyalar tapılmadı
      </div>
    );
  }

  const isCategoriesPage = pathname === "/categories";
  const displayedCategories = isCategoriesPage ? categories : categories.slice(0, 10);

  return (
    <section className="dark:bg-[#121212] py-0">
      <div className="max-w-[600px] md:max-w-[1280px] mx-auto">
        <div className="px-2">
          {/* <InformationBar link="/categories" HasButton={false} title=" Kateqoriyalar" /> */}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:12 mt-2 px-2 justify-center">
          {displayedCategories.map((category) => (
            <Link
              href={
                category.hasSubTypes
                  ? `/categories/${category.name}/sub`
                  : `/categories/${category.name}`
              }
              key={category.id}
              className="bg-[#212121] text-white md:text-3xl text-md overflow-hidden px-4 md:px-8 w-full hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(75,0,130,0.6)] duration-300 transition-all ease-in-out cursor-pointer h-[50px] rounded-md flex items-center justify-center"
            >
              {  /*  <Image
                width={5070}
                height={5000}
                quality={100}
                src={category.image}
                alt={category.name}
                className="w-full h-auto object-cover"
              />
          */}
              <h1>{category.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
