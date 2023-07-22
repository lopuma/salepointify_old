import useForm from "./useForm";
import { getLocations } from "@/app/services/fetchDataLocations";
import { useQuery } from "react-query";
const apiDataPopulations = getLocations("locations/populations");

const useSelect = ({ name, ...props }) => {
	const { formData, editMode, isSelected, handleChange } = useForm();
	const { data: dataPopulations } = useQuery("dataPopulations", () => apiDataPopulations.read());

	const onChange = (event) => {
		handleChange(event, dataPopulations);
	};

	return {
		name: name,
		editMode: editMode,
		disabled: isSelected,
		value: formData[name],
		onChange,
		...props,
	};
};

export default useSelect;
