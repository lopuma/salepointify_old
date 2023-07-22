"use client";
import { useToggleAside } from "@/app/store/useToggleAside";
export default function BackdropSidebar() {
	const { showAside } = useToggleAside();
	return (
		<div
			className={`bg-background transition-all duration-300 ease-in px-4 pb-20 ${
				showAside ? "w-[310px]" : "w-[110px]"
			}`}
		></div>
	);
}
