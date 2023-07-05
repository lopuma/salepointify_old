"use client";
import { useReducer, useState, useCallback, useEffect } from "react";
import CompanyContext from "./CompanyContext";
import CompanyReducer from "./CompanyReducer";
import { allCompanyData } from "@/app/services/company";

const CompanyProvider = ({ children }) => {
	const initialData = [
		{
			firstName: "",
			lastName: "",
			companyName: "",
			CIF: "",
			industry: "",
			founded: 0,
			employees: 0,
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
		},
	];

	// const initialState = {
	// 	companyData: initialData,
	// };

	// const [state, dispatch] = useReducer(CompanyReducer, initialState);

	const [isError, setIsError] = useState("");
	const [dataCompany, setDataCompany] = useState(null);

	const getCompany = useCallback(async () => {
		console.log("cuanto se rende?");
		try {
			const newCompanyData = await allCompanyData();
			setDataCompany(newCompanyData);
		} catch (error) {
			console.error("Error occurred:", error);
			// Aquí puedes realizar acciones adicionales según tus necesidades
			// Por ejemplo, puedes mostrar un mensaje de error al usuario
			setIsError("An error occurred while fetching company data. Please try again later.");
		}
	}, []);

	useEffect(() => {
		getCompany();
	}, []);

	const postData = async (data) => {
		axios
			.post(companyUrl, data)
			.then(function (response) {
				console.info(response);
			})
			.catch((e) => {
				console.error(e);
				setIsError(e);
			});
		dispatch({
			type: "GET_COMPANY",
			payload: [data],
		});
	};

	//const data = { companyData: state.companyData, isError, postData, getCompany };
	const data = { companyData: initialData, isError, postData, dataCompany };
	return <CompanyContext.Provider value={data}>{children}</CompanyContext.Provider>;
};

export default CompanyProvider;
