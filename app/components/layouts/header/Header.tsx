import React from "react";
import TopNavbar from "./components/Top-Navbar";
import Navbar from "./components/Navbar";

const Header = () => {
  return (
    <header className="flex flex-col w-full  z-[100] ">
      <TopNavbar />
      <span className="bg-gray-400 h-[1px] w-full dark:bg-black" />
      <Navbar />
    </header  >
  );
};

export default Header;
