import Link from "next/link";
import useHeader from "@/app/hooks/useHeader";
import { IoSettings } from "react-icons/io5";

const LinkNavbar = ({ href, label, icon, hiddenMenuBackdrop, active }) => {
	const { showNav } = useHeader();

	const handleHiddenNav = () => {
		setTimeout(() => {
			hiddenMenuBackdrop();
		}, 0);
	};

	return (
		<Link
			href={href}
			onClick={handleHiddenNav}
			className="p-2 transition duration-300 h-12 min-w-[80px] cursor-pointer bg-[#f2f2f2] text-[#0f0f0f] rounded-md hover:bg-[#e5e5e5] flex items-center place-content-center"
		>
			{icon ? (
				<IoSettings style={{ fontSize: "25px" }} />
			) : (
				<label className="cursor-pointer whitespace-nowrap">{label}</label>
			)}
		</Link>
	);
};

export default LinkNavbar;
