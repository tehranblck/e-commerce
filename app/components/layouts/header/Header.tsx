import React from "react";
import TopNavbar from "./components/Top-Navbar";
import Navbar from "./components/Navbar";

const Header = () => {
  return (
    <header className="flex flex-col w-full fixed z-[100]">
      <TopNavbar />
      <Navbar/>
    </header>
  );
};

export default Header;
