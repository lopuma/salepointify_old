import { cn } from "@/lib/utils";

export const LabelComponent = ({ children, htmlFor, className }) => {
	const defaultClassName = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white";
	return (
		<label className={cn(defaultClassName, className)} htmlFor={htmlFor}>
			{children}
		</label>
	);
};

export default LabelComponent;
