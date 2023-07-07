"use client";
import { useReducer, useState, useCallback } from "react";
import CompanyContext from "./CompanyContext";
import CompanyReducer from "./CompanyReducer";
import { allCompanyData } from "@/app/services/company";
import axios from "axios";
import config from "@/app/config";
const API_BASE_URL = config.API_BASE_URL;
const companyUrl = `${API_BASE_URL}/company`;

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

	const initialState = {
		companyData: initialData,
	};

	const [state, dispatch] = useReducer(CompanyReducer, initialState);

	const [isError, setIsError] = useState("");

	const getCompany = useCallback(async () => {
		try {
			const newCompanyData = await allCompanyData();
			dispatch({
				type: "GET_COMPANY",
				payload: [newCompanyData],
			});
			const data = newCompanyData;
			console.log("cuando redner ", data);
			return data;
		} catch (error) {
			console.error(
				"An error occurred while getting company data. Please try again later, please check the URL.:",
				error
			);
			setIsError("An error occurred while getting company data. Please try again later, please check the URL.");
		}
	}, []);

	const postData = async (data) => {
		axios
			.post(companyUrl, data)
			.then(function (response) {
				console.info(response);
				dispatch({
					type: "GET_COMPANY",
					payload: [data],
				});
			})
			.catch((e) => {
				console.error(e);
				setIsError(e);
			});
	};

	const data = { isError, postData, getCompany };
	return <CompanyContext.Provider value={data}>{children}</CompanyContext.Provider>;
};

export default CompanyProvider;
