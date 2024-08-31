import React from "react";
import SpeedIcon from "@mui/icons-material/Speed";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InformationBar from "./InformationBar";

const FutureCard = () => {
  const cardItems = [
    {
      id: 1,
      title: "Sürətli Çatdırılma",
      description:
        "Alqı-satqı əməliyyatlarınız həftənin 7 günü, günün 24 saatı, anında həyata keçirilir.",
      icon: <SpeedIcon className="text-[70px] text-yellow-500 " />,
    },
    {
      id: 2,
      title: "Təhlükəsiz Alış-Veriş",
      description:
        "3D və SSL zəmanəti ilə istədiyiniz ödəniş üsulundan istifadə edə bilərsiniz.",
      icon: <LockOpenIcon className="text-[70px] text-yellow-500 " />,
    },
    {
      id: 3,
      title: "Münasib Qiymət",
      description:
        "Endirimli və ən sərfəli qiymətlərlə alış-verişdən həzz alın.",
      icon: <CurrencyExchangeIcon className="text-[70px] text-yellow-500 " />,
    },
    {
      id: 4,
      title: "Müştəri Məmnuniyyəti",
      description: "Müştərilərimizə keyfiyyətli xidmət göstərməkdən məmnunuq.",
      icon: <ThumbUpOffAltIcon className="text-[70px] text-yellow-500 " />,
    },
  ];
  return (
    <section className="bg-[#181818]">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row  justify-between items-center space-y-2 lg:space-y-0 lg:space-x-1 py-10 px-2">
        {cardItems.map((item) => {
          return (
            <div
              className="flex flex-col items-center justify-center bg-[#1f1f1f] rounded-md  w-full   lg:w-[300px] h-[200px] lg:space-y-2 p-1"
              key={item.id}
            >
              <div>{item.icon}</div>
              <span className="text-md text-white">{item.title}</span>
              <p className="text-center text-[#828282] text-sm">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FutureCard;
