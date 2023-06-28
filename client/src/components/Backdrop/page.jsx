'use client'
import useHeader from "@/app/hooks/useHeader";

const Backdrop = () => {
	const { showBackdrop, hiddenMenuBackdrop } = useHeader();
	return (
		<>
			{showBackdrop && (
				<div
					className="fixed top-[80px] inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/60 h-screan"
					id="sidebarBackdrop"
					onClick={hiddenMenuBackdrop}
				></div>
			)}
		</>
	);
};

export default Backdrop;
