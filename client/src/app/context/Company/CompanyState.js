"use client";
import { useReducer, useState, useCallback, useEffect } from "react";
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
	const [dataCompany, setDataCompany] = useState(null);
	const [isDataCompanyUpdated, setIsDataCompanyUpdated] = useState(false);

	const [isError, setIsError] = useState("");

	const getCompany = useCallback(async () => {
		try {
			const newCompanyData = await allCompanyData();
			dispatch({
				type: "GET_COMPANY",
				payload: [newCompanyData],
			});
			console.log(" <== CUANTO SE EJECUTA GET ==>");
			setDataCompany(newCompanyData);
			setIsDataCompanyUpdated(true);
			return newCompanyData;
		} catch (error) {
			console.error(
				"An error occurred while getting company data. Please try again later, please check the URL.:",
				error
			);
			setIsError("An error occurred while getting company data. Please try again later, please check the URL.");
		}
	}, []);

	// useEffect(() => {
	// 	console.log("CUANTO SE EJECUTA");
	// 	//getCompany();
	// 	setDataCompany(state.companyData);
	// }, []);

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
		console.log("EL DATA QUE RECIBO => ", data);
		setDataCompany(data[0]);
		dispatch({
			type: "GET_COMPANY",
			payload: [data],
		});
		setIsDataCompanyUpdated(false);
	};

	const data = { isError, postData, getCompany, dataCompany, isDataCompanyUpdated, setIsDataCompanyUpdated };
	console.log("3 --> ", { data });
	return <CompanyContext.Provider value={data}>{children}</CompanyContext.Provider>;
};

export default CompanyProvider;
