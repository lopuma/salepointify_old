"use client";

import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import config from "@/app/config";
import CompanyContext from "./CompanyContext";
import CompanyReducer from "./CompanyReducer";
import checkUrlAvailability from "../globals";
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
			founded: "",
			employees: null,
			website: "",
			description: "",
			locations: [
				{
					name: "",
					address: "",
				},
			],
		},
	];

	const initialState = {
		companyData: initialData,
		selectedCompany: null,
	};

	const [state, dispatch] = useReducer(CompanyReducer, initialState);

	const [isError, setIsError] = useState("");

	const getData = async () => {
		try {
			const isAvailable = await checkUrlAvailability(companyUrl);

			if (isAvailable) {
				const res = await axios.get(companyUrl);
				if (res.status === 200) {
					const data = res.data;
					if (Array.isArray(data) && data.length > 0) {
						dispatch({
							type: "GET_COMPANY",
							payload: data,
						});
						setIsError("");
					}
				} else {
					console.error("Network response OK but HTTP response not OK");
				}
			} else {
				console.error(isError);
			}
		} catch (e) {
			setIsError("There was a problem with the axios request: " + e.message);
			console.error(isError);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const postData = async (data) => {
		console.log({ data }, "<==");
		axios
			.post(companyUrl, data)
			.then(function (response) {
				console.info(response);
			})
			.catch((e) => {
				console.error(e);
			});
		dispatch({
			type: "GET_COMPANY",
			payload: [data],
		});
	};

	const data = { companyData: state.companyData, isError, postData };
	console.log("==> ", { data });
	return <CompanyContext.Provider value={data}>{children}</CompanyContext.Provider>;
};

export default CompanyProvider;
