import { useContext } from "react";
import FormsContext from "../context/Forms/FormsContext";

const useForm = () => {
	return useContext(FormsContext);
};

export default useForm;
