import React from "react";

const Login = () => {
  return (
    <section className="bg-black">
      <div className="flex justify-center py-8 px-4">
        <form action="" className="w-[500px] bg-[#151515] rounded-lg p-8 mt-4">
          <div className=" text-white flex flex-col justify-center items-center mb-6">
            <h1 className="font-bold text-[32px]">Daxil Ol</h1>
            <p>Məlumatları daxil edin</p>
          </div>
          <div className="flex justify-center flex-col w-full space-y-2">
            <input
              type="email"
              placeholder="Email Asdresi"
              className="border-[2px] border-[#221f1f] py-2 rounded-md outline-none pl-2 focus:border-yellow-500"
            />
            <input
              type="password"
              placeholder="Şifrə"
              className="border-[3px] border-[#221f1f] py-2 rounded-md outline-none  pl-2 focus:border-yellow-500"
            />
          </div>
          <div className="flex justify-center w-full">
            <button className="align-center text-center text-white">Hesab Yarat</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
