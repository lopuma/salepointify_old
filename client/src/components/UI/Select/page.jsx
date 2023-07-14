import { cn } from "@/lib/utils";

export const SelectComponent = ({ children, className, name, value, onChange, disabled, editMode }) => {
	const defaultClassName = `block appearance-none w-full ${
		!editMode && disabled ? "bg-white" : "bg-gray-200 cursor-not-allowed"
	} border border-gray-200 text-gray-700 h-10 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`;
	return (
		<select
			name={name}
			id={name}
			className={cn(defaultClassName, className)}
			value={value}
			onChange={onChange}
			disabled={!disabled}
		>
			{children}
		</select>
	);
};
