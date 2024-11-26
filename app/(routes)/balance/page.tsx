import React from "react";
import CardIMage from "../../../public/assets/images/balans.png";
import Image from "next/image";
import IncreaseBalanceUserForm from "@/app/components/ui/balance/increasebalanceform/IncreaseBalanceUserForm";

const BalanceComponent = () => {
  return (
    <section className="dark:bg-[#121212] py-6 ">
      <div className="max-w-[1280px] mx-auto">
        <div className=" flex items-center justify-center w-full mb-4">
          <h1 className="text-[42px] dark:text-[#fff] ">Balans</h1>
        </div>
        <div className="flex bg-[#f5c2c7] flex-col items-center justify-center px-4 mx-2 rounded-md lg:max-w-[1280px] py-4">
          <div className="flex flex-col items-center ">
            <h1 className="text-[42px] text-red-500 py-2 font-bold">Diqqət!</h1>
            <p className="text-[#842029] font-bold pt-2 ">
              Saxta və ya istifadə olunmuş həmçinin şəkildə tam düşməmiş çeklər
              qəbul olunmur!
            </p>
          </div>
          <div className="pt-2">
            <p className="text-[#842029] font-bol">
              Şəkil formatı .jpg .png .jpeg formatında olmalıdır. 8MB-dan böyük
              olmamalıdır.
            </p>
          </div>
        </div>

        <div className="dark:xbg-[#1E201E] mt-4 flex flex-col items-center  rounded-md py-4 mx-2">
          <h3 className="text-[#646464] font-bold text-xl px-2 text-center ">
            Card To Card və ya Nömrəyə Artır(M10)
          </h3>

          <div className="flex flex-col lg:flex-row justify-between items-center md:items-start  w-full text-start px-4 mt-5  ">
            <div className="flex justify-between flex-col lg:flex-row space-y-10 lg:space-y-0 lg:w-[830px]">
              <div className="flex flex-col md:flex-row lg:justify-between ">
                <div>
                  <Image
                    src={CardIMage}
                    className="rounded-md"
                    width={250}
                    height={150}
                    alt=""
                  />
                </div>
                <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-8 md:ml-8 mt-3 md:mt-0 ">
                  <div className="flex items-start justify-start flex-col  text-white">
                    <span className="font-600">Bank</span>
                    <span className="text-[#646464] text-sm">Kapital bank</span>
                  </div>
                  <div className="flex items-start justify-start flex-col  text-white">
                    <span className="font-600">Kart nomresi</span>
                    <span className="text-[#646464] text-sm">
                      4169738824267854
                    </span>
                  </div>
                </div>
              </div>

              {/* <hr className="border-[2px]   border-[#282828] w-full" /> */}

              <div className="flex flex-col md:flex-row lg:justify-between ">
                <div>
                  <Image
                    src={CardIMage}
                    width={250}
                    className="rounded-md"
                    height={150}
                    alt=""
                  />
                </div>
                <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-8 md:ml-8 mt-3 md:mt-0 ">
                  <div className="flex items-start justify-start flex-col  text-white">
                    <span className="font-600">Nömrəyə köçürmə</span>
                    <span className="text-[#646464] text-sm">M10</span>
                  </div>
                  <div className="flex items-start justify-start flex-col  text-white">
                    <span className="font-600">M10 nömrəsi</span>
                    <span className="text-[#646464] text-sm">
                      (+994) 50 658 26 16
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex  mt-6 lg:mt-0 mx-2 md:mx-0">
              <IncreaseBalanceUserForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BalanceComponent;
