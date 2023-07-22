import RoutesNavbar from "./RoutesNavbar/page";

const ItemsNavbar = ({ label, href, icon, active, size }) => {
	return (
		<>
			<li className="w-full">
				<RoutesNavbar href={href} label={label} icon={icon} active={active} size={size} />
			</li>
		</>
	);
};

export default ItemsNavbar;
