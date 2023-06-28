"use client";
import "./globals.css";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import CompanyProvider from "./context/Company/CompanyState";
import HeaderProvider from "./context/Header/HeaderState";

export const metadata = {
	title: "Sale Pointify",
	description: "",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="">
			<body className="bg-gray-100 dark:bg-gray-900 ">
				<CompanyProvider>
					<HeaderProvider>
						<Header />
						<main className="container max-w-screen-2xl w-full px-2 pt-8 dark:bg-gray-900">{children}</main>
						<Footer />
					</HeaderProvider>
				</CompanyProvider>
			</body>
		</html>
	);
}
