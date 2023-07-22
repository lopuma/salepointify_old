import { cn } from "@/lib/utils";

const Section = ({ children, className }) => {
	return (
		<section className={cn("mt-20 w-full bg-background flex overflow-x-auto custom-scrollbar", className)}>
			{children}
		</section>
	);
};

export default Section;
