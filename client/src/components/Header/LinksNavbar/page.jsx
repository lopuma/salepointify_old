import Link from "next/link";
import { usePathname } from "next/navigation";
import useHeader from "@/app/hooks/useHeader";

const LinkNavbar = ({ href, ariaCurrent, text, icon, hiddenMenuBackdrop }) => {
	const router = usePathname();
	const { showNav } = useHeader();
	const isActive = router === href;
	const styleColor = { fill: "white" };

	const handleHiddenNav = () => {
		setTimeout(() => {
			hiddenMenuBackdrop();
		}, 0);
	};

	return (
		<Link
			href={href}
			as={href}
			className={`flex items-center px-4 py-2 text-slate-100 sm:text-gray-800 dark:text-slate-100 transition duration-100 hover:bg-aside-hover hover:sm:bg-slate-100  dark:hover:bg-aside-hover hover:text-red-400 dark:hover:text-red-400 rounded-md ${
				isActive ? "font-semibold" : null
			} ${showNav ? "my-2 items-center justify-center text-center" : ""} group`}
			aria-current={ariaCurrent ? `${ariaCurrent}` : null}
			onClick={handleHiddenNav}
		>
			{icon ? (
				<img
					src={icon.src}
					className={`w-[40px] h-[40px] sm:w-[25px] sm:h-[25px] cursor-pointer pb-2 sm:pb-1 ${
						isActive ? "border-b-4 border-red-400" : null
					} ${showNav ? "w-[150px]" : null}`}
					alt="Settings"
					aria-current="current"
					style={styleColor}
				/>
			) : (
				<label
					className={`flex-1 whitespace-nowrap pb-1 ${isActive ? "border-b-4 border-red-400" : null} ${
						showNav ? "w-[150px]" : null
					}`}
				>
					{text}
				</label>
			)}
		</Link>
	);
};

export default LinkNavbar;
