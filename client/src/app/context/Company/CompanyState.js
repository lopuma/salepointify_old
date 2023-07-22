"use client";
import { useReducer, useState, useEffect } from "react";
import CompanyContext from "./CompanyContext";
import CompanyReducer from "./CompanyReducer";
import { postCompanyData } from "@/app/services/fetchDataCompany";
import { ReactQueryDevtools } from "react-query/devtools";
import { useCompanyName } from "@/app/store/useCompanyName";
function CompanyProvider({ children }) {
	const { setCompanyName } = useCompanyName();
	const initialData = {
		firstName: "",
		lastName: "",
		companyName: "",
		CIF: "",
		industry: "",
		founded: 0,
		employees: 0,
		phone: 0,
		website: "",
		description: "",
		locations: [
			{
				parent_code: 0,
				state: "",
				population: "",
				zip: 0,
			},
		],
	};

	const initialState = {
		companyData: initialData,
	};

	const [state, dispatch] = useReducer(CompanyReducer, initialState);
	const [isError, setIsError] = useState(null);

	useEffect(() => {
		const fetchDataCompany = async () => {
			try {
				const response = (await apiDataCompany).read();
				dispatch({
					type: "GET_COMPANY",
					payload: response,
				});
				setCompanyName(response.companyName);
				console.log(response?.companyName);
				setIsError(null);
			} catch (error) {
				setIsError({
					label: "[ Bad Request ]",
					message: "An error occurred while getting company data. Please try again later, check the URL.",
					status: 400,
				});
			}
		};
		fetchDataCompany();
	}, []);

	const updateToCompany = async (data) => {
		try {
			const response = await postCompanyData(data);
			if (!response) {
				setIsError({
					label: "[ Bad Request ]",
					message: "An error occurred while getting company data. Please try again later, check the URL.",
					status: 400,
				});
				return;
			}
			dispatch({
				type: "GET_COMPANY",
				payload: data,
			});
			setCompanyName(data.companyName);
			setIsError(null);
		} catch (error) {
			console.error(
				"An error occurred while updating the company data. Please try again later, check the URL: ",
				error
			);
		}
	};

	const companyContextValue = {
		companyData: state.companyData,
		isError,
		updateToCompany,
	};
	return (
		<>
			<CompanyContext.Provider value={companyContextValue}>{children}</CompanyContext.Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}

export default CompanyProvider;
