import Link from "next/link";

const RoutesSidebar = ({ href, className, ariaCurrent, icon, show, extra, label, active }) => {
	return (
		<Link href={href} as={href} className={className} aria-current={ariaCurrent ? `${ariaCurrent}` : null}>
			<div className={active ? "text-red-300" : ""}>{icon}</div>

			<label className={`${!show && "hidden"} origin-left ${active ? "text-primary" : null} group-hover:cursor-pointer`}>
				{label}
			</label> 

			{extra ? (
				<span
					className={`${
						!show && "hidden"
					} origin-right duration-200 rounded-full bg-blue-100 inline-flex h-3 w-3 items-center justify-center  p-3 text-sm font-medium text-blue-800 group-hover:bg-blue-600 group-hover:text-blue-100` }
				>
					{extra}
				</span>
			) : null}
		</Link>
	);
};

export default RoutesSidebar;
