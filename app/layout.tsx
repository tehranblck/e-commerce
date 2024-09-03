import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layouts/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./store/provider";
const inter = Inter({ subsets: ["latin"] });
import Footer from "./components/layouts/footer/Footer";
import ScrollToTop from "./components/ui/shared/ScrollTop";
import dynamic from "next/dynamic";
export const metadata: Metadata = {
  title: "MuslimanShop",
  description: "E-commerce Platform",
};
const DynamicHeader = dynamic(() => import('./components/layouts/header/Header'), {
  loading: () => <p>Loading...</p>,
})

const DynamicFooter = dynamic(() => import('./components/layouts/footer/Footer'), {
  loading: () => <p>Loading...</p>,
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>
          <DynamicHeader />
          {/* <ScrollToTop /> */}
          {children}
          <DynamicFooter />
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
