import useForm from "./useForm";

function useField({ name, type, placeholder, ...props }) {
	const { formData, errorState, editMode, handleChange } = useForm();
	const onChange = (event) => {
		handleChange(event);
	};

	return {
		id: name,
		placeholder: placeholder || name,
		name,
		type,
		editMode: editMode,
		value: formData[name],
		errorState: errorState?.name,
		onChange,
		...props,
	};
}

export default useField;
