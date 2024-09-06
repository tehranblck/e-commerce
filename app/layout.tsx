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
import Script from "next/script";
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
          <Script
          id="tawk-to"
          strategy="afterInteractive" // Load script after page is interactive
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/66db24d850c10f7a00a4dd1c/1i740frto';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
          {children}
          <DynamicFooter />
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
