"use client";
import React from "react";
import { Product } from "@/app/models/ui/Product";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
} from "@/app/store/features/product/productSlice";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type Props = {
  product: Product;
  selectedColor?: string | null;
  selectedSize?: string | null;
};

const ProductDetailActions = ({ product, selectedColor, selectedSize }: Props) => {
  const products = useSelector((state: any) => state.product.products);
  const cartProduct = products.find((item: Product) => item.id === product.id);
  const auth = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (!auth) {
      toast.error("Səbətə məhsul əlavə etmək üçün öncə giriş edin.", {
        position: "top-left",
      });
      return;
    }

    if (!selectedColor || !selectedSize) {
      toast.error("Lütfen bir rəng və ölçü seçin.", {
        position: "top-left",
      });
      return;
    }

    if (cartProduct) {
      dispatch(increaseQuantity(product.id));
      toast.success("Məhsulun miqdarı artırıldı", {
        position: "top-left",
      });
    } else {
      dispatch(addProduct({
        ...product,
        quantity: 1,
        selectedColor,
        selectedSize
      }));
      toast.success("Məhsul səbətə əlavə edildi", {
        position: "top-left",
      });
    }
  };

  const handleDecreaseProduct = () => {
    if (cartProduct?.quantity && cartProduct.quantity !== 1) {
      dispatch(decreaseQuantity(product.id));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  return (
    <div className="flex space-x-5">
      <div className="flex items-center">
        <button
          onClick={handleDecreaseProduct}
          className="bg-yellow-500 hover:bg-white transition-all duration-300 text-lg w-[30px] rounded-md border-[1px] border-[#000] py-[7px] text-black font-bold"
        >
          -
        </button>
        <span className="mx-2 text-black dark:text-white">{cartProduct?.quantity || "1"}</span>
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
        <ShoppingCartIcon className="mr-1 text-[22px]" /> Səbətə əlavə et
      </button>
    </div>
  );
};

export default ProductDetailActions;
