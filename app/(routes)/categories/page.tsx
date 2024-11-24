import FilteredProductsComponent from "@/app/components/ui/home/filteredProducts";
import Products from "@/app/components/ui/home/products";
import FutureCard from "@/app/components/ui/shared/FutureCard";
import React from "react";

const ProductPage = () => {

    return (
        <section className="dark:bg-[#121212]  lg:pt-[4px]">
            <div className="pt-[200px] lg:pt-[150px]">
                <div className=" flex items-center justify-center w-full  ">
                    <h1 className="text-[42px] dark:text-[#fff]">Kateqoriyalar</h1>
                </div>
                <FilteredProductsComponent />
                <FutureCard />
            </div>
        </section>
    );
};

export default ProductPage;
