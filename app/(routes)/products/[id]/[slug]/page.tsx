import React from "react";
import Loading from "@/app/components/ui/shared/Loading";
import { fetchProduct } from "@/app/services/modules/productdetail";
import type { Metadata, ResolvingMetadata } from "next";

import ClientProductDetail from "./ClientProductDetail";

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

  return <ClientProductDetail product={product} />;
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
        canonical: `https://admin.raelli.az/products/${product.id}/${product.slug}`,
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
