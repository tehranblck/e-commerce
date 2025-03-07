import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./hero.css";

async function getSliderImages() {
  try {
    const res = await fetch(
      "https://admin.raelli.az/api/products/slider/?page_size=20",
      { next: { revalidate: 3600 } }
    );
    const dataSlider = await res.json();
    return dataSlider.results.map((item: any) => item.image);
  } catch (error) {
    console.error("Error fetching slider images:", error);
    return [];
  }
}

export default async function Hero() {
  const sliderImages = await getSliderImages();

  return (
    <section className="py-2 dark:bg-[#121212] lg:h-full">
      <div className="flex h-full px-0 sm:px-4 md:px-4 dark:bg-[#1f1f1f] bg-[#988d57] rounded-2xl flex-col lg:flex-row items-center lg:justify-between max-w-[1280px] mx-auto text-[#fff] lg:py-2 lg:px-2 space-y-2 lg:space-y-0 lg:space-x-4">
        {/* Slider Section */}
        <div className="w-full lg:w-2/3 text-[#000] rounded-md">
          {sliderImages.length > 0 ? (
            <div className="slider-wrapper">
              <Image
                src={sliderImages[0]}
                alt="Main Slide"
                layout="fill"
                objectFit="cover"
                className="slider-image"
              />
            </div>
          ) : (
            <p className="text-center text-gray-400">Şəkillər yüklənir...</p>
          )}
        </div>

        {/* Right Section with Balans and Secure Images */}
        <div className="flex flex-row lg:flex-col w-full lg:w-1/3 space-x-2 lg:space-x-0 lg:space-y-2">
          {/* Balance Image */}
          <Link href={"/balance"} className="w-1/2 lg:w-full">
            <div className="relative h-[100px] sm:h-[240px] md:h-[300px] lg:h-[225px]">
              <Image
                src="/balans.webp"
                layout="fill"
                objectFit="contain"
                quality={86}
                alt="Balance"
                className="rounded-md"
              />
            </div>
          </Link>

          {/* Telegram Image */}
          <div className="w-1/2 lg:w-full">
            <div className="relative h-[100px] sm:h-[240px] md:h-[300px] lg:h-[225px]">
              <Image
                src="/endirim.webp"
                layout="fill"
                objectFit="contain"
                quality={86}
                alt="Telegram Link"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
