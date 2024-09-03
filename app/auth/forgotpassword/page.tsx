"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Zəhmət olmasa email daxil edin.", {
        position: "top-right",
      });
      return;
    }

    const formData = {
      email: email,
    };

    try {
      const response = await fetch(
        "https://api.muslimanshop.com/api/user/send-reset-password-email/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send reset email");
      }

      toast.success("Şifrə sıfırlama emaili göndərildi!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Şifrə sıfırlama emaili göndərmək alınmadı.", {
        position: "top-right",
      });
    }
  };

  return (
    <section className="bg-black">
      <div className="flex justify-center py-8 px-4 pt-[200px] lg:pt-[140px]">
        <form
          className="w-[500px] bg-[#151515] rounded-lg p-8 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="text-white flex flex-col justify-center items-center mb-6">
            <h1 className="font-bold text-[32px]">Şifrəni Unutmusunuz?</h1>
            <p>Şifrəni yeniləmək üçün emailinizi daxil edin</p>
          </div>
          <div className="flex justify-center flex-col w-full space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Email Adresi *"
              required
              className="border-[2px] py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />

            <button
              type="submit"
              className="align-center text-center text-white text-[18px] font-bold transition-all duration-300 hover:opacity-85 bg-indigo-700 w-full rounded-md py-4"
            >
              Bağlantı göndər
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
