"use client";
import { Suspense } from "react";
import { ErrorComponent } from "@/components/UI/ErrorComponent/page";
import { Backdrop } from "@/components/Backdrop/page";
import { FormCompany } from "@/components/UI/Form/formCompany";
import Loader from "../loading";
import useForm from "@/app/hooks/useForm";
import useCompany from "@/app/hooks/useCompany";

function CompanyPage() {
	const { formData } = useForm();
	const { isError } = useCompany();
	const renderForm = () => {
		if (isError) {
			return <ErrorComponent error={isError} />;
		}

		if (!formData) {
			return null;
		}

		return <FormCompany />;
	};

	return (
		<>
			<Suspense fallback={<Loader />}>{renderForm()}</Suspense>
			<Backdrop />
		</>
	);
}

export default CompanyPage;
