import NavPos from "@/components/Nav-pos/Nav-pos";

export const metadata = {
	title: "Point of Sale",
	description: "E-Commerce Sale Pointify",
};

export default function SettingsLayout({ children }) {
	return (
		<div className="mt-20">
			<NavPos />
			<article className="mt-10 min-h-[100vh]">{children}</article>
		</div>
	);
}
