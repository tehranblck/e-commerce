"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/app/models/ui/Product";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/app/store/features/product/productSlice";
import { toast } from "react-toastify";

const ProductDetail = ({ params }: { params: { id: number } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [pubgId, setPubgId] = useState<any>("");

  const products = useSelector((state: any) => state.product.products);
  console.log(products, "products");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://api.muslimanshop.com/api/products/${params.id}/`,
          {
            cache: "no-cache",
          },
        );
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddProduct = () => {
    if (pubgId === "") {
      toast.error("Pubg ID sahəsi boş ola bilməz", {
        position: "top-right",
      });
    } else {
      dispatch(addProduct(product));
      toast.success("Product səbətə əlavə edildi", {
        position: "top-right",
      });
    }
  };

  return (
    <section className="bg-[#121212] py-6">
      <div className="flex justify-center items-center text-[#fff]">
        <div className="bg-[#181818] py-10 px-6 rounded-md">
          <div className="flex w-[800px] justify-between space-x-4">
            <img
              src={product.image}
              className="w-[500px] h-[350px] rounded-md"
              alt=""
            />

            <div className="w-full flex flex-col justify-between space-y-8">
              <div className="flex flex-col space-y-3">
                <h2 className="text-[32px] font-bold">{product.title}</h2>
                <p className="text-[#5d5d5d]">{product.description}</p>
                <Link href={"/"} className="text-[14px] text-yellow-500 ">
                  Digər məhsullar {"-->"}
                </Link>
              </div>
              <div className="space-y-2">
                <button className="bg-[#1e1e1e] text-lg w-full rounded-md  border-[1px] border-[#282828] text-indigo-600">
                  {product.price.toFixed(2)} Azn
                </button>
                <input
                  required
                  type="text"
                  className={`${
                    !pubgId ? "border-[1px] border-red-500" : ""
                  } w-full rounded-md border-[1px] border-[#282828] bg-[#1e1e1e] border-blue- p-2`}
                  placeholder="Pubg ID *"
                  value={pubgId}
                  onChange={(e) => setPubgId(e.target.value.trim())}
                />
                <button
                  onClick={() => handleAddProduct()}
                  className="bg-yellow-500 hover:bg-white transition-all duration-300 text-lg w-full rounded-md  border-[1px] border-[#000] py-[7px] text-black font-bold"
                >
                  <ShoppingCartIcon className="mr-1 text-[22px]" /> Səbətə əlavə
                  et
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
