import { cn } from "@/lib/utils";

export const ErrorComponent = ({ errorValidation, error, className, ...props }) => {
	const defaultError =
		"flex justify-center items-center h-screen bold text-lg mt-2 text-never-foreground dark:text-never italic";
	const defaultErrorValidation = "text-xs text-never-foreground dark:text-never italic";
	return (
		<>
			{error ? (
				<div className={cn(defaultError, className)} {...props}>
					<label>{error}</label>
				</div>
			) : (
				errorValidation && (
					<label className={cn(defaultErrorValidation, className)} {...props}>
						{errorValidation}
					</label>
				)
			)}
		</>
	);
};
