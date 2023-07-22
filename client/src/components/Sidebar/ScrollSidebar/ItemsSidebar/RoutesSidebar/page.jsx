import Link from "next/link";
import { useToggleAside } from "@/app/store/useToggleAside";

const RoutesSidebar = ({ href, className, icon, extra, label }) => {
	const { showAside } = useToggleAside();

	return (
		<Link href={href} as={href} className={className}>
			<>{icon}</>

			<p className={`${!showAside && "hidden"} origin-left`}>{label}</p>

			{extra ? (
				<span
					className={`${
						!showAside && "hidden"
					} origin-right duration-200 rounded-full bg-blue-100 inline-flex h-3 w-3 items-center justify-center  p-3 text-sm font-medium text-blue-800 group-hover:bg-blue-600 group-hover:text-blue-100`}
				>
					{extra}
				</span>
			) : null}
		</Link>
	);
};

export default RoutesSidebar;
