import { useQuery } from "react-query";
import { ProductLoader } from "@/components/Loaders/ProductLoader";
import { getCompanyData } from "../services/company";
import { useState } from "react";
const apiDataCompany = getCompanyData("company");

export function useDataCompany() {
	const [errors, setError] = useState(null);

	const getProducts = () => {
		try {
			setError(null);
			const [data] = apiDataCompany.read();
			return [data];
		} catch (error) {
			setError(error);
		}
	};

	const { isLoading, isError, error, data } = useQuery(["company"], getProducts);

	console.log({ isError, errors, data, isLoading });

	if (isLoading) {
		return <ProductLoader />;
	}
	if (isError || (errors && data === undefined) || data === null || data === undefined) {
		try {
			const customError = {
				status: 404,
				label: "[ Not Found ]",
				message: "The resource requested could not be found on this server.",
			};
			return { customError };
		} catch (error) {}
		return (customError = {
			status: 404,
			label: "[ Not Found ]",
			message: "The resource requested could not be found on this server.",
		});
	}

	return { company: data[0] };
}
