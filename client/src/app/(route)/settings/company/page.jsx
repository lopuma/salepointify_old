"use client";
import { Suspense, lazy } from "react";
import { FormLoader } from "@/components/Loaders/FormLoader";
const CompanyForm = lazy(() => import("@/components/Forms/CompanyForm"));

export default function CompanyPage() {
	return <Suspense fallback={<FormLoader />}>{<CompanyForm />}</Suspense>;
}
