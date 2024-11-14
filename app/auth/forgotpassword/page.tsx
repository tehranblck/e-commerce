"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sendResetPasswordEmail } from "@/app/services/auth/forgotPasswordService";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

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
      await sendResetPasswordEmail(email);

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
    <section className="dark:bg-black">
      <div className="flex justify-center py-8 px-4 pt-[200px] lg:pt-[140px]">
        <form
          className="w-[500px] dark:bg-[#151515] rounded-lg p-8 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="text-white flex flex-col justify-center items-center mb-6">
            <h1 className="font-bold dark:text-white text-black text-[32px]">Şifrəni Unutmusunuz?</h1>
            <p className="text-black dark:text-white">Şifrəni yeniləmək üçün emailinizi daxil edin</p>
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
              className="border-[2px] text-black py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
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
