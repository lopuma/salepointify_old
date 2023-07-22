import ScrollSidebar from "./ScrollSidebar/page";
import ToggleSidebar from "./ToggleSidebar/page";
import BackdropSidebar from "./BackdropSidebar/page";

function Sidebar() {
	return (
		<>
			<BackdropSidebar />
			<ToggleSidebar />
			<ScrollSidebar />
		</>
	);
}

export default Sidebar;
