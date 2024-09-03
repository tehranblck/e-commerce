import React from "react";
import Link from "next/link";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const InformationBar = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between text-[#000] bg-yellow-500 py-2 px-4 rounded-md font-[500]">
      <h2 className="text-center ">{title}</h2>
      <Link href={"/products"} className="flex items-center space-x-1">
        <span>Hamısına bax</span> <LocalMallIcon className="text-[22px]" />
      </Link>
    </div>
  );
};

export default InformationBar;
