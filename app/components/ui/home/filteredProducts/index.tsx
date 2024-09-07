import React from "react";
import InformationBar from "../../shared/InformationBar";
import { CategoryType } from "@/app/models/ui/categoryType";
import Image from "next/image";
import twitch from "../../../../../public/assets/images/categories/twitch.png";
import youtube from "../../../../../public/assets/images/categories/youtube.png";
import steam from "../../../../../public/assets/images/categories/steam.png";
import efootball from "../../../../../public/assets/images/categories/efootball2.png";
import tiktok from "../../../../../public/assets/images/categories/tiktok.png";
import instagram from "../../../../../public/assets/images/categories/instagram5.png";
import freefire from "../../../../../public/assets/images/categories/freefire.png";
import pubg from "../../../../../public/assets/images/categories/pubgmobile.png";
import netflix from "../../../../../public/assets/images/categories/netflix.png";
import exxen from "../../../../../public/assets/images/categories/exxen.png";
import spotify from "../../../../../public/assets/images/categories/spotify.png";
import Link from "next/link";
import CategorizedProductComponent from "@/app/(routes)/products/[category]/page";

const FilteredProductsComponent = () => {
  const categorytTypes: CategoryType[] = [
    { id: 1, name: "spotify", image: spotify },
    { id: 2, name: "netflix", image: netflix },
    { id: 3, name: "Pubg Mobile", image: pubg },
    { id: 4, name: "exxen", image: exxen },
    { id: 5, name: "instagram", image: instagram },
    { id: 6, name: "tiktok", image: tiktok },
    { id: 7, name: "efootball", image: efootball },
    { id: 8, name: "steam", image: steam },
    { id: 9, name: "youtube", image: youtube },
    { id: 10, name: "freefire", image: freefire },
  ];

  return (
    <section className="bg-[#121212] py-6 ">
      <div className="max-w-[600px] md:max-w-[1280px] mx-auto">
        <div className="px-2">
          <InformationBar title="Məhsul tipləri" />
        </div>
        <div className="flex  flex-row md:flex-col md:space-y-2  justify-between mt-6 lg:space-y-2">
          <div className="flex flex-col md:flex-row space-y-2  space-x-0 md:space-y-0  md:space-x-2 m px-2 whitespace-nowrap">
            {categorytTypes.slice(0, 5).map((category: CategoryType) => {
              return (
                <Link
                  href={`/products/category?category=${category.name}`}
                  key={category.id}
                  className="bg-[#1f1f1f] px-8 w-full  lg:hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(75,0,130,0.6)] duration-300 transition-all ease-in-out cursor-pointer   h-[140px] rounded-md flex  items-center justify-center"
                >
                  <Image
                    width={170}
                    height={50}
                    className=""
                    src={category.image}
                    alt={category.name}
                  />
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col md:flex-row space-y-2  space-x-0 md:space-y-0  md:space-x-2 m px-2 whitespace-nowrap">
            {categorytTypes.slice(5, 10).map((category: CategoryType) => {
              return (
                <Link
                  href={`/products/category?category=${category.name}`}
                  key={category.id}
                  className="bg-[#1f1f1f] px-8 w-full  lg:hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(75,0,130,0.6)] duration-300 transition-all ease-in-out cursor-pointer   h-[140px] rounded-md flex  items-center justify-center"
                >
                  <Image
                    width={170}
                    height={50}
                    className=""
                    src={category.image}
                    alt={category.name}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilteredProductsComponent;
