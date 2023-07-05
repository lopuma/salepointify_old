import RoutesSidebar from "./RoutesSidebar/page";
import useSidebar from "@/app/hooks/useSidebar";

const ItemsSidebar = ({ label, href, extra = "", gap, IconComponent, active }) => {
	const { show } = useSidebar();
	const fontStyles = { fontSize: "20px" };
	return (
		<li
			className={`rounded-md text-aside-foreground hover:bg-aside-hover hover:text-primary font-semibold cursor-pointer h-[60px] ${
				show ? "px-2" : "px-4"
			} group`}
		>
			<RoutesSidebar
				icon={<IconComponent style={fontStyles} />}
				href={href}
				active={active}
				label={label}
				extra={extra}
				className={`
                    flex items-center h-full 
                    ${show ? "grid grid-cols-[40px_minmax(120px,_1fr)_40px] gap-4  items-center" : null} 
                    group-hover:cursor-pointer
                `}
				show={show}
			/>
		</li>
	);
};

export default ItemsSidebar;
