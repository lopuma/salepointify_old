import { cn } from "@/lib/utils";
const Container = ({ children, className }) => {
	return <div className={cn("max-w-[2520px] mx-auto xl:px-20 md:px-10 xm:px-2 px-4", className)}>{children}</div>;
};

export default Container;
