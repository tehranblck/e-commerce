"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import UserRegister from "@/app/models/auth/UserRegister";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "@/app/services/auth/signupService";
import Link from "next/link";




const SignUp = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);


  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    password2: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Added isSubmitting state

  const fetcher = async (url: string, formData: UserRegister) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error: any = new Error(
        "An error occurred while fetching the data.",
      );
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !password.password ||
      !password.password2
    ) {
      toast.error("Bütün sahələr doldurulmalıdır.", { position: "top-right" });
      return;
    }

    if (password.password.length < 8) {
      toast.error("Parolda ən azı 8 simvol olmalıdır.", {
        position: "top-right",
      });
      return;
    }

    if (password.password !== password.password2) {
      toast.error("Parollar uyğunlaşmır.", { position: "top-right" });
      return;
    }

    const formData: UserRegister = {
      first_name: name,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      password: password.password,
      password2: password.password2,
    } as UserRegister;

    setIsSubmitting(true);

    try {
      await registerUser(formData);
      toast.success("Qeydiyyat uğurla tamamlandı! Zəhmət olmasa giriş edin.", {
        position: "top-right",
      });
      router.push("/auth/login");
    } catch (error) {
      toast.error("İstifadəçi artıq mövcuddur.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="dark:bg-black">
      <div className="flex justify-center py-8 px-4 pt-[220px] lg:pt-[150px]">
        <form
          action=""
          className="w-[500px] dark:bg-[#151515] dark:border-0 border-2 bg-[#bbbbbb72] rounded-lg p-8 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="text-white flex flex-col justify-center items-center mb-6">
            <h1 className="font-bold text-[32px] dark:text-white text-black">Daxil Ol</h1>
            <p className="dark:text-white text-black">Məlumatları daxil edin</p>
          </div>
          <div className="flex justify-center flex-col w-full space-y-4">
            <input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              type="text"
              placeholder="Ad"
              className="border-[2px] py-2 rounded-md text-black outline-none pl-2 focus:border-yellow-500"
            />
            <input
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
              type="text"
              placeholder="Soyad"
              className="border-[2px] text-black py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
            <input
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="Email Asdresi"
              className="border-[2px] text-black py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
            <input
              value={phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(e.target.value)
              }
              type="text"
              placeholder="Telefon Nömrəsi"
              className="border-[3px] text-black py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
            <input
              value={password.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword({
                  password: e.target.value,
                  password2: password.password2,
                })
              }
              type="password"
              placeholder="Şifrə"
              className="border-[3px] text-black py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
            <input
              value={password.password2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword({
                  password: password.password,
                  password2: e.target.value,
                })
              }
              type="password"
              placeholder="Təkrar Şifrə"
              className="border-[3px] text-black py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
          </div>
          {/* <div className="w-full text-end mt-6">
            <Link
              href={"/forgot"}
              className="text-white text-[14px] underline cursor-pointer"
            >
              Şifrəni Unutmuşam
            </Link>
          </div> */}
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <button
              type="submit"
              className={`align-center text-center text-white text-[18px] font-bold transition-all duration-300 hover:opacity-85 bg-indigo-700 w-full rounded-md py-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
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
                "Qeydiyyatdan keç"
              )}
            </button>
            <span className="dark:text-white mt-6 mb-4">Artıq hesabınız var?</span>
            <Link
              href={"/auth/login"}
              className="align-center text-center text-[18px] font-bold transition-all duration-300 text-[#fff] bg-indigo-700 opacity-45 hover:opacity-100 w-full rounded-md py-4"
            >
              Daxil ol
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
