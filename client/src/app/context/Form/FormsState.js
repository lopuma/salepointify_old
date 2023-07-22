"use client";
import FormsContext from "./FormsContext";
import useCompany from "@/app/hooks/useCompany";
import { errorMessageValidations } from "@/app/services/textErrors";
import { useState, useEffect, useCallback } from "react";

function FormsProvider({ children }) {
	const { companyData, updateToCompany } = useCompany();
	const [formData, setFormData] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editMode, setEditMode] = useState(true);
	const [currentFormData, setCurrentFormData] = useState(null);
	const [isRequired, setIsRequired] = useState(null);
	const [errorsValidation, setIsErrors] = useState(null);
	const [errorsState, setErrorsState] = useState(null);
	const [isSelected, setIsSelected] = useState(false);
	const [selectedPopulation, setSelectedPopulation] = useState(null);
	useEffect(() => {
		if (companyData) {
			try {
				const {
					companyName: companyName,
					firstName: firstName,
					lastName: lastName,
					CIF: CIF,
					industry: industry,
					founded: founded,
					employees: employees,
					phone: phone,
					website: website,
					description: description,
					locations: locations,
				} = companyData;

				setFormData({
					companyName,
					firstName,
					lastName,
					CIF,
					industry,
					founded,
					employees,
					phone,
					website,
					description,
					parent_code: locations[0].parent_code,
					state: locations[0].state,
					population: locations[0].population,
					zip_code: locations[0].zip_code,
				});
			} catch (error) {}
		}
	}, [companyData]);

	function capitalizeWords(str) {
		return str.replace(/(^|\s)\S/g, (match) => {
			if (match.charAt(1) === "ñ") {
				return match;
			}
			return match.toUpperCase();
		});
	}

	function validate(fieldName) {
		let errors = {};
		const fieldValue = formData[fieldName];
		if (typeof fieldValue === "string") {
			const trimmedValue = fieldValue.trim();
			const fieldLength = trimmedValue.length;
			if ((trimmedValue === "" || fieldLength < 4) && isRequired[fieldName]) {
				errors = { ...errors, [fieldName]: errorMessageValidations[fieldName] };
			}
		} else if (typeof fieldValue === "number") {
			if (fieldValue < 0) {
				errors = { ...errors, [fieldName]: errorMessageValidations[fieldName] };
			}
		} else if (typeof fieldValue === "object") {
			fieldValue.forEach((element) => {
				Object.entries(element).forEach(([key, value]) => {
					if (typeof value === "number" && value < 0) {
						errors = { ...errors, [key]: errorMessageValidations[key] };
					}
				});
			});
		}

		return errors;
	}

	const handleReset = () => {
		setEditMode(true);
		setErrorsState(null);
		setIsErrors(null);
		setIsSelected(false);
	};

	const handleCancel = () => {
		setFormData(currentFormData);
		setIsSubmitting(false);
		handleReset();
	};

	const valuesAllInputs = () => {
		const SelectProvince = document.getElementById("parent_code");
		//const index = SelectProvince.selectedIndex;
		const locations = {
			parent_code: formData.parent_code,
			//state: SelectProvince.options[index].text,
			population: formData.population,
			zip_code: formData.zip_code,
		};

		const data = {
			CIF: formData.CIF,
			companyName: formData.companyName,
			description: formData.description,
			website: formData.website,
			phone: formData.phone,
			employees: formData.employees,
			firstName: formData.firstName,
			founded: formData.founded,
			industry: formData.industry,
			lastName: formData.lastName,
			locations: [locations],
		};

		return data;
	};

	function handleSubmit(event) {
		event.preventDefault();
		const allErrorsText = {};
		const allErrorsState = {};
		Object.keys(formData).forEach((fieldName) => {
			const fieldErrors = validate(fieldName);
			try {
				if (Object.keys(fieldErrors).length > 0) {
					if (typeof fieldErrors === "object") {
						Object.keys(fieldErrors).forEach((element) => {
							allErrorsText[element] = fieldErrors[element];
							allErrorsState[element] = true;
						});
					} else {
						allErrorsText[fieldName] = fieldErrors[fieldName];
						allErrorsState[fieldName] = true;
					}
				}
			} catch (error) {}
		});
		if (Object.keys(allErrorsText).length > 0) {
			setIsErrors(allErrorsText);
			setErrorsState(allErrorsState);
			return;
		}
		const data = valuesAllInputs();
		setIsSubmitting(true);
		setTimeout(() => {
			updateToCompany(data);
			handleReset();
		}, 2000);
	}

	const showPopulations = (parent_code, props) => {
		const result = props[0]?.filter((population) => population.parent_code === parent_code);
		setSelectedPopulation(result);
	};

	const handleChange = useCallback((event, ...props) => {
		let { name, value, required, type } = event.target;
		let parentCode = "";
		if (name !== "population" && name === "parent_code") {
			parentCode = value;
			showPopulations(parentCode, props);
			setIsSelected(true);
		}
		if (type === "number" && value > 0) {
			value = parseInt(value);
		}
		if (event.target.tagName === "INPUT" && type !== "number" && name === "companyName") {
			value = value.toUpperCase();
		} else if (event.target.tagName === "INPUT" && type !== "number") {
			value = capitalizeWords(value);
		}
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setIsErrors((prevErrors) => ({
			...prevErrors,
			[name]: "",
		}));
		setErrorsState((prevErrors) => ({
			...prevErrors,
			[name]: false,
		}));
		setIsRequired((preRequired) => ({
			...preRequired,
			[name]: required,
		}));
	}, []);

	const handleEdit = () => {
		setCurrentFormData(Object.assign({}, formData));
		setIsSubmitting(false);
		setEditMode(false);
	};

	const data = {
		handleSubmit,
		handleChange,
		handleEdit,
		handleCancel,
		setFormData,
		formData,
		editMode,
		isSubmitting,
		errorsState,
		errorsValidation,
		setIsErrors,
		setErrorsState,
		setIsRequired,
		isSelected,
		setIsSelected,
		selectedPopulation,
		setSelectedPopulation,
	};

	return <FormsContext.Provider value={data}>{children}</FormsContext.Provider>;
}

export default FormsProvider;
