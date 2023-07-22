import Link from "next/link";
import { IoSettings } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const primary = "bg-primary text-primary-foreground hover:bg-primary-hover hover:text-secondary";
const secondary = "bg-secondary text-black hover:bg-secondary-hover hover:text-primary";
const defaultCLass =
	"whitespace-nowrap  min-w-[90px] w-full md:max-w-[150px] cursor-pointer flex items-center place-content-start md:place-content-center rounded-md md:rounded-lg";
const variantActive = cva(defaultCLass, {
	variants: {
		active: {
			true: primary,
			false: secondary,
		},
		size: {
			small: ["h-10", "text-base", "py-2", "px-3"],
			medium: ["h-12", "text-base", "py-3", "px-5"],
		},
	},
	defaultVariants: {
		active: "false",
		size: "small",
	},
});
const RoutesNavbar = ({ href, label, icon, active, size, className }) => {
	return (
		<Link className={cn(variantActive({ active, size, className }))} href={href}>
			{icon ? <IoSettings style={{ fontSize: "20px" }} /> : <p>{label}</p>}
		</Link>
	);
};

export default RoutesNavbar;
