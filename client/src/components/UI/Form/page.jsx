import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

/**
 * Form component.
 *
 * @component
 * @param {React.ReactNode} children - Child elements of the component, can be [FormContainer].
 * @param {function} onSubmit - Event handler function for the onSubmit event.
 * @param {string} [className] - Additional CSS classes for the component (optional).
 * @returns {React.ReactElement} Form component.
 */
export const Form = ({ children, onSubmit, className }) => {
	const defaultClassName = "w-full md:max-w-4xl";
	return (
		<form onSubmit={onSubmit} className={cn(defaultClassName, className)}>
			{children}
		</form>
	);
};

/**
 * FormContainer component.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} children - Child elements of the component, can be [FormGroup].
 * @param {string} className - Additional CSS classes for the component.
 * @returns {React.ReactElement} FormContainer component.
 */
const FormContainer = ({ children, className, ...props }) => {
	const defaultClassName =
		"w-full shadow-sm shadow-slate-200 rounded-sm border border-gray-200 p-6 dark:border-slate-700 dark:shadow-slate-700 dark:bg-gray-900";
	return (
		<div className={cn(defaultClassName, className)} {...props}>
			{children}
		</div>
	);
};

/**
 * FormGroup component.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} children - Child elements of the component, can be [FormField].
 * @param {string} className - Additional CSS classes for the component.
 * @returns {React.ReactElement} FormGroup component.
 */
const FormGroup = ({ children, className, ...props }) => {
	const defaultClassName = "flex items-center flex-col md:flex-row gap-4 md:gap-1 -mx-3 mb-3 md:mb-0";
	return (
		<div className={cn(defaultClassName, className)} {...props}>
			{children}
		</div>
	);
};

const fieldVariants = cva("w-full md:min-h-[100px] md:h-auto px-3 my-2 md:my-0", {
	variants: {
		cols: {
			"100%": "md:w-full",
			"50%": "md:w-1/2",
			"33%": "md:w-1/3",
			"66%": "md:w-2/3",
		},
	},
	defaultVariant: {
		cols: "100%",
	},
});

/**
 * FormField component.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} children - Child elements of the component, can be [Label, Input, ErrorComponent].
 * @param {string} cols - Column classes. Values can be "100%", "50%", "33%", or "66%" to define the width of the field within a FormGroup.
 *    - "100%": Full width of the container.
 *    - "50%": Half width of the container.
 *    - "33%": One-third width of the container.
 *    - "66%": Two-thirds width of the container.
 * @param {string} className - Additional CSS classes for the component.
 * @returns {React.ReactElement} FormField component.
 */
const FormField = ({ children, cols, className, ...props }) => {
	return (
		<div className={cn(fieldVariants({ cols, className }))} {...props}>
			{children}
		</div>
	);
};

export { Form, FormContainer, FormGroup, FormField };
