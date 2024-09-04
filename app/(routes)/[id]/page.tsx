import React from "react";
import Link from "next/link";
import Loading from "@/app/components/ui/shared/Loading";
import Image from "next/image";
import SharedProduct from "@/app/components/ui/product/sharedproduct/SharedProduct";

const ProductDetail = async ({ params }: { params: { id: number } }) => {
  async function fetchProduct(id: number) {
    const res = await fetch(
      `https://api.muslimanshop.com/api/products/${id}/`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  }

  const product = await fetchProduct(params.id);

  if (!product) {
    return (
      <div className="flex justify-center items-center pt-40 w-full bg-[#181818]">
        <Loading />
      </div>
    );
  }

  return (
    <section className="bg-[#121212] py-6 pt-[220px] lg:pt-[180px]">
      <div className="flex justify-center items-center text-[#fff] mx-2 px-2">
        <div className="bg-[#181818] py-10 px-6 rounded-md">
          <div className="flex sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-full flex-col xl:flex-row justify-between xl:space-x-4">
            <Image
              width={350}
              height={150}
              src={product.image}
              className="w-full rounded-md"
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
              <div className="space-y-2 w-full">
                <button className="bg-[#1e1e1e] text-lg w-full rounded-md border-[1px] border-[#282828] text-indigo-600">
                  {product.price.toFixed(2)} Azn
                </button>
                <SharedProduct product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
