"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/app/models/ui/Product";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} from "@/app/store/features/product/productSlice";
import { toast } from "react-toastify";

const ProductDetail = ({ params }: { params: { id: number } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [pubgId, setPubgId] = useState<string>("");

  const products = useSelector((state: any) => state.product.products);
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

  const cartProduct = products.find((item: Product) => item.id === product.id);

  const handleAddProduct = () => {
    if (pubgId === "") {
      toast.error("Pubg ID sahəsi boş ola bilməz", {
        position: "top-left",
      });
    } else {
      if (cartProduct) {
        // If the product already exists in the cart, increase its quantity
        dispatch(increaseQuantity(product.id));
        toast.success("Product miqdarı artırıldı", {
          position: "top-left",
        });
      } else {
        // If the product does not exist in the cart, add it
        dispatch(addProduct({ ...product, quantity: 1 }));
        toast.success("Product səbətə əlavə edildi", {
          position: "top-left",
        });
      }
    }
  };

  const handleDecreaseProduct = () => {
    dispatch(
      cartProduct?.quantity && cartProduct.quantity != 1
        ? decreaseQuantity(product.id)
        : removeProduct(product),
    );
  };

  return (
    <section className="bg-[#121212] py-6">
      <div className="flex justify-center items-center text-[#fff] mx-2 px-2">
        <div className="bg-[#181818] py-10 px-6 rounded-md">
          <div className="flex sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-full flex-col xl:flex-row justify-between xl:space-x-4">
            <img
              src={product.image}
              className="xl:w-[500px] xl:[350px] rounded-md"
              alt=""
            />

            <div className="w-full flex flex-col justify-between space-y-8">
              <div className="flex flex-col space-y-3 mt-4 xl:mt-0">
                <h2 className="sm:text-[16px] md:text-[28px] xl:text-[32px] font-bold">
                  {product.title}
                </h2>
                <p className="text-[#5d5d5d]">{product.description}</p>
                <Link href={"/"} className="text-[14px] text-yellow-500">
                  Digər məhsullar {"-->"}
                </Link>
              </div>
              <div className="space-y-2">
                <button className="bg-[#1e1e1e] text-lg w-full rounded-md border-[1px] border-[#282828] text-indigo-600">
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
                <div className="flex space-x-5">
                  <div className="flex items-center">
                    <button
                      onClick={handleDecreaseProduct}
                      className="bg-yellow-500 hover:bg-white transition-all duration-300 text-lg w-[30px] rounded-md border-[1px] border-[#000] py-[7px] text-black font-bold"
                    >
                      -
                    </button>
                    <span className="mx-2">
                      {/* Display quantity from the cart if exists */}
                      {cartProduct?.quantity || "0"}
                    </span>
                    <button
                      onClick={handleAddProduct}
                      className="bg-yellow-500 hover:bg-white transition-all duration-300 text-lg w-[30px] rounded-md border-[1px] border-[#000] py-[7px] text-black font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddProduct}
                    className="bg-yellow-500 hover:bg-white whitespace-nowrap px-2 transition-all duration-300 text-lg w-full rounded-md border-[1px] border-[#000] py-[7px] text-black font-bold"
                  >
                    <ShoppingCartIcon className="mr-1 text-[22px]" /> Səbətə
                    əlavə et
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
