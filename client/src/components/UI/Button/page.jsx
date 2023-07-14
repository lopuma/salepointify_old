import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const defaultPrimary = "bg-primary text-primary-foreground hover:bg-primary-hover hover:text-secondary";
const defaultSecondary = "bg-secondary text-black hover:bg-secondary-hover hover:text-primary";
const defaultCLass = "font-semibold py-2 px-4 rounded inline-flex items-center transition duration-300";

const buttonVariants = cva(defaultCLass, {
	variants: {
		intent: {
			primary: defaultPrimary,
			secondary: defaultSecondary,
		},
		size: {
			small: ["text-sm", "py-1", "px-10"],
			medium: ["text-base", "py-2", "px-4"],
		},
	},
	defaultVariants: {
		intent: "primary",
		size: "medium",
	},
});

export const ButtonComponent = ({ intent, size, className, loader, onClick, type, ...props }) => {
	return (
		<button
			className={cn(buttonVariants({ intent, size, className }))}
			onClick={onClick ?? onClick}
			type={type}
			{...props}
		>
			{loader ?? loader}
			<span className="mx-2">{props.text}</span>
		</button>
	);
};

export default ButtonComponent;
