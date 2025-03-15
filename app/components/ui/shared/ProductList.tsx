import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  type: string;
  slug: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}


const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // Detaylı debug için
  console.log('ProductList - Gelen Products:', {
    productsLength: products?.length,
    productsData: products
  });

  // Eğer products undefined veya boş ise
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Məhsul tapılmadı</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => {
          // Her ürün için debug
          console.log('Ürün Detayı:', product);

          return (
            <Link
              href={`/products/${product?.id}/${product?.slug}`}
              key={product?.id}
              className="group block w-full h-[400px] relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Ana Görsel */}
              <div className="absolute inset-0 w-full h-full">
                {product?.image ? (
                  <Image
                    src={product.image}
                    alt={product?.title || 'Ürün Görseli'}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400">Şəkil yoxdur</span>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Üst Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-xs font-medium text-white capitalize">
                  {product?.type || 'Kateqoriya yoxdur'}
                </span>
              </div>

              {/* İçerik */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {product?.title || 'Başlıq yoxdur'}
                </h3>

                <p className="text-sm text-gray-200 line-clamp-2 mb-4 opacity-90">
                  {product?.description || 'Təsvir yoxdur'}
                </p>

                {/* Fiyat Gösterimi */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-yellow-500">
                    {product?.price?.toFixed(2)} AZN
                  </span>
                </div>

                {/* Alt Bilgi */}
                <div className="flex items-center mt-auto">
                  <span className="inline-flex items-center text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    Ətraflı məlumat
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
