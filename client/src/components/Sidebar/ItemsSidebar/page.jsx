import LinkSidebar from "@/components/Sidebar/LinksSidebar/page";
import useSidebar from "@/app/hooks/useSidebar";

const ItemsSidebar = ({ label, href, extra = "", gap, IconComponent, active }) => {
	const { show } = useSidebar();
	const fontStyles = { fontSize: "20px" };
	return (
		<li
			className={`rounded-md  hover:bg-aside-hover hover:text-red-300 hover:font-semibold cursor-pointer text-gray-300 text-sm h-[60px] ${
				show ? "px-2" : "px-4"
			} group`}
		>
			<LinkSidebar
				icon={<IconComponent style={fontStyles} />}
				href={href}
				active={active}
				label={label}
				extra={extra}
				className={`${show ? "grid grid-cols-[40px_minmax(120px,_1fr)_40px] gap-4  items-center" : ""} ${
					gap ? "mt-9" : ""
				} mx-2  h-[60px]`}
				show={show}
			/>
		</li>
	);
};

export default ItemsSidebar;
