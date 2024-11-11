"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '@/app/models/ui/Product';
import { removeProduct, increaseQuantity, decreaseQuantity } from '@/app/store/features/product/productSlice';
import DeleteIcon from "@mui/icons-material/Delete";


const CartItemList = () => {
  const products = useSelector(
    (state: Product[] | any) => state.product.products,
  );
  const dispatch = useDispatch();

  const calculateSingleProductTotalPrice = (product: Product) => {
    return product.price * (product?.quantity ?? 0);
  };
  return (
    <div className="overflow-x-auto w-full xl:w-[800px] rounded-md mb-2 lg:mb-8">
      {products.length > 0 ? (
        <table className="min-w-full bg-[#1E201E] border-none">
          <thead className="bg-black text-white">
            <tr>
              <th className="w-1/4 py-3 px-6 text-left ">Məhsul</th>
              <th className="w-1/4 py-3 px-6 text-left">Qiymət</th>
              <th className="w-1/4 py-3 px-6 text-left">Ədəd</th>
              <th className="w-1/4 py-3 px-6 text-left">Ümumi</th>
              <th className="w-1/4 py-3 px-6 text-left">Sil</th>
            </tr>
          </thead>

          <tbody className="">
            {products.map((product: Product) => (
              <tr
                key={product.id}
                className="text-white border-b-[1.2px]  border-b-black"
              >
                <td className="py-4 px-6 ">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <span className="ml-4 xl:w-[180px] hidden xl:table-cell">
                      {product.title}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6">
                  {product.price.toFixed(2)} AZN
                </td>
                <td className="py-3 px-6 ">
                  <button
                    className="bg-yellow-500 text-white w-8 rounded-sm font-bold"
                    onClick={() =>
                      (product.quantity ?? 0) <= 1
                        ? dispatch(removeProduct(product))
                        : dispatch(decreaseQuantity(product.id))
                    }
                  >
                    -
                  </button>
                  <span className="px-2">{product.quantity}</span>
                  <button
                    className="bg-yellow-500 text-white w-8 rounded-sm font-bold"
                    onClick={() => dispatch(increaseQuantity(product.id))}
                  >
                    +
                  </button>
                </td>
                <td className="py-3 px-6">
                  {calculateSingleProductTotalPrice(product).toFixed(2)} Azn
                </td>
                <td
                  onClick={() => dispatch(removeProduct(product))}
                  className="py-3 px-6 cursor-pointer"
                >
                  <DeleteIcon className="text-red-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex text-xl dark:text-white py-4 items-center w-full justify-center pb-24 ">
          Səbət Boşdur!
        </div>
      )}
    </div>
  )
}

export default CartItemList