import Accounts from "@/app/(tpv)/page";
import { useDataCompany } from "./hooks/useDataCompany";
export default function Home() {
	const { getProducts } = useDataCompany();
	getProducts();
	return (
		<div className="mt-20 min-h-[100vh]">
			<Accounts />
		</div>
	);
}
