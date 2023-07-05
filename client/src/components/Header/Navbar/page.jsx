"use client";
import ToggleButton from "@/components/Header/ToggleMenu/page";
import useHeader from "@/app/hooks/useHeader";
import logoSettings from "@/assets/settings.svg";
import ItemsNavbar from "./ItemsNavbar/page";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const { showNav } = useHeader();
	const pathname = usePathname();
	const routes = [
		{
			label: "Home",
			href: "/",
			icon: null,
			active: pathname === "/",
		},
		{
			label: "Settings",
			href: "/settings",
			icon: logoSettings,
			active: pathname.startsWith("/settings"),
		},
	];
	return (
		<nav className="sm:w-7/12 h-[60px] px-2 flex items-center place-content-end py-2 ">
			<ul
				className={`${
					showNav ? "bg-aside absolute top-[80px] left-0 h-screen w-9/12 " : "hidden"
				} sm:flex gap-4 sm:w-[438px] sm:h-full px-2 items-center place-content-end rounded-md`}
			>
				{routes.map((route) => (
					<ItemsNavbar key={route.href} {...route} />
				))}
			</ul>
			<ToggleButton />
		</nav>
	);
};

export default Navbar;
