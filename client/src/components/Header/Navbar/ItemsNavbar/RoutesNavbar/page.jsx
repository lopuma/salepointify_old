import Link from "next/link";
import useHeader from "@/app/hooks/useHeader";
import { IoSettings } from "react-icons/io5";
import styles from "./routesNavbar.module.css";

const RoutesNavbar = ({ href, label, icon, hiddenMenuBackdrop, active }) => {
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
			className=" h-10 min-w-[80px] cursor-pointer flex items-center place-content-center"
		>
			{icon ? (
				<IoSettings style={{ fontSize: "20px" }} />
			) : (
				<label className={`${styles.routes} cursor-pointer whitespace-nowrap text-[18px] sm:text-[16px]				`}>
					{label}
				</label>
			)}
		</Link>
	);
};

export default RoutesNavbar;