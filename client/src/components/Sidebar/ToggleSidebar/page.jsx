import { GrNext, GrPrevious } from "react-icons/gr";
import useSidebar from "@/app/hooks/useSidebar";

const ToggleSidebar = () => {
    const { show, handleShowSidebar } = useSidebar()
    
	return (
		<button
			className={`hidden md:fixed md:flex justify-center items-center bg-aside-hover text-aside-background z-20 cursor-pointer top-[100px] left-[35px] 2xl:left-[220px] w-8 h-8 border-2 border-aside rounded-full hover:bg-aside-foreground`}
			onClick={handleShowSidebar}
		>
			{show ? <GrPrevious /> : <GrNext />}
		</button>
	);
};

export default ToggleSidebar;
