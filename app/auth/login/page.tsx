"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/features/auth/authSlice";
import { setCookie } from 'cookies-next';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Added isSubmitting state
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true); // Start loading

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://api.muslimanshop.com/api/user/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.first_name);

      const profileResponse = await fetch(
        "https://api.muslimanshop.com/api/user/profile/",
        {
          method: "GET",
          headers: {
            Authorization: data.token,
          },
        }
      );

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userProfile = await profileResponse.json();
      dispatch(setUser(userProfile));
      setCookie('userProfile', JSON.stringify(userProfile), { maxAge: 60 * 60 * 24 * 7 });
      console.log(data.token, 'data.token');
      
      setCookie('userToken', JSON.stringify(data.token), { maxAge: 60 * 60 * 24 * 7 });

      toast.success("Daxil oldunuz!", {
        position: "top-right",
      });

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(`İstifadəçi adı və ya parol səhvdir.`, {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <section className="bg-black">
      <div className="flex justify-center py-8 px-4 pt-[220px] lg:pt-[150px]">
        <form
          className="w-[500px] bg-[#151515] rounded-lg p-8 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="text-white flex flex-col justify-center items-center mb-6">
            <h1 className="font-bold text-[32px]">Daxil Ol</h1>
            <p>Məlumatları daxil edin</p>
          </div>
          <div className="flex justify-center flex-col w-full space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              placeholder="Email Addresi *"
              className="border-[2px] py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              placeholder="Şifrə *"
              className="border-[3px] py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
          </div>
          <div className="w-full text-end mt-6">
            <Link
              href={"/auth/forgotpassword"}
              className="text-white text-[14px] underline cursor-pointer"
            >
              Şifrəni Unutmuşam
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <button
              type="submit"
              className={`align-center text-center text-white text-[18px] font-bold transition-all duration-300 hover:opacity-85 bg-indigo-700 w-full rounded-md py-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                "Daxil Ol"
              )}
            </button>
            <span className="text-white mt-6 mb-4">
              Hələ də hesabınız yoxdur?
            </span>
            <Link
              href={"/auth/signup"}
              className="align-center text-center text-[18px] font-bold transition-all duration-300 text-[#fff] bg-indigo-700 opacity-45 hover:opacity-100 w-full rounded-md py-4"
            >
              Qeydiyyatdan Keç
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
