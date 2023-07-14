import useCompany from "@/app/hooks/useCompany";
import logo from "@/assets/logo.svg";
import { useEffect, useRef, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineUnorderedList, AiOutlineUsergroupAdd } from "react-icons/ai";
import useSidebar from "@/app/hooks/useSidebar";
import ItemsSidebar from "./ItemsSidebar/page";
import { usePathname } from "next/navigation";

const iconMap = {
	AiOutlineDashboard,
	AiOutlineUser,
	AiOutlineUnorderedList,
	AiOutlineUsergroupAdd,
	CiSettings,
};

const ScrollSidebar = () => {
	const [hasOverflow, setHasOverflow] = useState("85px");
	const asideRef = useRef(null);
	const { show } = useSidebar();
	const { companyData } = useCompany();
	const [companyName, setCompanyName] = useState("");
	const pathname = usePathname();
	const routes = [
		{
			label: "Company",
			icon: "CiSettings",
			href: "/settings/company",
			active: pathname === "/settings/company",
		},
		{
			label: "Dashboard",
			icon: "AiOutlineDashboard",
			href: "/settings/dashboard",
			active: pathname === "/settings/dashboard",
		},
		{
			label: "User",
			icon: "AiOutlineUser",
			href: "/settings/users",
			extra: "0",
			active: pathname === "/settings/users",
		},
		{
			label: "Employed",
			icon: "AiOutlineUsergroupAdd",
			href: "/settings/employed",
			extra: "0",
			active: pathname === "/settings/employed",
		},
		{
			label: "Products",
			icon: "AiOutlineUnorderedList",
			href: "/settings/products",
			active: pathname === "/settings/products",
		},
	];

	useEffect(() => {
		if (companyData && companyData.companyName) {
			setCompanyName(companyData.companyName);
		}
	}, [companyData]);

	useEffect(() => {
		const asideElement = asideRef.current;
		if (!asideElement) return;

		const handleScroll = () => {
			const { width } = asideElement.getBoundingClientRect();
			if (width <= 90) {
				const newWidth = Math.min(width + 5, 90.1875);
				setHasOverflow(`${newWidth}px`);
			}
		};
		asideElement.addEventListener("scroll", handleScroll);
		return () => {
			asideElement.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const newWidth = show ? "295px" : "85px";
		setHasOverflow(newWidth);
	}, [show]);

	return (
		<aside
			ref={asideRef}
			className={`fixed md:block z-10 ${
				show ? "w-[295px]" : "w-[85px]"
			} p-4 py-6 duration-300 h-screen bg-aside overflow-y-auto overflow-x-hidden sm:h-[calc(100vh-140px)] docs-scrollbar styled-scrollbar rounded-sm hidden`}
			style={{ width: hasOverflow }}
		>
			<a href="#" className="hidden md:flex gap-x-4 items-center my-3">
				<img
					src={logo.src}
					className={`
                        ml-2 cursor-pointer duration-500
                        ${show && "rotate-[360deg]"}
                    `}
					alt={companyName}
				/>
				<h2
					className={`
                    text-aside-foreground origin-left font-medium text-xl duration-200
                    ${!show && "scale-0"}
                `}
				>
					{companyName ? companyName : "NAME_COMPANY"}
				</h2>
			</a>
			<ul className={`flex flex-col justify-center items-center gap-3`}>
				{routes.map((route) => {
					const IconComponent = iconMap[route.icon];
					return <ItemsSidebar key={route.href} {...route} IconComponent={IconComponent} />;
				})}
			</ul>
		</aside>
	);
};

export default ScrollSidebar;
