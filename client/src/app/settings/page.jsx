"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import useCompany from "../hooks/useCompany";
import Button from "@/components/Form/Button/page";
import Input from "@/components/Form/Input/page";
import Label from "@/components/Form/Label/page";
import { LoaderOval } from "../../components/Loaders/page";
import Backdrop from "@/components/Backdrop/page";
import ErrorComponent from "@/components/Form/ErrorComponent/page";
import useForms from "../hooks/useForms";

const FormSettings = () => {
	const { companyData, error, postData } = useCompany();
	const [editMode, setEditMode] = useState(false);

	const DetailView = ({ data }) => {
		const { companyName, firstName, lastName, CIF, industry, founded, employees, website, description, locations } =
			data[0];
		const [isSubmitting, setIsSubmitting] = useState(false);
		const [isErrors, setIsErrors] = useState({});
		const [formData, setFormData] = useState({
			companyName: companyName || "",
			firstName: firstName || "",
			lastName: lastName || "",
			CIF: CIF || "",
		});
		const [isRequired, setIsRequired] = useState({
			companyName: false,
			firstName: false,
			lastName: false,
			CIF: false,
		});
		const inputRefs = useRef([]);
		const { capitalizeWords, validate } = useForms();

		useEffect(() => {
			const timeout = setTimeout(() => {
				if (formData.companyName === "") {
					setEditMode(true);
				}
			}, 2000);

			return () => clearTimeout(timeout);
		}, [formData.companyName]);

		useEffect(() => {
			try {
				const firstNameInput = inputRefs.current["firstName"];
				firstNameInput.focus();
			} catch (e) {}
		}, []);

		const handleEditClick = () => {
			setEditMode(true);
		};

		const handleRefRegister = (fieldName, ref) => {
			if (ref && !inputRefs.current[fieldName]) {
				inputRefs.current[fieldName] = ref;
			}
		};

		const valuesAllInputs = () => {
			const inputValues = {};
			Object.keys(inputRefs.current).forEach((key) => {
				const value = inputRefs.current[key].value;
				inputValues[key] = value;
			});
			return inputValues;
		};

		const handleSubmit = (e) => {
			e.preventDefault();
			const allErrors = {};

			Object.keys(formData).forEach((fieldName) => {
				const fieldErrors = validate(fieldName, formData, isRequired);
				if (Object.keys(fieldErrors).length > 0) {
					allErrors[fieldName] = fieldErrors[fieldName];
				}
			});
			if (Object.keys(allErrors).length > 0) {
				setIsErrors(allErrors);
			} else {
				const data = valuesAllInputs();
				console.log({ data });
				setIsSubmitting(true);
				setTimeout(() => {
					postData(data);
					setEditMode(false);
				}, 2000);
			}
		};

		const handleCancel = (e) => {
			e.preventDefault();
			setEditMode(false);
		};

		const handleChange = useCallback((e, fieldName) => {
			let value = e.target.value;
			const required = e.target.required;
			if (fieldName === "companyName") {
				value = value.toUpperCase();
			} else {
				value = capitalizeWords(value);
			}
			setFormData((prevData) => ({
				...prevData,
				[fieldName]: value,
			}));
			setIsErrors((prevErrors) => ({
				...prevErrors,
				[fieldName]: "",
			}));
			setIsRequired((preRequired) => ({
				...preRequired,
				[fieldName]: required,
			}));
		}, []);

		return (
			<form onSubmit={handleSubmit}>
				<div className="container shadow-sm shadow-slate-100 rounded-sm border border-gray-200 p-4 sm:my-4 sm:max-w-3xl dark:border-slate-700 dark:shadow-slate-700 dark:bg-gray-900">
					<div className="flex flex-wrap -mx-3 mb-6 ">
						<div className="w-full md:w-1/2 px-3 ">
							<Label htmlFor="grid-first-name">First Name:</Label>
							<Input
								valueRef="firstName"
								id="grid-first-name"
								type="text"
								placeholder="First name"
								value={formData.firstName}
								errorState={isErrors.firstName}
								onChange={(e) => handleChange(e, "firstName")}
								editMode={editMode}
								required={true}
								handleRefRegister={handleRefRegister}
							/>
							{isErrors.firstName && <ErrorComponent error={isErrors.firstName} />}
						</div>
						<div className="w-full md:w-1/2 px-3">
							<Label htmlFor="grid-last-name">Last Name:</Label>
							<Input
								valueRef="lastName"
								id="grid-last-name"
								placeholder="Last Name"
								value={formData.lastName}
								errorState={isErrors.lastName}
								onChange={(e) => handleChange(e, "lastName")}
								editMode={editMode}
								required={true}
								handleRefRegister={handleRefRegister}
							/>
							{isErrors.lastName && <ErrorComponent error={isErrors.lastName} />}
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full md:w-3/4 px-3">
							<Label htmlFor="grid-company-name">Company Name:</Label>
							<Input
								valueRef="companyName"
								id="grid-company-name"
								placeholder="Company Name"
								value={formData.companyName}
								errorState={isErrors.companyName}
								onChange={(e) => handleChange(e, "companyName")}
								editMode={editMode}
								required={true}
								handleRefRegister={handleRefRegister}
							/>
							{isErrors.companyName && <ErrorComponent error={isErrors.companyName} />}
						</div>
						<div className="w-full md:w-1/4 px-3">
							<Label htmlFor="grid-cif">CIF:</Label>
							<Input
								valueRef="cif"
								id="grid-cif"
								placeholder="B12345678"
								value={formData.CIF}
								errorState={isErrors.CIF}
								onChange={(e) => handleChange(e, "CIF")}
								editMode={editMode}
								handleRefRegister={handleRefRegister}
							/>
							{isErrors.CIF && <ErrorComponent error={isErrors.CIF} />}
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-2">
						<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
								City
							</label>
							<input
								className={`appearance-none block w-full ${
									editMode ? "bg-whiteb" : "bg-gray-200"
								} text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
								id="grid-city"
								type="text"
								placeholder="Albuquerque"
								readOnly={!editMode}
							/>
						</div>
						<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-state"
							>
								State
							</label>
							<div className="relative">
								<select
									className={`block appearance-none w-full ${
										editMode ? "bg-whiteb" : "bg-gray-200"
									} border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
									id="grid-state"
								>
									<option>New Mexico</option>
									<option>Missouri</option>
									<option>Texas</option>
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
									<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
										<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
									</svg>
								</div>
							</div>
						</div>
						<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
								Zip
							</label>
							<input
								className={`appearance-none block w-full ${
									editMode ? "bg-whiteb" : "bg-gray-200"
								} text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
								id="grid-zip"
								type="text"
								placeholder="90210"
								readOnly={!editMode}
							/>
						</div>
					</div>
					<div className="flex items-end place-content-end mt-8">
						{editMode ? (
							isSubmitting ? (
								<Button text="Submitting" loader=<LoaderOval type="button" /> />
							) : (
								<div className="flex gap-4">
									<Button text="Submit" />
									<Button text="Cancel" type="button" className="bg-red-600 text-white" onClick={handleCancel} />
								</div>
							)
						) : (
							<Button text="Edit" type="button" onClick={handleEditClick} />
						)}
					</div>
				</div>
				<Backdrop />
			</form>
		);
	};

	if (!error) {
		return <DetailView data={companyData} />;
	} else {
		return (
			<section className="px-4 bg-white">
				{error && (
					<ErrorComponent
						error={error}
						className="flex justify-center items-center h-screen text-red-500 bold text-lg"
					/>
				)}
			</section>
		);
	}
};

export default FormSettings;
