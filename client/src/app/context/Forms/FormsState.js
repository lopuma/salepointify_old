"use client";
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
		const fieldValue = formData[fieldName];
		if (typeof fieldValue === "string") {
			const trimmedValue = fieldValue.trim();
			const fieldLength = trimmedValue.length;
			if ((trimmedValue === "" || fieldLength < 4) && isRequired[fieldName]) {
				errors = { ...errors, [fieldName]: errorMessages[fieldName] };
			}
		} else if (typeof fieldValue === "number") {
			if (fieldValue < 0) {
				// El valor es menor que 0
				// Realiza la acción que desees
				errors = { ...errors, [fieldName]: errorMessages[fieldName] };
			}
		}

		return errors;
	}

	const data = { capitalizeWords, validate };

	return <FormsContext.Provider value={data}>{children}</FormsContext.Provider>;
};

export default FormsProvider;
