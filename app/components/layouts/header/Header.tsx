import React from "react";
import TopNavbar from "./components/Top-Navbar";
import Navbar from "./components/Navbar";

const Header = () => {
  return (
    <header className="flex flex-col  w-full  z-[100] ">
      <TopNavbar />
      <span className="bg-[#121212]  h-[2px] w-full" />
      <Navbar />
    </header  >
  );
};

export default Header;
