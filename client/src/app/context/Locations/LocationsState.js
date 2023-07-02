import LocationsContext from "./LocationsContext";
import { useEffect, useState } from "react";
const PopulationsProvider = ({ children }) => {
	const [dataProvinces, setDataProvinces] = useState([]);
	const [dataPopulations, setDataPopulations] = useState([]);

	const getProvinces = async () => {
		const response = await fetch("http://192.168.1.141:3001/api/locations/provinces");
		const result = await response.json();
		setDataProvinces(result);
	};

	const getPopulations = async () => {
		const response = await fetch(`http://192.168.1.141:3001/api/locations/populations/`);
		const result = await response.json();
		setDataPopulations(result);
	};

	useEffect(() => {
		getProvinces();
		getPopulations();
	}, []);

	const data = { dataProvinces, dataPopulations };
	return <LocationsContext.Provider value={data}>{children}</LocationsContext.Provider>;
};

export default PopulationsProvider;
