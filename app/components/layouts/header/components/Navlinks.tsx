import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import RuleIcon from "@mui/icons-material/Rule";
import CategoryIcon from "@mui/icons-material/Category";
import CottageIcon from "@mui/icons-material/Cottage";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navlinks = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const hanfleOpenMobileMenu = () => {
    setOpenMobileMenu(true);
    console.log("open mobile menu");
  };

  const handleCloseMobileMenu = () => {
    setOpenMobileMenu(false);
    console.log("close mobile menu");
  };

  const links = [
    {
      id: 1,
      link: "/",
      title: "Ana səhifə",
      icon: <CottageIcon className="text-[18px] cursor-pointer" />,
    },
    {
      id: 2,
      link: "/about",
      title: "Haqqımızda",
      icon: <InfoIcon className="text-[18px] cursor-pointer" />,
    },
    {
      id: 3,
      link: "/products",
      title: "Produktlar",
      icon: <CategoryIcon className="text-[18px] cursor-pointer" />,
    },
    {
      id: 4,
      link: "/rules",
      title: "Qaydalar",
      icon: <RuleIcon className="text-[18px] cursor-pointer" />,
    },
    {
      id: 5,
      link: "/contact",
      title: "Əlaqə",
      icon: <CallIcon className="text-[18px] cursor-pointer" />,
    },
  ];

  return (
    // Desktop
    <div className="xl:py-4">
      <ul className="hidden xl:flex">
        {links.map((link) => (
          <li className="flex items-center text-[#fff]" key={link.id}>
            <Link href={link.link} className="flex items-center">
              <span className={`${link.id === 1 ? "hidden" : "mx-4"}`}>|</span>
              <div className="hover:bg-yellow-500 px-2 hover:text-black rounded-full transition-all duration-500 whitespace-nowrap">
                <span className="mr-2">{link.icon}</span>
                <span className="text-[16px]">{link.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <div className="xl:hidden">
        <button type="button" onClick={hanfleOpenMobileMenu}>
          <MenuIcon className="text-[#fff]" />
        </button>

        <ul
          className={`${
            openMobileMenu
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          } transform transition-transform duration-300 ease-in absolute flex flex-col top-0 h-[500px] w-[300px] md:w-[400px] left-0 border-r-[2px] border-b-[2px] border-[#221f1f] bg-[#181818] text-black pt-10 justify-between`}
        >
          <div className="text-end">
            <button
              type="button"
              onClick={handleCloseMobileMenu}
              className="align-left mr-5 text-[25px] border-[2px] border-red-800 w-fit px-[5px] rounded-md"
            >
              <CloseIcon className="text-red-800" />
            </button>
          </div>

          {links.map((link) => (
            <div key={link.id}>
              <li className="flex items-center text-[#fff]">
                <Link href={link.link} className="flex items-center">
                  <div className="hover:bg-yellow-500 px-2 hover:text-black rounded-full transition-all duration-500 whitespace-nowrap">
                    <span className="mr-2">{link.icon}</span>
                    <span className="text-[16px]">{link.title}</span>
                  </div>
                </Link>
              </li>
              <hr className="border-[1px] border-[#221f1f] w-full" />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navlinks;
