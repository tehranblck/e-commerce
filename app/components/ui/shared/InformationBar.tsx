import React from "react";
import Link from "next/link";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const InformationBar = ({ title, sideInfo, HasButton, link }: { title: string, sideInfo?: string, HasButton: boolean; link?: string }) => {
  return (
    <div className="flex justify-between text-[#000] bg-yellow-500 py-2 px-4 rounded-md font-[500]">
      <h2 className="text-center ">{title}</h2>
      {
        HasButton ? (<Link href={`${link}`} className="flex items-center space-x-1">
          <span>{sideInfo ? sideInfo : 'Hamısına bax'}</span> <LocalMallIcon className="text-[22px]" />
        </Link>) : null
      }
    </div>
  );
};

export default InformationBar;
