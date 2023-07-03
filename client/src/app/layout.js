"use client";
import "./globals.css";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import CompanyProvider from "./context/Company/CompanyState";
import HeaderProvider from "./context/Header/HeaderState";

export const metadata = {
  title: "Sale Pointify",
  description: "E-Commerce Sale Pointify",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="bg-background">
        <CompanyProvider>
          <HeaderProvider>
            <Header />
            <main className="container max-w-screen-2xl w-full px-2 pt-8 bg-background text-foreground">
              {children}
            </main>
            <Footer />
          </HeaderProvider>
        </CompanyProvider>
      </body>
    </html>
  );
}
