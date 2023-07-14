import useSidebar from "@/app/hooks/useSidebar";

const BackdropSidebar = () => {
	const { show } = useSidebar();
	return (
		<div
			className={`hidden md:flex ${show ? "md:w-[310px]" : "md:w-[100px]"} duration-200 md:h-[100vh] bg-none pb-20`}
		></div>
	);
};

export default BackdropSidebar;
