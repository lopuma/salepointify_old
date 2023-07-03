import Navbar from "@/components/Header/Navbar/page";
import Logo from "@/components/Header/Logo/page";

export default function Header() {
	return (
		<header
			className={`sticky top-0 z-50 w-full h-[80px] flex items-center place-content-center px-2 transition-shadow duration-300 ease-linear transform translateZ-0 backdrop-filter backdrop-blur-md backdrop-saturate-180 bg-background text-foreground shadow-lg hover:shadow-md dark:shadow-slate-500 dark:border-slate-400 dark:shadow-[0_5px_5px_-5px_#333]`}
		>
			<div className={`h-[80px] relative flex flex-1 place-content-between items-center w-full max-w-screen-2xl`}>
				<Logo />
				<Navbar />
			</div>
		</header>
	);
}
