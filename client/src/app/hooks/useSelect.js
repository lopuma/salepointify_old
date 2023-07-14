import { useState } from "react";
import useForm from "./useForm";
import { getLocations } from "@/app/services/fetchDataLocations";
const apiDataPopulations = getLocations("locations/populations");

const useSelect = ({ name, ...props }) => {
	const { formData, editMode, isSelected, handleChange } = useForm();
	const [dataPopulations, setDataPopulations] = useState(apiDataPopulations.read());

	const onChange = (event) => {
		handleChange(event, dataPopulations);
	};

	return {
		name,
		editMode: editMode,
		disabled: isSelected,
		value: formData[name],
		onChange,
		...props,
	};
};

export default useSelect;
