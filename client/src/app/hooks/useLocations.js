import { useContext } from "react";
import LocationsContext from "../context/Locations/LocationsContext";

const useLocations = () => {
	return useContext(LocationsContext);
};

export default useLocations;
