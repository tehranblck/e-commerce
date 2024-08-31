"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserRegister } from "@/app/models/auth/userregister";
import useSWR from "swr";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    password2: "",
  });

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
    
    if (!name || !lastName || !phoneNumber || !email || !password.password || !password.password2) {
      toast.error("Bütün sahələr doldurulmalıdır.", { position: "top-right" });
      return;
    }

    if (password.password.length < 8) {
      toast.error("Parolda ən azı 8 simvol olmalıdır.", { position: "top-right" });
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

    try {
        const data = await fetcher(
          "https://api.muslimanshop.com/api/user/register/",
          formData,
        );
         toast.success("Qeydiyyat uğurla tamamlandı! Zəhmət olmasa giriş edin.", {
          position: "top-right",
        });
        router.push("/auth/login");

      

    } catch (error) {
      toast.error(`istifadəçi artıq mövcuddur.`, {
        position: "top-right",
      });
    }
    console.log(formData);
  };
  return (
    <section className="bg-black">
      <div className="flex justify-center py-8 px-4">
        <form
          action=""
          className="w-[500px] bg-[#151515] rounded-lg p-8 mt-4"
          onSubmit={handleSubmit}
        >
          <div className=" text-white flex flex-col justify-center items-center mb-6">
            <h1 className="font-bold text-[32px]">Daxil Ol</h1>
            <p>Məlumatları daxil edin</p>
          </div>
          <div className="flex justify-center flex-col w-full space-y-4">
            <input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              type="text"
              placeholder="Ad"
              className="border-[2px]  py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
            <input
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
              type="text"
              placeholder="Soyad"
              className="border-[2px]  py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
            <input
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="Email Asdresi"
              className="border-[2px]  py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
            <input
              value={phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(e.target.value)
              }
              type="text"
              placeholder="Telefon Nömrəsi"
              className="border-[3px]  py-2 rounded-md outline-none  pl-2 focus:border-yellow-500"
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
              className="border-[3px]  py-2 rounded-md outline-none  pl-2 focus:border-yellow-500"
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
              className="border-[3px]  py-2 rounded-md outline-none  pl-2 focus:border-yellow-500"
            />
          </div>
          <div className="w-full text-end mt-6">
            <Link
              href={"/forgot"}
              className="text-white text-[14px] underline cursor-pointer"
            >
              Şifrəni Unutmuşam
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-4 ">
            <button
              type="submit"
              className="align-center text-center text-white text-[18px] font-bold transition-all duration-300 hover:opacity-85 bg-indigo-700 w-full rounded-md py-4"
            >
              Qeydiyyatdan keç
            </button>
            <span className="text-white mt-6 mb-4">Artıq hesabınız var?</span>
            <Link
              href={"/auth/login"}
              className="align-center text-center text-[18px] font-bold transition-all duration-300 text-[#fff] bg-indigo-700 opacity-45 hover:opacity-100 w-full rounded-md py-4 "
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
