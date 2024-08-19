import React from "react";
import Image from "next/image";
import BalansImage from "../../../../../public/assets/images/balans.png";
import SecureImage from "../../../../../public/assets/images/secure-post.png";
import ElectroImage from "../../../../../public/assets/images/electro-image.png";

const Hero = () => {
  return (
    <section className="bg-black py-6 h-[100vh] lg:h-full">
      <div className="flex flex-col space-y-4 h-full lg:space-y-0 lg:flex-row items-center justify-center lg:justify-between max-w-[1280px] mx-auto text-[#fff] py-2 lg:px-2 lg:space-x-3">
        <div className="text-[#000] ">
          <Image
            src={ElectroImage}
            className="w-[300px] h-[160px] md:w-[600px] md:h-[180px]  lg:w-[960px] lg:h-[370px] object-cover rounded-md "
            width={0}
            height={0}
            alt="ss"
          />
        </div>
        <div>
          <div className="flex flex-col lg:justify-between space-y-4 lg:space-y-0 h-[370px] items-stretch">
            <Image  
              src={BalansImage}
              alt="as"
              width={0}
              height={0}
              className="rounded-md w-[300px] h-[160px] md:w-[600px] md:h-[180px] lg:w-[300px] lg:h-[178px] object-cover "
            />

            <Image
              src={SecureImage}
              alt="as"
              width={0}
              height={0}
              className="rounded-md w-[300px] h-[160px] md:w-[600px] md:h-[180px] lg:w-[300px] lg:h-[178px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
