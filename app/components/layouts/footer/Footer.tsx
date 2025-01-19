import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/logo_footer.png";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { FaTiktok } from 'react-icons/fa';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <footer className="dark:bg-[#121212]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-start flex-wrap space-y-6 lg:space-y-0 px-4 lg:px-0 py-10 justify-between max-w-[1280px]">
          <div className="flex flex-col">
            <Link href="/">
              <Image
                src={Logo}
                width={220}
                height={50}
                className="text-yellow-600"
                alt="Raelli.az Logo"
              />
            </Link>
            <p className="dark:text-[#828282] text-white text-sm max-w-sm ml-4">
              Ziyafət donlarının və geyimlərinin satışı və kirayəsi üçün premium mağaza
            </p>
          </div>

          <div>
            <div className="flex flex-col space-y-2 ml-4">
              <h3 className="dark:text-[#828282] text-white text-lg">Əlaqə</h3>
              <Link
                href="tel:+994503332133"
                className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm"
              >
                Telefon: 050 333 21 33
              </Link>
              <Link
                href="mailto:info@raelli.az"
                className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm"
              >
                Email: info@raelli.az
              </Link>
              <Link
                href="https://maps.app.goo.gl/qqKkqccZm2XGFVbE6"
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm"
              >
                Nizami Mall.Magaza 232
              </Link>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-2 ml-4">
              <h3 className="dark:text-[#828282] text-white text-lg">Məhsullarımız</h3>
              <Link href="/categories/ziyafet-donlari" className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm">
                Ziyafət Donları
              </Link>
              <Link href="/categories/toy-geyimleri" className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm">
                Toy Geyimləri
              </Link>
              <Link href="/categories/nisan-geyimleri" className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm">
                Nişan Geyimləri
              </Link>
              <Link href="/categories/aksam-geyimleri" className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm">
                Axşam Geyimləri
              </Link>
              <Link href="/categories/kokteyl-donlari" className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm">
                Kokteyl Donları
              </Link>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-2 ml-4">
              <h3 className="dark:text-[#828282] text-white text-lg">Xidmətlərimiz</h3>
              <Link href="/services/premium" className="dark:text-[#828282] text-white  hover:text-yellow-500 transition-colors text-sm">
                Premium Ziyafət Geyimləri
              </Link>
              <Link href="/services/custom" className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm">
                Xüsusi Sifariş
              </Link>
              <Link href="/services/rental" className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm">
                Kirayə Xidməti
              </Link>
              <Link href="/services/adjustment" className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm">
                Ölçüyə görə Düzəliş
              </Link>
              <Link href="/services/consultation" className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm">
                Məsləhət Xidməti
              </Link>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-2 ml-4">
              <h3 className="dark:text-[#828282] text-white text-lg">Sosial Media</h3>
              <Link
                href="https://www.instagram.com/address__butik"
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm flex items-center gap-2"
              >
                <InstagramIcon className="text-xl" /> Instagram
              </Link>
              <Link
                href="https://www.tiktok.com/@address_butik"
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm flex items-center gap-2"
              >
                <FaTiktok className="text-xl" /> TikTok
              </Link>
              <Link
                href="https://wa.me/994503332133"
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-[#828282] text-white hover:text-yellow-500 transition-colors text-sm flex items-center gap-2"
              >
                <WhatsAppIcon className="text-xl" /> WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#988d57]"></div>
      <div className="dark:text-[#828282] text-white flex justify-center items-center py-4 dark:bg-[#181818]">
        <span>2024 © Raelli.az - Bütün hüquqlar qorunur</span>
      </div>
    </footer>
  );
};

export default Footer;
