import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

/**
 * Componente Form.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos del componente, pueden ser [FormContainer].
 * @param {string} props.className - Clases CSS adicionales para el componente.
 * @returns {React.JSX.Element} Componente Form.
 */
export const Form = ({ children, onSubmit, className }) => {
	return (
		<form onSubmit={onSubmit} className={cn(className)}>
			{children}
		</form>
	);
};

/**
 * Componente FormContainer.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos del componente, pueden ser [FormGroup].
 * @param {string} props.className - Clases CSS adicionales para el componente.
 * @returns {React.JSX.Element} Componente FormContainer.
 */

const FormContainer = ({ children, className, ...props }) => {
	const defaultClassName =
		"container shadow-sm shadow-slate-200 rounded-sm border border-gray-200 p-6 sm:max-w-4xl dark:border-slate-700 dark:shadow-slate-700 dark:bg-gray-900";
	return (
		<div className={cn(defaultClassName, className)} {...props}>
			{children}
		</div>
	);
};

/**
 * Componente FormGroup.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos del componente, pueden ser [FormField].
 * @param {string} props.className - Clases CSS adicionales para el componente.
 * @returns {React.JSX.Element} Componente FormGroup.
 */
const FormGroup = ({ children, className, ...props }) => {
	const defaultClassName = "flex items-center flex-col md:flex-row gap-4 md:gap-1 py-2 -mx-3 mb-3";
	return (
		<div className={cn(defaultClassName, className)} {...props}>
			{children}
		</div>
	);
};

/**
 * Componente FormField.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos del componente, pueden ser [Label, Input, ErrorComponent].
 * @param {string} props.columns - Clases de las columnas. Pueden ser valores como "md:50%" o "lg:33% xl:25%", esto  te divide los field en columnas por un % dentro de un FormGroup.
 * @param {string} props.className - Clases CSS adicionales para el componente.
 * @returns {React.JSX.Element} Componente FormField.
 */
const fieldVariants = cva("w-full py-2 px-3", {
	variants: {
		columns: {
			"100%": "md:w-full",
			"50%": "md:w-1/2",
			"33%": "md:w-1/3",
			"66%": "md:w-2/3",
		},
	},
	defaultVariant: {
		columns: "100%",
	},
});

const FormField = ({ children, columns, className, ...props }) => {
	return (
		<div className={cn(fieldVariants({ columns, className }))} {...props}>
			{children}
		</div>
	);
};

export { Form, FormContainer, FormGroup, FormField };
