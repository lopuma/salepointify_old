"use client";
import ToggleButton from "@/components/Header/ToggleMenu/page";
import useHeader from "@/app/hooks/useHeader";
import logoSettings from "@/assets/settings.svg";
import ItemsNavbar from "../ItemsNavbar/page";

const links = [
	{
		ID: "M001",
		text: "Home",
		href: "/",
		icon: null,
		extra: null,
	},
	{
		ID: "M002",
		text: "Settings",
		href: "/settings",
		icon: logoSettings,
		extra: null,
	},
];

const Navbar = () => {
	const { showNav } = useHeader();
	return (
		<nav>
			<ul
				className={`${
					showNav ? "flex gap-8 bg-aside" : "hidden"
				} transition-all duration-300 rounded-sm absolute sm:static top-[80px] left-0 h-screen  w-9/12 sm:w-[438px] sm:h-[62px] flex flex-col sm:flex sm:flex-row place-content-start sm:place-content-end sm:gap-4 text-[20px] sm:text-[18px] lg:w-[638px] items-center dark:bg-gray-700 py-4 px-2`}
			>
				{links.map((link) => (
					<ItemsNavbar key={link.ID} {...link} />
				))}
			</ul>
			<ToggleButton />
		</nav>
	);
};

export default Navbar;
