import { useEffect, useState } from "react";
import LocationsContext from "./LocationsContext";
import axios from "axios";
import config from "@/app/config";
import checkUrlAvailability from "../globals";

const API_BASE_URL = config.API_BASE_URL;
const localtionsUrl = `${API_BASE_URL}/locations`; // /api/locations/provinces

const PopulationsProvider = ({ children }) => {
	const [dataProvinces, setDataProvinces] = useState([]);
	const [dataPopulations, setDataPopulations] = useState([]);
	const [isError, setIsError] = useState("");

	const getProvinces = async () => {
		try {
			const url = localtionsUrl + "/provinces";
			const isAvailable = await checkUrlAvailability(url);
			if (isAvailable) {
				const res = await axios.get(url);
				if (res.status === 200) {
					const data = res.data;
					setDataProvinces(data);
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

	const getPopulations = async () => {
		try {
			const url = localtionsUrl + "/populations";
			const isAvailable = await checkUrlAvailability(url);
			if (isAvailable) {
				const res = await axios.get(url);
				if (res.status === 200) {
					const data = res.data;
					setDataPopulations(data);
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
		getProvinces();
		getPopulations();
	}, []);

	const data = { dataProvinces, dataPopulations, isError };
	return <LocationsContext.Provider value={data}>{children}</LocationsContext.Provider>;
};

export default PopulationsProvider;
