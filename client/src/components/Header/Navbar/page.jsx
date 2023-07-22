"use client";
import dynamic from "next/dynamic";
const ToggleNav = dynamic(() => import("@/components/Header/ToggleNav/page"));
import { useToggleNav } from "@/app/store/useToggleNav";
import logoSettings from "@/assets/settings.svg";
import ItemsNavbar from "./ItemsNavbar/page";
import { usePathname } from "next/navigation";
const Navbar = () => {
	const { showNav } = useToggleNav();
	const pathname = usePathname();
	const isActive = (currentPath, targetPath) => {
		if (currentPath === targetPath) return true;
		if (targetPath === "/" && !currentPath.startsWith("/settings")) return true;
		return currentPath.startsWith(`${targetPath}/`);
	};
	const routes = [
		{
			label: "Home",
			href: "/",
			icon: null,
			active: isActive(pathname, "/"),
		},
		{
			label: "Settings",
			href: "/settings",
			icon: logoSettings,
			active: isActive(pathname, "/settings"),
		},
	];
	return (
		<>
			<nav
				className={`${
					showNav
						? "bg-aside absolute transition-300 translate-y-[40px] top-[40px] left-0 h-screen w-8/12 "
						: "top-[-100vh] hidden"
				} md:flex justify-between items-center md:w-auto md:order-1`}
			>
				<ul className="flex flex-col items-center gap-2 md:gap-0 justify-center mt-4 md:flex-row md:space-x-8 md:mt-0">
					{routes.map((route) => (
						<ItemsNavbar key={route.href} {...route} size={showNav ? "medium" : "small"} />
					))}
				</ul>
			</nav>
			<ToggleNav />
		</>
	);
};

export default Navbar;
