import { cn } from "@/lib/utils";

/**
 * Error Component.
 * @constructor
 * @param {Object} props - Component properties.
 * @param {Object} customError - Object that receives { status: string, label: string, error: string } to represent an error in FETCH calls.
 * @param {string} className - Additional CSS classes for the component.
 */

export function ErrorComponent({ customError, className, ...props }) {
	return (
		customError && (
			<div className="max-w-3xl" {...props}>
				<div
					className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
					role="alert"
				>
					<span className="font-medium">Warning!</span> The client should not repeat this request without modification.
				</div>
				<section className={cn("relative z-10 bg-primary py-[120px]", className)}>
					<div className="container">
						<div className="flex -mx-4">
							<div className="w-full px-4">
								<div className="mx-auto max-w-[400px] text-center">
									<h2 className="mb-2 text-[50px] font-bold leading-none  sm:text-[80px] md:text-[100px]">
										{customError.status ? customError.status : "404"}
									</h2>
									<h4 className="mb-3 text-[22px] font-semibold leading-tight ">
										{customError.label ? customError.label : "Oops! That page can't be found"}
									</h4>
									<p className="mb-8 text-lg ">{customError.message}</p>
									<a
										href="/settings"
										className="inline-block px-8 py-3 text-base font-semibold text-center  transition border border-gray-400 rounded-lg hover:bg-white hover:text-primary"
									>
										Go to Home
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="absolute top-0 left-0 flex items-center justify-between w-full h-full space-x-5 -z-10 md:space-x-8 lg:space-x-14">
						<div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
						<div className="flex w-1/3 h-full">
							<div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
							<div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
						</div>
						<div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
					</div>
				</section>
			</div>
		)
	);
}

/**
 * Error Component.
 * @constructor
 * @param {Object} props - Component properties.
 * @param {string} errorValidation - Text error for form validations.
 * @param {string} className - Additional CSS classes for the component.
 */

export function ErrorValidation({ message, className, ...props }) {
	const defaultErrorValidation = "text-xs text-never-foreground dark:text-never italic";
	return (
		message && (
			<label className={cn(defaultErrorValidation, className)} {...props}>
				{message}
			</label>
		)
	);
}
