"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import BalansImage from "../../../../../public/balans.webp";

const Hero = () => {
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await fetch(
          "https://e-commerce.saytyarat.com/api/products/slider/?page_size=20"
        );
        const dataSlider = await res.json();

        const images = dataSlider.results.map((item: any) => item.image);
        setSliderImages(images);
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <section className="py-2 dark:bg-[#121212]  lg:h-full">
      <div className="flex h-full px-0 sm:px-4 md:px-4 dark:bg-[#1f1f1f] bg-[#988d57] rounded-2xl flex-col lg:flex-row items-center lg:justify-between max-w-[1280px] mx-auto text-[#fff] lg:py-2 lg:px-2 space-y-2 lg:space-y-0 lg:space-x-4">
        {/* Slider Section */}
        <div className="w-full lg:w-2/3 text-[#000] rounded-md">
          {sliderImages.length > 0 ? (
            <Slider {...sliderSettings}>
              {sliderImages.map((image, index) => (
                <div key={index} className="slider-wrapper">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="slider-image"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-400">Şəkillər yüklənir...</p>
          )}
        </div>

        {/* Right Section with Balans and Secure Images */}
        <div className="w-full lg:w-1/3 flex flex-row flex-wrap lg:flex-col lg:space-y-4 lg:space-x-0 sm:space-x-0">
          {/* Balance Image */}
          <Link href={"/balance"} className="w-1/2 lg:w-full">
            <div className="relative h-[100px] sm:h-[240px] md:h-[300px] lg:h-[225px]">
              <Image
                src={BalansImage}
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
                src={'/endirim.webp'}
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

      <style jsx>{`
        .slider-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9; /* İstediğiniz oran */
          overflow: hidden;
        }

        .slider-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </section>
  );
};

export default Hero;
