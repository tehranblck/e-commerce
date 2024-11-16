"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import BalansImage from "../../../../../public/assets/images/balans.png";

const Hero = () => {
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await fetch(
          "https://api.muslimanshop.com/api/products/slider/?page_size=20"
        );
        const dataSlider = await res.json();

        // Assuming API response is an array of objects with `imageUrl` or similar field
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
  };

  return (
    <section className="py-0 pt-8 dark:bg-[#121212] lg:h-full">
      <div className="flex h-full px-4 dark:bg-[#1f1f1f]  bg-[#bdbdbda3] rounded-2xl  flex-row items-center lg:justify-between max-w-[1280px] mx-auto text-[#fff] lg:py-2 lg:px-2 space-x-1 md:space-x-2">

        <div className="w-[900px] h-full text-[#000] overflow-hidden rounded-md">
          {sliderImages.length > 0 ? (
            <Slider {...sliderSettings}>
              {sliderImages.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image} // Assuming each object has `imageUrl`
                    alt={`Slide ${index + 1}`}
                    width={900}
                    height={240}
                    className="object-cover w-[900px] h-full"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-400">Görseller yükleniyor...</p>
          )}
        </div>

        {/* Right Section with Balans and Secure Images */}
        <div>
          <div className="flex flex-col justify-between space-y-1 md:space-y-2 h-full">
            <Link href={"/balance"} className="hover">
              <Image
                src={BalansImage}
                width={500}
                height={500}
                quality={86}
                alt="Balance"
                className="w-[440px] h-auto rounded-md object-cover"
              />
            </Link>
            <div>
              <Link href={'https://t.me/muslimanshop_com'}>
                <Image
                  src={'/assets/images/tg.png'}
                  width={500}
                  height={500}
                  quality={86}
                  alt="Secure"
                  className="w-[440px] h-auto rounded-md object-cover"
                /></Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
