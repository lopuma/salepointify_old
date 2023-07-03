import ScrollSidebar from "./ScrollSidebar/page";
import ToggleSidebar from "./ToggleSidebar/page";
import BackdropSidebar from "./BackdropSidebar/page";
import SidebarProvider from "@/app/context/Sidebar/SidebarState";

const Sidebar = () => {
	return (
		<SidebarProvider>
			<BackdropSidebar />
			<ToggleSidebar />
			<ScrollSidebar />
		</SidebarProvider>
	);
};

export default Sidebar;
