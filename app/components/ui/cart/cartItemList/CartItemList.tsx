"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "@/app/models/ui/Product";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
} from "@/app/store/features/product/productSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

const CartItemList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: { product: { products: Product[] } }) => state.product.products
  );

  const calculateTotalPrice = (product: Product) =>
    (product.price || 0) * (product.quantity || 0);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {products.length > 0 ? (
        <div className="overflow-hidden">
          <table className="hidden md:table w-full bg-[#1E201E] rounded-lg border border-gray-700">
            {/* Table Head */}
            <thead className="bg-black text-white">
              <tr>
                {["Məhsul", "Qiymət", "Ədəd", "Ümumi", "Sil"].map((header, index) => (
                  <th key={index} className="py-3 px-4 text-left text-sm sm:text-md md:text-lg">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-white border-b border-gray-600">
                  {/* Product Info */}
                  <td className="py-4 px-4 flex items-center space-x-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm md:text-md">{product.title}</span>
                      <p className="text-xs text-gray-400">
                        Rəng: {product.selectedColor || "Seçilməyib"}
                      </p>
                      <p className="text-xs text-gray-400">
                        Ölçü: {product.selectedSize || "Seçilməyib"}
                      </p>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 text-sm sm:text-md">{(product.price || 0).toFixed(2)} AZN</td>

                  {/* Quantity Controls */}
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-yellow-500 text-white w-7 h-7 rounded-md font-bold text-xs sm:text-sm"
                        onClick={() =>
                          product.quantity && product.quantity > 1
                            ? dispatch(decreaseQuantity(product.id))
                            : dispatch(removeProduct(product.id))
                        }
                      >
                        -
                      </button>
                      <span className="text-sm sm:text-md">{product.quantity ?? 0}</span>
                      <button
                        className="bg-yellow-500 text-white w-7 h-7 rounded-md font-bold text-xs sm:text-sm"
                        onClick={() => dispatch(increaseQuantity(product.id))}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Total Price */}
                  <td className="py-3 px-4 text-sm sm:text-md">{calculateTotalPrice(product).toFixed(2)} AZN</td>

                  {/* Remove Button */}
                  <td className="py-3 px-4">
                    <button
                      className="p-2 rounded-md hover:bg-gray-800"
                      onClick={() => dispatch(removeProduct(product.id))}
                    >
                      <DeleteIcon className="text-red-500 w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#1E201E] text-white p-4 rounded-lg border border-gray-700 flex flex-col space-y-3"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-sm">{product.title}</p>
                    <p className="text-xs text-gray-400">Rəng: {product.selectedColor || "Seçilməyib"}</p>
                    <p className="text-xs text-gray-400">Ölçü: {product.selectedSize || "Seçilməyib"}</p>
                  </div>
                </div>

                {/* Price & Quantity */}
                <div className="flex justify-between items-center">
                  <p className="text-sm sm:text-md font-semibold">{(product.price || 0).toFixed(2)} AZN</p>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white w-8 h-8 rounded-md font-bold text-xs"
                      onClick={() =>
                        product.quantity && product.quantity > 1
                          ? dispatch(decreaseQuantity(product.id))
                          : dispatch(removeProduct(product.id))
                      }
                    >
                      -
                    </button>
                    <span className="text-sm">{product.quantity ?? 0}</span>
                    <button
                      className="bg-yellow-500 text-white w-8 h-8 rounded-md font-bold text-xs"
                      onClick={() => dispatch(increaseQuantity(product.id))}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="bg-red-500 text-white p-2 rounded-md w-full mt-2"
                  onClick={() => dispatch(removeProduct(product.id))}
                >
                  Məhsulu Sil
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex text-xl dark:text-white py-6 items-center w-full justify-center">
          Səbət Boşdur!
        </div>
      )}
    </div>
  );
};

export default CartItemList;
