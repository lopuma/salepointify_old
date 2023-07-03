"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import useCompany from "@/app/hooks/useCompany";
import Button from "@/components/Ui/Button/page";
import Input from "@/components/Ui/Input/page";
import Label from "@/components/Ui/Label/page";
import { LoaderOval } from "@/components/Loaders/page";
import Backdrop from "@/components/Backdrop/page";
import ErrorComponent from "@/components/Ui/ErrorComponent/page";
import useForms from "@/app/hooks/useForms";
import useLocations from "@/app/hooks/useLocations";

const FormCompany = () => {
	const { companyData, isError, postData } = useCompany();
	const { dataProvinces, dataPopulations, handleSelectedPopulations } = useLocations();
	const [editMode, setEditMode] = useState(false);
	const colors = {
		color: "red",
	};

	const DetailView = ({ data, dataProvinces, dataPopulations }) => {
		const { companyName, firstName, lastName, CIF, industry, founded, employees, website, description, locations } =
			data[0];
		const [isDataProvinces, setIsDataProvinces] = useState(dataProvinces);
		const [isDataPopulations, setIsDataPopulations] = useState(dataPopulations);
		const [selectedPopulation, setSelectedPopulation] = useState([]);
		const [isSelected, setIsSelected] = useState(false);

		useEffect(() => {
			setIsDataProvinces(dataProvinces);
			setIsDataPopulations(dataPopulations);
		}, []);

		const [isSubmitting, setIsSubmitting] = useState(false);
		const [isErrors, setIsErrors] = useState({});
		const [isErrorsState, setIsErrorsState] = useState({});
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

		useEffect(() => {
			handleRefRegister();
		}, []);

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
			const allErrorsText = {};
			const allErrorsState = {};
			Object.keys(formData).forEach((fieldName) => {
				const fieldErrors = validate(fieldName, formData, isRequired);
				if (Object.keys(fieldErrors).length > 0) {
					allErrorsText[fieldName] = fieldErrors[fieldName];
					allErrorsState[fieldName] = true;
				}
			});
			if (Object.keys(allErrorsText).length > 0) {
				setIsErrors(allErrorsText);
				setIsErrorsState(allErrorsState);
			} else {
				const data = valuesAllInputs();
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
			setIsErrorsState((prevErrors) => ({
				...prevErrors,
				[fieldName]: false,
			}));
			setIsRequired((preRequired) => ({
				...preRequired,
				[fieldName]: required,
			}));
		}, []);

		const handleOnChangeSelect = async (e) => {
			e.preventDefault();
			const parent_code = e.target.value;
			handleSelectedPopulations(parent_code);
			setIsSelected(true);
		};

		const handleSelectedPopulations = async (parent_code) => {
			const result = isDataPopulations.filter((population) => population.parent_code === parent_code);
			setSelectedPopulation(result);
		};
		return (
			<>
				<form onSubmit={handleSubmit}>
					<div className="container shadow-sm shadow-slate-100 rounded-sm border border-gray-200 p-4 sm:my-4 sm:max-w-3xl dark:border-slate-700 dark:shadow-slate-700 dark:bg-gray-900">
						<div className="flex flex-wrap gap-4 md:gap-0 -mx-3 mb-6 ">
							<div className="w-full md:w-1/2 px-3 ">
								<Label htmlFor="grid-first-name">First Name:</Label>
								<Input
									// variant="ghost"
									valueRef="firstName"
									id="grid-first-name"
									type="text"
									placeholder="First name"
									value={formData.firstName}
									errorState={isErrorsState.firstName}
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
									errorState={isErrorsState.lastName}
									onChange={(e) => handleChange(e, "lastName")}
									editMode={editMode}
									required={true}
									handleRefRegister={handleRefRegister}
								/>
								{isErrors.lastName && <ErrorComponent error={isErrors.lastName} />}
							</div>
						</div>
						<div className="flex flex-wrap gap-4 md:gap-0 -mx-3 mb-6">
							<div className="w-full md:w-3/4 px-3">
								<Label htmlFor="grid-company-name">Company Name:</Label>
								<Input
									valueRef="companyName"
									id="grid-company-name"
									placeholder="Company Name"
									value={formData.companyName}
									errorState={isErrorsState.companyName}
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
									errorState={isErrorsState.CIF}
									onChange={(e) => handleChange(e, "CIF")}
									editMode={editMode}
									handleRefRegister={handleRefRegister}
								/>
								{isErrors.CIF && <ErrorComponent error={isErrors.CIF} />}
							</div>
						</div>
						<div className="flex flex-wrap gap-2 md:gap-0 -mx-3 mb-2">
							{/* TODO PROVINCES */}
							<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<Label htmlFor="grid-provinces">State / Provinces</Label>
								<div className="relative">
									<select
										className={`block appearance-none w-full ${
											editMode ? "bg-white" : "bg-gray-200"
										} border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
										id="grid-provinces"
										disabled={editMode ? false : true}
										onChange={(e) => handleOnChangeSelect(e)}
									>
										{isDataProvinces.map(({ label, code }) => {
											return (
												<option key={code} value={code}>
													{label}
												</option>
											);
										})}
									</select>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg
											className="fill-current h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											style={colors}
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
							{/* TODO POPULATIONS */}
							<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<Label htmlFor="grid-populations">Populations</Label>
								<div className="relative">
									<select
										className={`block appearance-none w-full ${
											isSelected ? "bg-white" : "bg-gray-200"
										} border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
										id="grid-populations"
										defaultValue="Choose a Populations"
										disabled={isSelected ? false : true}
									>
										{isSelected ? (
											selectedPopulation.map(({ label }, index) => {
												return (
													<option key={index} value={label}>
														{label}
													</option>
												);
											})
										) : (
											<option disabled>Choose a Populations</option>
										)}
									</select>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg
											className="fill-current h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											style={colors}
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
							{/* TODO POSTAL CODE */}
							<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<Label htmlFor="grid-zip">Zip</Label>
								<input
									className={`appearance-none block w-full ${
										editMode ? "bg-white" : "bg-gray-200"
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
										<Button text="Submit" type="submit" />
										<Button text="Cancel" type="button" className="bg-red-600 text-white" onClick={handleCancel} />
									</div>
								)
							) : (
								<Button text="Edit" type="button" onClick={handleEditClick} />
							)}
						</div>
					</div>
				</form>
				<Backdrop />
			</>
		);
	};

	if (!isError) {
		return <DetailView data={companyData} dataProvinces={dataProvinces} dataPopulations={dataPopulations} />;
	} else {
		return (
			<section className="px-4 bg-white">
				{isError && (
					<ErrorComponent
						error={isError}
						className="flex justify-center items-center h-screen text-red-500 bold text-lg"
					/>
				)}
			</section>
		);
	}
};

export default FormCompany;
