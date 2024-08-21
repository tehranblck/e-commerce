import React from "react";
import { Product } from "@/app/models/ui/Product";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


async function fetchProduct(id: number) {
  const res = await fetch(`https://api.muslimanshop.com/api/products/${id}/`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
}

const ProductDetail = async ({ params }: { params: { id: number } }) => {
  const product: Product = await fetchProduct(params.id);
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
                <Link href={"/"} className="text-[14px] text-yellow-500 ">Digər məhsullar {"-->"}</Link>
              </div>
              <div className="space-y-2">
                <button className="bg-[#1e1e1e] text-lg w-full rounded-md  border-[1px] border-[#282828] text-indigo-600">
                  {product.price.toFixed(2)} Azn
                </button>
                <input
                  type="text"
                  className="w-full rounded-md border-[1px] border-[#282828] bg-[#1e1e1e] border-blue- p-2"
                  placeholder="Pubg id"
                />
                <button className="bg-yellow-500 hover:bg-white transition-all duration-300 text-lg w-full rounded-md  border-[1px] border-[#000] py-[7px] text-black font-bold">
                <ShoppingCartIcon className="mr-1 text-[22px]"/>  Səbətə əlavə et
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
