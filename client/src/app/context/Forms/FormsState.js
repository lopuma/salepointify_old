import FormsContext from "./FormsContext";
import { errorMessages } from "@/app/context/Errors/errorsInputs";

const FormsProvider = ({ children }) => {
	function capitalizeWords(str) {
		return str.replace(/(^|\s)\S/g, (match) => {
			if (match.charAt(1) === "ñ") {
				return match;
			}
			return match.toUpperCase();
		});
	}

	function validate(fieldName, formData, isRequired) {
		let errors = {};
		const fieldValue = formData[fieldName].trim();
		const fieldLength = fieldValue.length;
		if ((fieldValue === "" || fieldLength < 4) && isRequired[fieldName]) {
			errors = { ...errors, [fieldName]: errorMessages[fieldName] };
		}
		return errors;
	}

	const data = { capitalizeWords, validate };

	return <FormsContext.Provider value={data}>{children}</FormsContext.Provider>;
};

export default FormsProvider;
