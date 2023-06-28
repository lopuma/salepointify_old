import logo from "@/assets/logo.svg";
import useCompany from "@/app/hooks/useCompany";
import { useEffect, useState } from "react";

const Logo = () => {
	const { companyData } = useCompany();
	const [companyName, setCompanyName] = useState("");

	useEffect(() => {
		setCompanyName(companyData[0].companyName);
	}, [companyData]);

	return (
		<a href="#" className="flex items-center px-2 w-3/12">
			<img src={logo.src} className="mr-3 h-8" alt={companyName} />
			<span className="self-center whitespace-nowrap text-2xl font-semibold w-full">
				{companyName ? companyName : "NAME_COMPANY"}
			</span>
		</a>
	);
};

export default Logo;
