"use client";
import { useReducer, useState, useCallback, useEffect } from "react";
import CompanyContext from "./CompanyContext";
import CompanyReducer from "./CompanyReducer";
import { getCompanyData, postCompanyData } from "@/app/services/fetchDataCompany";
const apiDataCompany = getCompanyData("company");
const CompanyProvider = ({ children }) => {
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
	const [isError, setIsError] = useState("");

	useEffect(() => {
		const fetchDataCompany = async () => {
			try {
				const response = (await apiDataCompany).read();
				dispatch({
					type: "GET_COMPANY",
					payload: response,
				});
			} catch (error) {
				setIsError("An error occurred while getting company data. Please try again later, check the URL.");
			}
		};
		fetchDataCompany();
	}, []);

	const updateToCompany = async (data) => {
		try {
			const response = await postCompanyData(data);
			if (!response) {
				setIsError("An error occurred while updating the company data. Please try again later, check the URL.");
				return;
			}
			dispatch({
				type: "GET_COMPANY",
				payload: data,
			});
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
	return <CompanyContext.Provider value={companyContextValue}> {children}</CompanyContext.Provider>;
};

export default CompanyProvider;
