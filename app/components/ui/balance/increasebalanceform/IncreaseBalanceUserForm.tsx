"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

const IncreaseBalanceUserForm = () => {
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
      {fileError && <p className="text-red-600 text-sm mt-2">{fileError}</p>}
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
        className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
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
  );
};

export default IncreaseBalanceUserForm;
