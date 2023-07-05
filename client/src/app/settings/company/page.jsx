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

function FormCompany() {
	const { companyData, isError, postData, dataCompany } = useCompany();
	const { dataProvinces, dataPopulations } = useLocations();
	const { capitalizeWords, validate } = useForms();
	const [editMode, setEditMode] = useState(false);
	const colors = {
		color: "var(--primary)",
	};
	const [isData, setIsData] = useState({});

	useEffect(() => {
		const { companyName, firstName, lastName, CIF, industry, founded, employees, website, description, locations } =
			dataCompany[0];
		setIsData({
			companyName,
			firstName,
			lastName,
			CIF,
			industry,
			founded,
			employees,
			website,
			description,
			locations,
		});
		console.log({ isData });
	}, [dataCompany]);

	// const DetailView = ({ data, dataCompany, dataProvinces, dataPopulations }) => {
	//
	// 	const { companyName, firstName, lastName, CIF, industry, founded, employees, website, description, locations } =
	// 		data[0];

	// 	console.log("Render ", dataCompany);

	// 	const [selectedPopulation, setSelectedPopulation] = useState([]);

	// 	const [isSubmitting, setIsSubmitting] = useState(false);
	//
	//
	// 	const [formData, setFormData] = useState({
	// 		companyName: companyName || "",
	// 		firstName: firstName || "",
	// 		lastName: lastName || "",
	// 		industry: industry || "",
	// 		CIF: CIF || "",
	// 		founded: founded || "",
	// 		employees: employees || "",
	// 		website: website || "",
	// 		description: description || "",
	// 		parent_code: locations[0].parent_code || "",
	// 		state: locations[0].state || "",
	// 		population: locations[0].population || "",
	// 		zip: locations[0].zip || "",
	// 	});

	// 	useEffect(() => {
	// 		setIsDataProvinces(dataProvinces);
	// 		setIsDataPopulations(dataPopulations);
	// 	}, []);

	// 	useEffect(() => {
	// 		const timeout = setTimeout(() => {
	// 			if (formData.companyName === "") {
	// 				setEditMode(true);
	// 			}
	// 		}, 2000);

	// 		return () => clearTimeout(timeout);
	// 	}, [formData.companyName]);

	// 	useEffect(() => {
	// 		try {
	// 			const firstNameInput = inputRefs.current["firstName"];
	// 			firstNameInput.focus();
	// 		} catch (e) {}
	// 	}, []);

	// 	const handleEditClick = () => {
	// 		setEditMode(true);
	// 	};

	// 	const valuesAllInputs = (e) => {
	// 		const selectState = document.getElementById("grid-state");
	// 		const index = selectState.selectedIndex;
	// 		const populations = {
	// 			parent_code: formData.parent_code,
	// 			state: selectState.options[index].text,
	// 			population: formData.population,
	// 			zip: formData.zip,
	// 		};

	// 		const data = {
	// 			CIF: formData.CIF,
	// 			companyName: formData.companyName,
	// 			description: formData.description,
	// 			employees: formData.employees,
	// 			firstName: formData.firstName,
	// 			founded: formData.founded,
	// 			industry: formData.industry,
	// 			lastName: formData.lastName,
	// 			locations: [populations],
	// 		};

	// 		return data;
	// 	};

	// 		// Object.keys(formData).forEach((fieldName) => {
	// 		// 	const fieldErrors = validate(fieldName, formData, isRequired);
	// 		// 	try {
	// 		// 		if (Object.keys(fieldErrors).length > 0) {
	// 		// 			allErrorsText[fieldName] = fieldErrors[fieldName];
	// 		// 			allErrorsState[fieldName] = true;
	// 		// 		}
	// 		// 	} catch (error) {}
	// 		// });
	// 		// if (Object.keys(allErrorsText).length > 0) {
	// 		// 	setIsErrors(allErrorsText);
	// 		// 	setIsErrorsState(allErrorsState);
	// 		// } else {
	// 		// 	const data = valuesAllInputs();
	// 		// 	setIsSubmitting(true);
	// 		// 	setTimeout(() => {
	// 		// 		postData(data);
	// 		// 		setEditMode(false);
	// 		// 	}, 2000);
	// 		// }
	// 	};

	// 	const handleCancel = (e) => {
	// 		e.preventDefault();
	// 		setEditMode(false);
	// 	};

	// };
	const DetailView = ({ isData }) => {
		const inputRefs = useRef([]);
		console.log({ isData });
		const [formData, setFormData] = useState({
			companyName: isData.companyName || "",
			firstName: isData.firstName || "",
			lastName: isData.lastName || "",
			industry: isData.industry || "",
			CIF: isData.CIF || "",
			founded: isData.founded || "",
			employees: isData.employees || "",
			website: isData.website || "",
			description: isData.description || "",
			locations: isData.locations || [],
			// state: isData.locations[0].state || "",
			// population: isData.locations[0].population || "",
			// zip: isData.locations[0].zip || "",
		});

		// useEffect(() => {
		// 	const [dataLocations, setDataLocations] = useState({
		// 		state: formData.locations || "",
		// 	});
		// 	console.log({ dataLocations });
		// 	// population: isData.locations[0].population || "",
		// 	// zip: isData.locations[0].zip || "",
		// }, [formData]);
		const [isErrors, setIsErrors] = useState({});
		const [isErrorsState, setIsErrorsState] = useState({});
		const [isSelected, setIsSelected] = useState(false);
		const [isRequired, setIsRequired] = useState({
			companyName: false,
			firstName: false,
			lastName: false,
			CIF: false,
			industry: false,
			founded: false,
			employees: false,
			website: false,
			description: false,
			parent_code: false,
			state: false,
			population: false,
			zip: false,
		});
		const [isDataProvinces, setIsDataProvinces] = useState(dataProvinces);
		const [isDataPopulations, setIsDataPopulations] = useState(dataPopulations);
		const showPopulations = (parent_code) => {
			const result = isDataPopulations.filter((population) => population.parent_code === parent_code);
			setSelectedPopulation(result);
		};

		const handleSubmit = (e) => {
			e.preventDefault();
			const allErrorsText = {};
			const allErrorsState = {};
			Object.keys(formData).forEach((fieldName) => {
				const fieldErrors = validate(fieldName, formData, isRequired);
				try {
					if (Object.keys(fieldErrors).length > 0) {
						allErrorsText[fieldName] = fieldErrors[fieldName];
						allErrorsState[fieldName] = true;
					}
				} catch (error) {}
			});
			if (Object.keys(allErrorsText).length > 0) {
				setIsErrors(allErrorsText);
				setIsErrorsState(allErrorsState);
				return;
			}
			const data = valuesAllInputs(e);
			setIsSubmitting(true);
			setTimeout(() => {
				postData(data);
				setEditMode(false);
			}, 2000);
		};

		const handleOnChange = useCallback((event, fieldName) => {
			let value = event.target.value;
			let parentCode = "";
			const required = event.target.required;
			console.log("Render 2");

			if (fieldName === "companyName" && fieldName !== "parent_code" && fieldName !== "population") {
				value = value.toUpperCase();
			} else {
				value = capitalizeWords(value);
			}
			if (fieldName === "parent_code") {
				parentCode = value;
				setFormData((prevData) => ({
					...prevData,
					[fieldName]: value,
					["population"]: "",
				}));

				//showPopulations(parentCode);
				setIsSelected(true);
			} else {
				if (event.target.type === "number") {
					value = parseInt(value);
				}
				setFormData((prevData) => ({
					...prevData,
					[fieldName]: value,
				}));
				//setIsSelected(false);
			}
			// setFormData((prevData) => ({
			// 	...prevData,
			// 	[fieldName]: value,
			// }));
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

		return (
			<>
				<form onSubmit={handleSubmit}>
					<div className="container shadow-sm shadow-slate-100 rounded-sm border border-gray-200 p-4 sm:my-4 sm:max-w-3xl dark:border-slate-700 dark:shadow-slate-700 dark:bg-gray-900">
						<div className="flex flex-wrap gap-4 md:gap-0 -mx-3 mb-6 ">
							<div className="w-full md:w-1/2 px-3 ">
								<Label htmlFor="grid-first-name">First Name:</Label>
								<Input
									inputRefs={inputRefs}
									name="firstName"
									id="grid-first-name"
									type="text"
									placeholder="First name"
									value={formData.firstName}
									errorState={isErrorsState.firstName}
									onChange={(e) => handleOnChange(e, "firstName")}
									editMode={editMode}
									required={true}
								/>
								{isErrors.firstName && <ErrorComponent error={isErrors.firstName} />}
							</div>
							<div className="w-full md:w-1/2 px-3">
								<Label htmlFor="grid-last-name">Last Name:</Label>
								<Input
									name="lastName"
									id="grid-last-name"
									placeholder="Last Name"
									value={formData.lastName}
									errorState={isErrorsState.lastName}
									onChange={(e) => handleOnChange(e, "lastName")}
									editMode={editMode}
									required={true}
								/>
								{isErrors.lastName && <ErrorComponent error={isErrors.lastName} />}
							</div>
						</div>
						{/* TODO ------------- */}
						<div className="flex flex-wrap gap-2 md:gap-0 -mx-3 mb-6">
							{/* TODO PROVINCES */}
							<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<Label htmlFor="grid-state">State / Provinces</Label>
								<div className="relative">
									<select
										name="state"
										id="grid-state"
										className={`block appearance-none w-full ${
											editMode ? "bg-white" : "bg-gray-200"
										} border border-gray-200 text-gray-700 h-10 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
										disabled={editMode ? false : true}
										onChange={(e) => handleOnChange(e, "parent_code")}
										value={formData.locations[0]?.parent_code || ""}
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
								<Label htmlFor="grid-population">Populations</Label>
								<div className="relative">
									<select
										name="population"
										id="grid-population"
										className={`block appearance-none w-full ${
											isSelected ? "bg-white" : "bg-gray-200"
										} border border-gray-200 text-gray-700 h-10 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
										value={formData.locations[0]?.population || ""}
										onChange={(e) => handleOnChange(e, "population")}
										disabled={!isSelected}
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
											<option disabled value={formData.locations[0]?.population || "Choose a Population"}>
												{formData.locations[0]?.population || "Choose a Population"}
											</option>
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
								<Label htmlFor="grid-zip">Zip code</Label>
								<Input
									name="zip"
									id="grid-zip"
									type="number"
									placeholder="90210"
									value={formData.zip}
									errorState={isErrorsState.zip}
									onChange={(e) => handleOnChange(e, "zip")}
									editMode={editMode}
									required={false}
								/>
								{isErrors.zip && <ErrorComponent error={isErrors.zip} />}
							</div>
						</div>
					</div>
				</form>
				<Backdrop />
			</>
		);
	};

	try {
		if (!isError) {
			return (
				<DetailView
					//data={companyData}
					isData={isData}
					//dataProvinces={dataProvinces}
					//dataPopulations={dataPopulations}
				/>
			);
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
	} catch (error) {
		console.error(error);
	}
}

export default FormCompany;
