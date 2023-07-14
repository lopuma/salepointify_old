import RoutesNavbar from "./RoutesNavbar/page";
import useHeader from "@/app/hooks/useHeader";

const ItemsNavbar = ({ label, href, icon, active }) => {
	const { hiddenMenuBackdrop } = useHeader();
	return (
		<li
			className={`sm:mt-0 sm:ml-2 transition duration-300 bg-secondary text-black rounded-md hover:bg-secondary-hover hover:text-secondary-foreground ${
				active ? "bg-[var(--primary)] text-primary-foreground hover:bg-primary-hover hover:text-secondary" : null
			}`}
		>
			<RoutesNavbar href={href} label={label} icon={icon} active={active} hiddenMenuBackdrop={hiddenMenuBackdrop} />
		</li>
	);
};

export default ItemsNavbar;
