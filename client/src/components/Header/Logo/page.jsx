import logo from "@/assets/logo.svg";
import Image from "next/image";
import { useCompanyName } from "@/app/store/useCompanyName";
import "./logo.css";

const Logo = () => {
	const { companyName } = useCompanyName();
	console.log({ companyName });
	return (
		<a href="#" className="flex items-center px-2 w-5/12">
			<Image src={logo.src} alt="NAME_COMPANY" height={"70"} width={"70"} />
			<span className="text-logo self-center mx-3 whitespace-nowrap text-2xl font-semibold w-full">
				{companyName ? companyName : "NAME_COMPANY"}
			</span>
		</a>
	);
};

export default Logo;
