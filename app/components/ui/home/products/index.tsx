import React from "react";
import Link from "next/link";
import InformationBar from "../../shared/InformationBar";
import { Product } from "@/app/models/ui/Product";
import pubgCart from "../../../../../public/assets/images/pubgCart.png";
import ProductCard from "../../shared/ProductCard";

const Products = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "PUBG Mobile",
      title: "120 uc",
      price: 10.00,
      description:
        "The official mobile version of PLAYERUNKNOWN'S BATTLEGROUNDS, a popular battle royale game.",
      image: "https://ik.imagekit.io/wnivejxts/Sondos.png?updatedAt=1724094912207", // Convert pubgCart to a string by accessing the 'src' property
      type: "Game",
      created_at: "2024-08-01T12:00:00Z",
      updated_at: "2024-08-10T15:30:00Z",
    },
    {
      id: 2,
      name: "PUBG Mobile",
      title: "100 uc",
      price: 10.00,
      description:
        "The official mobile version of PLAYERUNKNOWN'S BATTLEGROUNDS, a popular battle royale game.",
      image: "https://ik.imagekit.io/wnivejxts/Sondos.png?updatedAt=1724094912207",
      type: "Game",
      created_at: "2024-08-01T12:00:00Z",
      updated_at: "2024-08-10T15:30:00Z",
    },
    {
      id: 3,
      name: "PUBG Mobile",
      title: "100 uc",
      price: 10.00,
      description:
        "The official mobile version of PLAYERUNKNOWN'S BATTLEGROUNDS, a popular battle royale game.",
      image: "https://ik.imagekit.io/wnivejxts/Sondos.png?updatedAt=1724094912207",
      type: "Game",
      created_at: "2024-08-01T12:00:00Z",
      updated_at: "2024-08-10T15:30:00Z",
    },
    {
      id: 4,
      name: "PUBG Mobile",
      title: "100 uc",
      price: 10.00,
      description:
        "The official mobile version of PLAYERUNKNOWN'S BATTLEGROUNDS, a popular battle royale game.",
      image: "https://ik.imagekit.io/wnivejxts/Sondos.png?updatedAt=1724094912207",
      type: "Game",
      created_at: "2024-08-01T12:00:00Z",
      updated_at: "2024-08-10T15:30:00Z",
    },
    {
      id: 5,
      name: "PUBG Mobile",
      title: "100 uc",
      price: 10.00,
      description:
        "The official mobile version of PLAYERUNKNOWN'S BATTLEGROUNDS, a popular battle royale game.",
      image: "https://ik.imagekit.io/wnivejxts/Sondos.png?updatedAt=1724094912207",
      type: "Game",
      created_at: "2024-08-01T12:00:00Z",
      updated_at: "2024-08-10T15:30:00Z",
    },
    {
      id: 6,
      name: "PUBG Mobile",
      title: "100 uc",
      price: 10.00,
      description:
        "The official mobile version of PLAYERUNKNOWN'S BATTLEGROUNDS, a popular battle royale game.",
      image: "https://ik.imagekit.io/wnivejxts/Sondos.png?updatedAt=1724094912207",
      type: "Game",
      created_at: "2024-08-01T12:00:00Z",
      updated_at: "2024-08-10T15:30:00Z",
    },
  ];

  return (
    <section className="bg-[#121212] py-6">
      <div className="flex flex-col  max-w-[1280px] mx-auto px-2">
        <InformationBar title="Məhsullar" />
        {/* items-center justify-center sm:justify-between md:justify-start w-full  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 place-items-center mt-4  ">
          {products.map((product: Product) => {
            return <ProductCard key={product.id} productData={product} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
