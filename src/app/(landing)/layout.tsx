import { ReactNode } from "react";
import TopNavbar from "@/app/(landing)/components/top-navbar";
import Navbar from "@/app/(landing)/components/navbar";
import Footer from "@/app/(landing)/components/footer";
import MobileNav from "@/app/(landing)/components/mobile-nav";
import { Toaster } from "sonner";
import WhatsappButton from "@/app/(landing)/components/whatsapp-button";
import Script from "next/script";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={"font-body"}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Y8PMFBYHVQ"
      ></Script>
      <Script id={"google-analytics"}>
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
    
                gtag('config', 'G-Y8PMFBYHVQ'); 
            `}
      </Script>
      <Toaster richColors={true} position={"top-center"} />
      <TopNavbar />
      <Navbar />
      <MobileNav />
      {children}
      <WhatsappButton />
      <Footer />
    </div>
  );
}
