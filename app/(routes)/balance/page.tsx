"use client";
import React from "react";
import { useState } from "react";
import CardIMage from "../../../public/assets/images/balans.png";
import Image from "next/image";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

const BalanceComponent = () => {
  const [fileError, setFileError] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^0-9.]/g, "");
    const decimalValue = cleanedValue.match(/^\d*\.?\d{0,2}$/)
      ? cleanedValue
      : amount;
    setAmount(decimalValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
      const maxSizeInMB = 8;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (!validExtensions.includes(file.type)) {
        setFileError("Çekin file formatı düzgen deyil(.jpg, .jpeg, .png).");
        setSelectedFile(null);
        return;
      }

      if (file.size > maxSizeInBytes) {
        setFileError("File size must be under 8MB.");
        setSelectedFile(null);
        return;
      }

      setFileError("");
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError("Zəhmət olmasa çekin şəkilini seçin.");
      return;
    }
    if (!amount) {
      alert("Məbləğ daxil edin");
      console.log("ok");

      return;
    }

    setIsSubmitting(true);
    

    const formData = {
      receipt_image: selectedFile,
      claimed_amount: amount,
    };

    console.log(formData, "formdata");

    try {
      const formData = new FormData();
      const userToken = getCookie("userToken")?.replace(/"/g, "");

      formData.append("receipt_image", selectedFile);
      formData.append("claimed_amount", amount);

      const response = await fetch(
        "https://api.muslimanshop.com/api/user/balance/add/",
        {
          method: "POST",
          headers: {
            Authorization: `${userToken}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        toast.success("Balans artımı üçün çek göndərildi!", {
          position: "top-right",
        });
      } else {
        setFileError("Şəkili göndərmək mümkün olmadı.");
        toast.error("Şəkili göndərmək mümkün olmadı", {
            position: "top-right",
          });
      }
    } catch (error) {
      setFileError("An error occurred during the upload.");
      console.error("Upload error:", error);
    } finally {
        setIsSubmitting(false); // Stop loading
      }
  };
  return (
    <section className="bg-[#121212] py-6 pt-[200px] lg:pt-[150px]">
      <div className="max-w-[1280px] mx-auto">
        <div className=" flex items-center justify-center w-full mb-4">
          <h1 className="text-[42px] text-[#fff]">Balans</h1>
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

        <div className="bg-[#1E201E] mt-4 flex flex-col items-center  rounded-md py-4 mx-2">
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
                    <span className="text-[#646464] text-sm">54454450540</span>
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
                    <span className="font-600">M10 nomresi</span>
                    <span className="text-[#646464] text-sm">
                      +994505050041
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex  mt-6 lg:mt-0 mx-2 md:mx-0">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg mx-auto flex flex-col "
              >
                <label
                  htmlFor="fileInput"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Şəkil yüklə
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept=".jpg,.jpeg,.png"
                  placeholder="d"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleFileChange}
                />
                {fileError && (
                  <p className="text-red-600 text-sm mt-2">{fileError}</p>
                )}
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="rounded-md bg-transparent border-[1px] border-[#282828] text-white mt-2 py-1 px-2 text-sm"
                  placeholder="Mədaxil edilən məbləğ *"
                  value={amount}
                  required
                  onChange={handleAmountChange}
                />
                                <button
                  type="submit"
                  className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting} // Disable button when submitting
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-3 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6h2z"
                        ></path>
                      </svg>
                      Yüklənir...
                    </span>
                  ) : (
                    "Göndər"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BalanceComponent;
