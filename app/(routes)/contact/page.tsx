import FutureCard from "@/app/components/ui/shared/FutureCard";
import React from "react";

const ContactPage = () => {
  return (
    <section className="bg-[#121212]">
      <div className="">
        <div className="flex items-center justify-center w-full">
          <h1 className="text-[42px] text-[#fff]">Bizimlə Əlaqə</h1>
        </div>

        <div className="flex flex-col items-center justify-center w-full pb-[90px]">
          <div className="w-full max-w-[1280px] mx-auto">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="w-full">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="w-full">
                    <div className="flex flex-col dark:text-white items-center justify-center w-full space-y-4 px-2 text-center">
                      <p className="text-[#fff] text-[26px]">
                        Əgər sualınız varsa, bizimlə əlaqə saxlayın.
                      </p>

                      <p className="text-white">Əlaqə nömrəsi: <a href="tel:+994503332133" className="text-yellow-500">050 333 21 33</a></p>
                      <p className="text-white">Mail: <a href="mailto:info@raelli.az" className="text-yellow-500">info@raelli.az</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FutureCard />
      </div>
    </section>
  );
};

export default ContactPage;
