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
		<a href="/" className="flex items-center px-2 w-5/12 h-[60px] bg-red-500">
			<img src={logo.src} className="self-center mx-3 h-10" alt={companyName} />
			<span className="self-center mx-3 whitespace-nowrap text-2xl font-semibold w-full">
				{companyName ? companyName : "NAME_COMPANY"}
			</span>
		</a>
	);
};

export default Logo;
