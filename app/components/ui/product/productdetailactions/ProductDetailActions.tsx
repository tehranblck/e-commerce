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
  pubgId: string;
};

const ProductDetailActions = ({ product, pubgId }: Props) => {
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

    // `token_placeholder` kontrolü: null ise direkt ekleme yap
    if (product.token_placeholder === null) {
      if (cartProduct) {
        dispatch(increaseQuantity(product.id));
        toast.success("Product miqdarı artırıldı", {
          position: "top-left",
        });
      } else {
        dispatch(addProduct({ ...product, quantity: 1, pubgId }));
        toast.success("Product səbətə əlavə edildi", {
          position: "top-left",
        });
      }
      return; // Geri dönerek diğer kontrolleri atla
    }

    // `token_placeholder` null değilse kontroller çalışır
    if (product.type === "Pubg" && pubgId === "") {
      toast.error(
        `${product.token_placeholder || "Pubg ID"} sahəsi boş ola bilməz`,
        {
          position: "top-left",
        }
      );
    } else if (product.type !== "Pubg Mobile" && pubgId === "") {
      toast.error(
        `${product.token_placeholder || "Mobil nömrə"} sahəsi boş ola bilməz`,
        {
          position: "top-left",
        }
      );
    } else {
      if (cartProduct) {
        dispatch(increaseQuantity(product.id));
        toast.success("Product miqdarı artırıldı", {
          position: "top-left",
        });
      } else {
        dispatch(addProduct({ ...product, quantity: 1, pubgId }));
        toast.success("Product səbətə əlavə edildi", {
          position: "top-left",
        });
      }
    }
  };

  const handleDecreaseProduct = () => {
    dispatch(
      cartProduct?.quantity && cartProduct.quantity !== 1
        ? decreaseQuantity(product.id)
        : removeProduct(product)
    );
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
        <span className="mx-2">{cartProduct?.quantity || "1"}</span>
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
