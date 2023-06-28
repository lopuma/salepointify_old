"use client";

import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import config from "@/app/config";
import CompanyContext from "./CompanyContext";
import CompanyReducer from "./CompanyReducer";
const API_BASE_URL = config.API_BASE_URL
const CompanyProvider = ({ children }) => {
	const initialData = [
		{   
            firstName: "",
            lastName: "",
			companyName: "",
            CIF:"",
			industry: "",
			founded: "",
			employees: null,
			website: "",
			description:
				"",
			locations: [
				{
					name: "",
					address: "",
				}
			],
		},
	];

	const initialState = {
		companyData: initialData,
		selectedCompany: null,
	};

	const [state, dispatch] = useReducer(CompanyReducer, initialState);

	const [error, setError] = useState("");

	const checkUrlAvailability = async (url) => {
		try {
			const response = await axios.head(url, { timeout: 3000 });
			return response.status === 200;
		} catch {
			setError("The requested URL could not be accessed. Please verify the address and try again later.");
			return false;
		}
	};

	const getData = async () => {
		try {
			const isAvailable = await checkUrlAvailability(API_BASE_URL);

			if (isAvailable) {
				const res = await axios.get(API_BASE_URL);
				if (res.status === 200) {
					const data = res.data;
					if (Array.isArray(data) && data.length > 0) {
						dispatch({
							type: "GET_COMPANY",
							payload: data,
						});
						setError("");
					}
				} else {
					console.error("Network response OK but HTTP response not OK");
				}
			} else {
				console.error(error);
			}
		} catch (e) {
			setError("There was a problem with the axios request: " + e.message);
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const postData = async (data) => {
		axios
			.post(API_BASE_URL, data)
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

	const data = { companyData: state.companyData, error, postData };
	return <CompanyContext.Provider value={data}>{children}</CompanyContext.Provider>;
};

export default CompanyProvider;
