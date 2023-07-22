"use client";
import { Suspense, lazy } from "react";
import { ProductLoader } from "@/components/Loaders/ProductLoader";
const ProductForm = lazy(() => import("@/components/Forms/ProductForm"));

export default function CompanyPage() {
	return <Suspense fallback={<ProductLoader />}>{<ProductForm />}</Suspense>;
}
