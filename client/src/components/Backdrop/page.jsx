"use client";
import { useToggleNav } from "@/app/store/useToggleNav";

export default function Backdrop() {
	const { showNav, onClick } = useToggleNav();

	return (
		<>
			{showNav && (
				<div
					className="fixed top-[80px] inset-0 z-0 bg-gray-900/50 dark:bg-gray-900/60 h-screen"
					onClick={onClick}
				></div>
			)}
		</>
	);
}
