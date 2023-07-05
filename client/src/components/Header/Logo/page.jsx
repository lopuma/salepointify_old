"use client";
import logo from "@/assets/logo.svg";
import useCompany from "@/app/hooks/useCompany";
import { useEffect, useState } from "react";
import styles from "./logo.module.css";

const Logo = () => {
	const { companyData } = useCompany();
	const [companyName, setCompanyName] = useState("");

	useEffect(() => {
		//setCompanyName(companyData[0].companyName);
		setCompanyName("otro");
	}, [companyData]);

	return (
		<a href="/" className="flex items-center px-2 w-5/12 h-[60px]">
			<img src={logo.src} className="self-center mx-3 h-10" alt={companyName} />
			<span className={`self-center mx-3 whitespace-nowrap text-2xl font-semibold w-full ${styles.logo}`}>
				{companyName ? companyName : "NAME_COMPANY"}
			</span>
		</a>
	);
};

export default Logo;
