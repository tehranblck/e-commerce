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
        <div className="space-y-4">
          {/* Desktop View */}
          <div className="hidden md:block">
            <table className="w-full bg-[#1E201E] rounded-lg border border-gray-700">
              <thead className="bg-black text-white">
                <tr>
                  {["Məhsul", "Qiymət", "Ədəd", "Ümumi", ""].map((header, index) => (
                    <th key={index} className="py-4 px-6 text-left text-sm font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="text-white border-b border-gray-700">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={product.image}
                            alt={product.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-sm text-gray-400">Rəng: {product.selectedColor || "Seçilməyib"}</p>
                          <p className="text-sm text-gray-400">Ölçü: {product.selectedSize || "Seçilməyib"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{product.price.toFixed(2)} AZN</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white w-8 h-8 rounded-md transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{product.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(product.id))}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white w-8 h-8 rounded-md transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">{calculateTotalPrice(product).toFixed(2)} AZN</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => dispatch(removeProduct(product.id))}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-[#1E201E] rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={product.image}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{product.title}</h3>
                    <p className="text-sm text-gray-400">Rəng: {product.selectedColor || "Seçilməyib"}</p>
                    <p className="text-sm text-gray-400">Ölçü: {product.selectedSize || "Seçilməyib"}</p>
                    <p className="text-white mt-1">{product.price.toFixed(2)} AZN</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white w-10 h-10 rounded-md transition-colors text-lg"
                    >
                      -
                    </button>
                    <span className="text-white w-8 text-center text-lg">{product.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(product.id))}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white w-10 h-10 rounded-md transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeProduct(product.id))}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <DeleteIcon />
                  </button>
                </div>
                <div className="mt-4 text-right">
                  <p className="text-white font-medium">
                    Ümumi: {calculateTotalPrice(product).toFixed(2)} AZN
                  </p>
                </div>
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
