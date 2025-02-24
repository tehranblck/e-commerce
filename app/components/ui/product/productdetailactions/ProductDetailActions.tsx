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
  selectedColor?: number | null;
  selectedSize?: number | null;
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
      toast.error("Zəhmət olmasa bir rəng və ölçü seçin.", {
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
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={handleDecreaseProduct}
          className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-white w-12 h-12 rounded-md text-xl font-medium"
        >
          -
        </button>
        <span className="w-10 text-center text-lg text-white dark:text-white">
          {cartProduct?.quantity || "1"}
        </span>
        <button
          onClick={handleAddProduct}
          className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-white w-12 h-12 rounded-md text-xl font-medium"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddProduct}
        className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-white px-6 py-3 rounded-md text-lg font-medium w-full sm:w-auto"
      >
        <ShoppingCartIcon className="mr-2 text-2xl" />
        <span>Səbətə əlavə et</span>
      </button>
    </div>
  );
};

export default ProductDetailActions;
