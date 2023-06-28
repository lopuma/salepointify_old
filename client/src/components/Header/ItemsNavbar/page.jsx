import LinkNavbar from "@/components/Header/LinksNavbar/page";
import useHeader from "@/app/hooks/useHeader";

const ItemsNavbar = ({ text, href, icon }) => {
	const { hiddenMenuBackdrop } = useHeader();
	return (
		<li className="sm:mt-0 sm:ml-2">
			<LinkNavbar href={href} text={text} icon={icon} hiddenMenuBackdrop={hiddenMenuBackdrop} />
		</li>
	);
};

export default ItemsNavbar;
