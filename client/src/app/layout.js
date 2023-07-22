"use client";
import "./normalize.css";
import "./globals.css";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import CompanyProvider from "./context/Company/CompanyState";
import Backdrop from "@/components/Backdrop/page";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
export const metadata = {
	title: "Point of Sale",
	description: "E-Commerce Sale Pointify",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="">
			<body className="bg-background">
				<QueryClientProvider client={queryClient}>
					<CompanyProvider>
						<Header />
						<main>{children}</main>
						<Backdrop />
						<Footer />
					</CompanyProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
