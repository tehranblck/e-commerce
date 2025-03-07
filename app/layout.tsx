import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./store/provider";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Raelli Mağazası - Ziyafət Geyimləri Satışı və Kirayəsi",
    template: "%s | Raelli Mağazası",
  },
  icons: {
    icon: "/logo.svg",
  },
  description: "Raelli mağazası, ziyafət geyimlərinin satışı və kirayəsi üzrə ixtisaslaşmışdır.",
  alternates: {
    canonical: "https://raelli.az",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className + "dark"}>
        <Providers>
          <Header />
          {/* <ScrollToTop /> */}
          {/* <Script
            id="tawk-to"
            strategy="afterInteractive" // Load script after page is interactive
            dangerouslySetInnerHTML={{
              __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/66e2c53c50c10f7a00a8aa0d/1i7it4tj0';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
            }}
          /> */}

          {children}
          <Footer />
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
