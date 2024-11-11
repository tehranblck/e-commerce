import React, { useState, useRef, useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import RuleIcon from "@mui/icons-material/Rule";
import CategoryIcon from "@mui/icons-material/Category";
import CottageIcon from "@mui/icons-material/Cottage";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";

const Navlinks: React.FC = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleOpenMobileMenu = () => {
    setOpenMobileMenu(true);
  };

  const handleCloseMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleCloseMobileMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    if (openMobileMenu) {
      handleCloseMobileMenu();
    }
  };

  const links = [
    {
      id: 1,
      link: "/",
      title: "Ana səhifə",
      icon: <CottageIcon className="text-[18px]  cursor-pointer" />,
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
          <li className="flex items-center text-black dark:text-[#fff]" key={link.id}>
            <Link href={link.link} className="flex items-center">
              <span className={`${link.id === 1 ? "hidden" : "mx-4"}`}>|</span>
              <div className="hover:bg-yellow-500 px-2 py-1 hover:text-black rounded-full transition-all duration-500 whitespace-nowrap">
                <span className="mr-2">{link.icon}</span>
                <span className="text-[16px]">{link.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <div className="xl:hidden ">
        <button type="button" onClick={handleOpenMobileMenu}>
          <MenuIcon className="text-[#fff]" />
        </button>

        <ul
          ref={menuRef}
          className={`${openMobileMenu
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
            } transform z-50 transition-transform duration-300 ease-in absolute flex flex-col space-y-4  top-0 h-[500px] w-[300px] md:w-[400px] left-0 border-r-[2px] border-b-[2px] border-[#221f1f] bg-[#181818] text-black pt-10 justify-between rounded-br-lg`}
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
                <Link
                  href={link.link}
                  className="flex items-center pb-4 pl-2"
                  onClick={handleLinkClick}
                >
                  <div className="hover:bg-yellow-500 px-2 hover:text-black rounded-full transition-all duration-500 whitespace-nowrap ">
                    <span className="mr-2">{link.icon}</span>
                    <span className="text-[16px]">{link.title}</span>
                  </div>
                </Link>
              </li>
              <hr className="border-[1px] border-[#221f1f] w-full" />
            </div>
          ))}
          <div className="py-4 flex space-x-6 w-full text-[#fff] items-center justify-center">
            <InstagramIcon className="text-[25px]  cursor-pointer text-end" />
            <span>
              <PhoneIcon className="text-[25px]  cursor-pointer" />
              +994 50 658 26 16
            </span>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navlinks;
