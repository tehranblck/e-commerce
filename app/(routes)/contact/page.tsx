import FutureCard from "@/app/components/ui/shared/FutureCard";
import React from "react";

const ContactPage = () => {
  return (
    <section className="dark:bg-[#121212]">
      <div className="pt-[220px] lg:pt-[180px]">
        <div className="flex items-center justify-center w-full">
          <h1 className="text-[42px] dark:text-[#fff]">Bizimlə Əlaqə</h1>
        </div>

        <div className="flex flex-col items-center justify-center w-full pb-[90px]">
          <div className="w-full max-w-[1280px] mx-auto">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="w-full">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="w-full">
                    <div className="flex flex-col dark:text-white items-center justify-center w-full space-y-4 px-2 text-center">
                      <p className="dark:text-[#fff] text-[26px]">
                        Əgər sualınız varsa, bizimlə əlaqə saxlayın.
                      </p>
                      <p>Əlaqə nömrəsi: +994 51 896 56 54</p>
                      <p>Əlaqə nömrəsi: +994 60 595 15 35</p>
                      <p>Mail: Muslimanshop@gmail.com</p>
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
