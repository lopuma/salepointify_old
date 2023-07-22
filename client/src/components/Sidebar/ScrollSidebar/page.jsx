"use client";
import { useCompanyName } from "@/app/store/useCompanyName";
import logo from "@/assets/logo.svg";
import { useRef, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineUnorderedList, AiOutlineUsergroupAdd } from "react-icons/ai";
import ItemsSidebar from "./ItemsSidebar/page";
import { usePathname } from "next/navigation";
import { useToggleAside } from "@/app/store/useToggleAside";

const iconMap = {
	AiOutlineDashboard,
	AiOutlineUser,
	AiOutlineUnorderedList,
	AiOutlineUsergroupAdd,
	CiSettings,
};

const ScrollSidebar = () => {
	const widthShow = "w-[300px]";
	const widthHide = "w-[100px]";
	const pathname = usePathname();
	const [hasOverflow, setHasOverflow] = useState(widthHide);
	const asideRef = useRef(null);
	const { companyName } = useCompanyName();
	const { showAside } = useToggleAside();
	const routes = [
		{
			label: "Bussines Profile",
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
	const handleShowAside = () => {
		console.log({ showAside, hasOverflow });
		setHasOverflow(widthShow);
	};
	// try {
	// 	const asideElement = asideRef.current;
	// 	const { width } = asideElement.getBoundingClientRect();
	// 	console.log({ width });
	// 	const newWidth = width + 15;
	// 	setHasOverflow(`${newWidth}px`);
	// } catch (error) {}
	// useEffect(() => {
	// 	const handleResize = () => {
	// 		const asideElement = asideRef.current;
	// 		const { width } = asideElement.getBoundingClientRect();
	// 		const newWidth = Math.min(width + 10, 96.1094);
	// 		setHasOverflow(`${newWidth}px`);
	// 	};
	// 	window.addEventListener("resize", handleResize);
	// 	return () => window.removeEventListener("resize", handleResize);
	// }, []);
	// useEffect(() => {
	// 	const asideElement = asideRef.current;
	// 	if (!asideElement) return;

	// 	const handleScroll = () => {
	// 		const { width } = asideElement.getBoundingClientRect();
	// 		console.log({ width });
	// 		if (width <= 100) {
	// 			const newWidth = Math.min(width + 15, 95.890625);
	// 			setHasOverflow(`${newWidth}px`);
	// 		}
	// 	};
	// 	asideElement.addEventListener("scroll", handleScroll);
	// 	return () => {
	// 		asideElement.removeEventListener("scroll", handleScroll);
	// 	};
	// }, []);

	// useEffect(() => {
	// 	const newWidth = showAside ? "300px" : "95px";
	// 	setHasOverflow(newWidth);
	// }, [showAside]);

	return (
		<aside
			ref={asideRef}
			className={`fixed md:block z-10 p-4 py-6 transition-all	 duration-300 ease-linear h-screen bg-aside overflow-y-auto overflow-x-hidden sm:h-[calc(100vh-140px)] docs-scrollbar styled-scrollbar rounded-sm border-r border-t hidden ${
				showAside ? widthShow : widthHide
			}`}
		>
			<a href="#" className="hidden md:flex gap-x-4 items-center my-3">
				<img
					src={logo.src}
					className={`
                        ml-2 cursor-pointer duration-500
                        ${showAside && "rotate-[360deg]"}
                    `}
					alt={companyName}
				/>
				<h2
					className={`
                    text-aside-foreground origin-left font-medium text-xl duration-200
                    ${!showAside && "scale-0"}
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
