import React from "react";
import Link from "next/link";
import Loading from "@/app/components/ui/shared/Loading";
import Image from "next/image";
import SharedProduct from "@/app/components/ui/product/sharedproduct/SharedProduct";
import { fetchProduct } from "@/app/services/modules/productdetail";
import type { Metadata, ResolvingMetadata } from "next";
import { Product } from "@/app/models/ui/Product";

const ProductDetail = async ({
  params,
}: {
  params: { id: number; slug: string };
}) => {
  const product = await fetchProduct(params.id);

  if (!product) {
    return (
      <div className="flex justify-center items-center pt-40 w-full bg-[#181818]">
        <Loading />
      </div>
    );
  }


  return (
    <section className="dark:bg-[#121212] py-6 ">
      <div className="flex justify-center items-center text-[#fff] mx-2 px-2">
        <div className="dark:bg-[#181818] py-10 px-6 rounded-md">
          <div className="flex sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-full flex-col xl:flex-row justify-between xl:space-x-4">
            <Image
              width={350}
              height={150}
              src={product.image}
              className="w-full rounded-md "
              alt={product.title}
            />

            <div className="w-full flex flex-col justify-between space-y-8">
              <div className="flex flex-col space-y-3 mt-4 xl:mt-0">
                <h2 className="sm:text-[16px] md:text-[28px] dark:text-white text-black xl:text-[32px] font-bold">
                  {product.title}
                </h2>
                <p className="text-[#5d5d5d]">{product.description}</p>
                <Link href={"/"} className="text-[14px] text-yellow-500">
                  Digər məhsullar {"-->"}
                </Link>
              </div>
              <div className="space-y-2 w-full">
                <button className="dark:bg-[#1e1e1e] text-lg w-full rounded-md border-[1px] border-[#282828] text-indigo-600">
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

// `generateMetadata` to set metadata for each product page
export async function generateMetadata(
  { params }: { params: { id: number; slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const product = await fetchProduct(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
      alternates: {
        canonical: `https://muslimanshop.com/products/${product.id}/${product.slug}`,
      },
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default ProductDetail;
