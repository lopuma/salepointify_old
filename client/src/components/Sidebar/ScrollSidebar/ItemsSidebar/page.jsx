import { useToggleAside } from "@/app/store/useToggleAside";
import RoutesSidebar from "./RoutesSidebar/page";
const ItemsSidebar = ({ label, href, extra = "", gap, IconComponent, active }) => {
	const { showAside } = useToggleAside();
	const fontStyles = { fontSize: "20px" };
	return (
		<li className={`h-[60px] w-full group`}>
			<RoutesSidebar
				icon={<IconComponent style={fontStyles} />}
				href={href}
				active={active}
				label={label}
				extra={extra}
				className={`flex items-center justify-center w-full h-full ${
					showAside ? "grid grid-cols-[40px_minmax(120px,_1fr)_40px] gap-4 items-center pl-3" : null
				} rounded-md text-aside-foreground hover:bg-aside-hover hover:text-primary font-semibold cursor-pointer ${
					active ? "text-primary bg-aside-hover" : null
				}`}
				showAside={showAside}
			/>
		</li>
	);
};

export default ItemsSidebar;
