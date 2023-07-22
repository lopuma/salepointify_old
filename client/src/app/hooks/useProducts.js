import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { ProductLoader } from "@/components/Loaders/ProductLoader";
import { searchProducts } from "../services/products";
import { useState } from "react";

export function useProducts() {
	const [searchParams] = useSearchParams();
	const [errors, setError] = useState(null);
	let page = "1";
	try {
		page = searchParams[1];
	} catch (error) {}

	const getProducts = async ({ queryKey }) => {
		console.log("2 => ", queryKey[0]);
		try {
			setError(null);
			const [products, pagination] = await searchProducts({ queryKey });
			console.log({ products, pagination });
			return [products, pagination];
		} catch (error) {
			setError(error);
		}
	};

	const { isLoading, isError, error, data } = useQuery(["products", page], getProducts);

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

	return { products: data[0], pagination: data[1] };
}
