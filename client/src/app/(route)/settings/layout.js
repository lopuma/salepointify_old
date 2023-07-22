import FormsProvider from "../../context/Form/FormsState";
import Sidebar from "@/components/Sidebar/page";
import Section from "@/components/UI/Section";
export const metadata = {
	title: "Settings",
	description: "E-Commerce Sale Pointify",
};

export default function SettingsLayout({ children }) {
	return (
		<Section>
			<Sidebar />
			<FormsProvider>
				<div className="flex-1 px-2">
					<div className="w-full flex place-content-center">{children}</div>
				</div>
			</FormsProvider>
		</Section>
	);
}
