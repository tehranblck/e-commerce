'use client'
import React, { useEffect, useState } from "react";
import CardImage from "../../../public/assets/images/balans.png";
import Image from "next/image";
import IncreaseBalanceUserForm from "@/app/components/ui/balance/increasebalanceform/IncreaseBalanceUserForm";
import PaymentsFetcher from "./PaymentsFetcher";

const BalanceComponent: React.FC = () => {
  const [payments, setPayments] = useState(null)
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await PaymentsFetcher();
        const payments = data.results
        setPayments(payments)
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <section className="dark:bg-[#121212] py-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center w-full mb-4">
          <h1 className="text-[42px] dark:text-[#fff]">Balans</h1>
        </div>

        {/* Warning Section */}
        <div className="flex bg-[#f5c2c7] flex-col items-center justify-center px-4 mx-2 rounded-md lg:max-w-[1280px] py-4">
          <div className="flex flex-col items-center">
            <h1 className="text-[42px] text-red-500 py-2 font-bold">Diqqət!</h1>
            <p className="text-[#842029] font-bold pt-2">
              Saxta və ya istifadə olunmuş həmçinin şəkildə tam düşməmiş çeklər
              qəbul olunmur!
            </p>
          </div>
          <div className="pt-2">
            <p className="text-[#842029] font-bold">
              Şəkil formatı .jpg .png .jpeg formatında olmalıdır. 8MB-dan böyük
              olmamalıdır.
            </p>
          </div>
        </div>

        {/* Balance Section */}
        <div className="dark:bg-[#1E201E] mt-4 flex flex-col items-center rounded-md py-4 mx-2">
          <h3 className="text-[#646464] font-bold text-xl px-2 text-center">
            Card To Card və ya Nömrəyə Artır (M10)
          </h3>

          {/* Card Information */}
          <div className="flex flex-col lg:flex-row justify-between items-center md:items-start w-full text-start px-4 mt-5">
            {/* Left Section */}
            <div className="flex justify-between flex-col lg:flex-row space-y-10 lg:space-y-0 lg:w-[830px]">
              {
                payments?.map((payment, index) => (
                  <div className="flex flex-col md:flex-row lg:justify-between">
                    <div>
                      <Image
                        src={payment.image}
                        width={250}
                        className="rounded-md"
                        height={150}
                        alt="M10 Transfer"
                      />
                    </div>
                    <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-8 md:ml-8 mt-3 md:mt-0">
                      <div className="flex items-start justify-start flex-col text-white">
                        <span className="font-semibold">{payment.title}</span>
                      </div>
                      <div className="flex items-start justify-start flex-col text-white">
                        {/* <span className="font-semibold">M10 nömrəsi</span> */}
                        <span className="text-[#646464] text-sm">
                          {payment.description}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              }
              {/* Card 1 */}


              {/* Card 2 */}
              {/* <div className="flex flex-col md:flex-row lg:justify-between">
                <div>
                  <Image
                    src={CardImage}
                    width={250}
                    className="rounded-md"
                    height={150}
                    alt="M10 Transfer"
                  />
                </div>
                <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-8 md:ml-8 mt-3 md:mt-0">
                  <div className="flex items-start justify-start flex-col text-white">
                    <span className="font-semibold">Nömrəyə köçürmə</span>
                  </div>
                  <div className="flex items-start justify-start flex-col text-white">
                    <span className="font-semibold">M10 nömrəsi</span>
                    <span className="text-[#646464] text-sm">
                      (+994) 50 658 26 16
                    </span>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right Section */}
            <div className="flex mt-6 lg:mt-0 mx-2 md:mx-0">
              <IncreaseBalanceUserForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BalanceComponent;
