import { useContext } from "react";
import FormsContext from "../context/Forms/FormsContext";

const useForms = () => {
	return useContext(FormsContext);
};

export default useForms;
