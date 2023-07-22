import { Suspense, lazy } from "react";
import { ProductLoader } from "@/components/Loaders/ProductLoader";
const Overview = lazy(() => import("@/components/Overview/page"));

export default function OverviewPage() {
	return (
		<Suspense fallback={<ProductLoader />}>
			<Overview />
		</Suspense>
	);
}
