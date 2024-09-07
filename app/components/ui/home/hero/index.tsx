import React from "react";
import Image from "next/image";
import BalansImage from "../../../../../public/assets/images/balans.png";
import SecureImage from "../../../../../public/assets/images/secure-post.png";
import ElectroImage from "../../../../../public/assets/images/electro-sec.png";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-black py-6  lg:h-full">
      <div className="flex   h-full  px-4  flex-row items-center  lg:justify-between max-w-[1280px] mx-auto text-[#fff] lg:py-2 lg:px-2 space-x-1 md:space-x-2">
        <div className="text-[#000]">
          <Image
            src={ElectroImage}
            className=" object-cover w-[900px]  rounded-md "
            // width={700}
            height={240}
            alt="ss"
          />
        </div>

        <div>
          <div className="flex flex-col justify-between space-y-1 md:space-y-2 h-full">
            <Link href={'/balance'} className="hover">
              <Image
                src={BalansImage}
                alt="as"
                // width={320}
                // height={120}
                className="w-[440px] rounded-md  object-cover "
              />
            </Link>
            <div >
              <Image
                src={SecureImage}
                alt="as"
                // width={320}
                // height={180}
                className="w-[440px]  rounded-md object-cover"
              />
            </div>
            {/* w-[300px] h-[160px] md:w-[600px] md:h-[180px] lg:w-[300px] lg:h-[178px] */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
