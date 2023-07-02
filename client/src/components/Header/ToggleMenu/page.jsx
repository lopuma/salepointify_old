import useHeader from "@/app/hooks/useHeader";
const ToggleButton = () => {
	const { showToggle, showMenuBackdrop } = useHeader();
	return (
		<div
			className={`cursor-pointer sm:hidden rounded-md border border-aside bg-white text-black hover:border-black hover:text-black`}
		>
			<button
				id="toggleSidebarMobile"
				aria-expanded="true"
				aria-controls="sidebar"
				onClick={showMenuBackdrop}
				title="Menu"
				className="p-2"
			>
				{showToggle ? (
					<svg
						id="toggleSidebarMobileClose"
						className="h-6 w-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
				) : (
					<svg
						id="toggleSidebarMobileHamburger"
						className="h-6 w-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clipRule="evenodd"
						></path>
					</svg>
				)}
			</button>
		</div>
	);
};

export default ToggleButton;
