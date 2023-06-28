import useCompany from "@/app/hooks/useCompany";
import logo from "@/assets/logo.svg";
import { useEffect, useRef, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineUnorderedList, AiOutlineUsergroupAdd } from "react-icons/ai";
import useSidebar from "@/app/hooks/useSidebar";
import ItemsSidebar from "../ItemsSidebar/page";

const links = [
	{
		ID: "S001",
		title: "Overview",
		icon: "CiSettings",
		href: "/settings",
	},
	{
		ID: "S002",
		title: "Dashboard",
		icon: "AiOutlineDashboard",
		href: "/settings/dashboard",
	},
	{
		ID: "S003",
		title: "User",
		gap: false,
		icon: "AiOutlineUser",
		href: "/settings/users",
		extra: "0",
	},
	{
		ID: "S004",
		title: "Employed",
		icon: "AiOutlineUsergroupAdd",
		href: "/settings/employed",
		extra: "0",
	},
	{
		ID: "S005",
		title: "Products",
		icon: "AiOutlineUnorderedList",
		href: "/settings/products",
	},
];

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
	let companyName = "";
	try {
		if (companyData[0].companyName) {
			companyName = companyData[0].companyName;
		}
	} catch (e) {}

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
			className={`fixed sm:block ${
				show ? "w-[295px]" : "w-[85px]"
			} p-4 py-6 duration-300 h-screen bg-aside dark:bg-gray-700 text-slate-50 overflow-y-auto overflow-x-hidden sm:h-[calc(100vh-140px)] docs-scrollbar styled-scrollbar rounded-sm hidden`}
			style={{ width: hasOverflow }}
		>
			<div className="flex gap-x-4 items-center my-3">
				<img
					src={logo.src}
					className={`px-3 cursor-pointer duration-500 ${show && "rotate-[360deg]"}`}
					alt={companyName}
				/>
				<h2 className={`text-white origin-left font-medium text-xl duration-200 ${!show && "scale-0"}`}>
					{companyName ? companyName : "NAME_COMPANY"}
				</h2>
			</div>
			<ul className={`flex flex-col justify-center items-start gap-3`}>
				{links.map((link) => {
					const IconComponent = iconMap[link.icon];
					return <ItemsSidebar key={link.ID} {...link} IconComponent={IconComponent} />;
				})}
			</ul>
		</aside>
	);
};

export default ScrollSidebar;
