import LinkNavbar from "@/components/Header/LinksNavbar/page";
import useHeader from "@/app/hooks/useHeader";

const ItemsNavbar = ({ label, href, icon, active }) => {
	const { hiddenMenuBackdrop } = useHeader();
	return (
		<li className="sm:mt-0 sm:ml-2">
			<LinkNavbar href={href} label={label} icon={icon} active={active} hiddenMenuBackdrop={hiddenMenuBackdrop} />
		</li>
	);
};

export default ItemsNavbar;
