import PopulationsContext from "./PopulationsContext";
import { useEffect, useState } from "react";
const PopulationsProvider = ({ children }) => {
	const [dataProvinces, setDataProvinces] = useState([]);
	const [dataPopulations, setDataPopulations] = useState([]);
	const [selectedPopulation, setSelectedPopulation] = useState("");

	const getProvinces = async () => {
		await fetch("http://192.168.1.141:3001/api/locations/provinces")
			.then(async (res) => await res.json())
			.then((result) => setDataProvinces(result));
	};
	useEffect(() => {
		getProvinces();
	}, []);

	const getPopulations = async (parent_code) => {
		console.log("El parent code que recibo es", parent_code);
		const response = await fetch(`http://192.168.1.141:3001/api/locations/populations/${parent_code}`);
		const result = await response.json();
		setDataPopulations(result);
	};
	useEffect(() => {
		getPopulations();
	}, []);

	const data = { dataProvinces, getPopulations };
	return <PopulationsContext.Provider value={data}>{children}</PopulationsContext.Provider>;
};

export default PopulationsProvider;
