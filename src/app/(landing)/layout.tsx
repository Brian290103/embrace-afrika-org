import { ReactNode } from "react";
import TopNavbar from "@/app/(landing)/components/top-navbar";
import Navbar from "@/app/(landing)/components/navbar";
import Footer from "@/app/(landing)/components/footer";
import MobileNav from "@/app/(landing)/components/mobile-nav";
import { Toaster } from "sonner";
import WhatsappButton from "@/app/(landing)/components/whatsapp-button";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={"font-body"}>
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
