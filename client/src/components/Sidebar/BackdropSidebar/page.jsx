import { useState } from "react";
import useSidebar from "@/app/hooks/useSidebar";

const BackdropSidebar = () => {
    const { show } = useSidebar()
	return (
		<div
			className={`hidden sm:flex ${
				show ? "sm:w-[480px] md:w-[310px]" : "sm:w-[100px]"
			} duration-200 sm:h-[100vh] bg-none pb-20`}
		></div>
	);
};

export default BackdropSidebar;
