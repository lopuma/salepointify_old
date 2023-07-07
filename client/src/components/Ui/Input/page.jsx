"use client";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
	`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
    read-only:cursor-not-allowed read-only:opacity-50 read-only:bg-gray-200
    dark:bg-gray-800 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600 dark:focus-visible:ring-ring `,
	{
		variants: {
			errorState: {
				true: "border-never focus-visible:ring-never-foreground dark:focus-visible:ring-never dark:border-never-foreground dark:focus-visible:border-never-foreground",
			},
			// variant: {
			// 	ghost: "hover:bg-accent hover:text-accent-foreground bg-red-800",
			// },
		},
		defaultVariants: {
			errorState: false,
			// variant: "ghost",
		},
	}
);

const Input = ({
	name,
	inputRefs,
	id,
	type,
	placeholder,
	value,
	onChange,
	className,
	errorState,
	editMode = true,
	required,
	...props
}) => {
	return (
		<input
			ref={inputRefs ?? inputRefs}
			name={name}
			className={cn(inputVariants({ errorState, className }))}
			id={id}
			type={type || "text"}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			readOnly={!editMode}
			required={required}
			{...props}
		/>
	);
};

export default Input;
