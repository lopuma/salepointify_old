import { useContext } from "react";
import PopulationsContext from "../context/Populations/PopulationsContext";

const usePopulation = () => {
	return useContext(PopulationsContext);
};

export default usePopulation;
