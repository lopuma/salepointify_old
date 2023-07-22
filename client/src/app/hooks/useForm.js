import { useContext } from "react";
import FormsContext from "../context/Form/FormsContext";

const useForm = () => {
	return useContext(FormsContext);
};

export default useForm;
