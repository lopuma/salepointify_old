"use client";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
	const { isError } = useCompany();
	const DetailView = useMemo(() => {
		const InnerDetailView = () => {
			const { isError, postData, getCompany, setIsDataCompanyUpdated } = useCompany();
			const [editMode, setEditMode] = useState(false);
			const [formData, setFormData] = useState(null);
			const { dataProvinces, dataPopulations } = useLocations();
			const { capitalizeWords, validate } = useForms();
			const [isErrorsState, setIsErrorsState] = useState(null);
			const [isSubmitting, setIsSubmitting] = useState(false);
			const inputRefs = useRef([]);
			const [isErrors, setIsErrors] = useState(null);
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
			const [selectedPopulation, setSelectedPopulation] = useState([]);
			const [currentFormData, setCurrentFormData] = useState(null);
			const colors = {
				color: "var(--primary)",
			};

			useEffect(() => {
				setIsDataProvinces(dataProvinces);
				setIsDataPopulations(dataPopulations);
			}, []);

			useEffect(() => {
				const fetchData = async () => {
					const data = await getCompany();
					setFormData(data[0]);
				};

				fetchData();
			}, []);

			useEffect(() => {
				try {
					const firstNameInput = inputRefs.current["firstName"];
					firstNameInput.focus();
				} catch (e) {}
			}, []);

			const showPopulations = (parent_code) => {
				const result = isDataPopulations.filter((population) => population.parent_code === parent_code);
				setSelectedPopulation(result);
			};

			const handleChange = useCallback((event) => {
				let { name, value, required } = event.target;
				let parentCode = "";

				if (name === "companyName" && name !== "parent_code" && name !== "population") {
					value = value.toUpperCase();
				} else {
					value = capitalizeWords(value);
				}
				if (name === "parent_code") {
					parentCode = value;
					setFormData((prevData) => ({
						...prevData,
						locations: [
							{
								...prevData.locations[0],
								[name]: value,
							},
						],
					}));

					showPopulations(parentCode);
					setIsSelected(true);
				} else if (name === "population" || name === "zip") {
					setFormData((prevData) => ({
						...prevData,
						locations: [
							{
								...prevData.locations[0],
								[name]: value,
							},
						],
					}));
				} else {
					if (event.target.type === "number") {
						value = parseInt(value);
					}
					setFormData((prevData) => ({
						...prevData,
						[name]: value,
					}));
				}
				setIsErrors((prevErrors) => ({
					...prevErrors,
					[name]: "",
				}));
				setIsErrorsState((prevErrors) => ({
					...prevErrors,
					[name]: false,
				}));
				setIsRequired((preRequired) => ({
					...preRequired,
					[name]: required,
				}));
			}, []);

			const valuesAllInputs = (e) => {
				const selectState = document.getElementById("grid-state");
				const index = selectState.selectedIndex;
				const locations = {
					parent_code: formData.locations[0]?.parent_code,
					state: selectState.options[index].text,
					population: formData.locations[0]?.population,
					zip: formData.locations[0]?.zip,
				};

				const data = {
					CIF: formData.CIF,
					companyName: formData.companyName,
					description: formData.description,
					employees: formData.employees,
					firstName: formData.firstName,
					founded: formData.founded,
					industry: formData.industry,
					lastName: formData.lastName,
					locations: [locations],
				};

				return data;
			};

			const handleSubmit = (event) => {
				event.preventDefault();
				const data = valuesAllInputs();
				setIsSubmitting(true);
				setTimeout(() => {
					postData(data);
					setEditMode(false);
					setIsSelected(false);
					setIsDataCompanyUpdated(true);
				}, 2000);
			};

			const handleCancel = () => {
				setEditMode(false);
				setIsSelected(false);
				setIsSubmitting(false);
				setFormData(currentFormData);
			};

			const handleEdit = () => {
				setCurrentFormData(Object.assign({}, formData));
				setIsSubmitting(false);
				setEditMode(true);
			};

			if (!formData) {
				return null;
			}

			return (
				<>
					<form onSubmit={handleSubmit}>
						<div className="container shadow-sm shadow-slate-100 rounded-sm border border-gray-200 p-4 sm:my-4 sm:max-w-3xl dark:border-slate-700 dark:shadow-slate-700 dark:bg-gray-900">
							<div className="flex flex-wrap gap-4 md:gap-0 -mx-3 mb-6 ">
								<div className="w-full md:w-1/2 px-3 ">
									<label htmlFor="grid-first-name">First Name:</label>
									<Input
										inputRefs={inputRefs}
										name="firstName"
										id="grid-first-name"
										type="text"
										placeholder="First name"
										value={formData.firstName}
										errorState={isErrorsState?.firstName}
										onChange={handleChange}
										editMode={editMode}
										required={true}
									/>
									{isErrors?.firstName && <ErrorComponent error={isErrors?.firstName} />}
								</div>
								<div className="w-full md:w-1/2 px-3">
									<Label htmlFor="grid-last-name">Last Name:</Label>
									<Input
										name="lastName"
										id="grid-last-name"
										placeholder="Last Name"
										value={formData.lastName}
										errorState={isErrorsState?.lastName}
										onChange={handleChange}
										editMode={editMode}
										required={true}
									/>
									{isErrors?.lastName && <ErrorComponent error={isErrors?.lastName} />}
								</div>
							</div>
							<div className="flex flex-wrap gap-4 md:gap-0 -mx-3 mb-6">
								<div className="w-full md:w-3/4 px-3">
									<Label htmlFor="grid-company-name">Company Name:</Label>
									<Input
										name="companyName"
										id="grid-company-name"
										placeholder="Company Name"
										value={formData.companyName}
										errorState={isErrorsState?.companyName}
										onChange={handleChange}
										editMode={editMode}
										required={true}
										key="companyName"
									/>
									{isErrors?.companyName && <ErrorComponent error={isErrors?.companyName} />}
								</div>
								<div className="w-full md:w-1/4 px-3">
									<Label htmlFor="grid-cif">CIF:</Label>
									<Input
										name="CIF"
										id="grid-cif"
										placeholder="B12345678"
										value={formData.CIF}
										errorState={isErrorsState?.CIF}
										onChange={handleChange}
										editMode={editMode}
									/>
									{isErrors?.CIF && <ErrorComponent error={isErrors?.CIF} />}
								</div>
							</div>
							{/* TODO ------------- */}
							<div className="flex flex-wrap gap-2 md:gap-0 -mx-3 mb-6">
								{/* TODO PROVINCES */}
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<Label htmlFor="grid-state">State / Provinces</Label>
									<div className="relative">
										<select
											name="parent_code"
											id="grid-state"
											className={`block appearance-none w-full ${
												editMode ? "bg-white " : "bg-gray-200 cursor-not-allowed"
											} border border-gray-200 text-gray-700 h-10 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
											disabled={editMode ? false : true}
											onChange={handleChange}
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
												isSelected ? "bg-white" : "bg-gray-200 cursor-not-allowed"
											}  ${
												!editMode ?? "cursor-not-allowed"
											} border border-gray-200 text-gray-700 h-10 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
											value={formData.locations[0]?.population || ""}
											onChange={handleChange}
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
										value={formData.locations[0]?.zip}
										errorState={isErrorsState?.zip}
										onChange={handleChange}
										editMode={editMode}
										required={false}
									/>
									{isErrors?.zip && <ErrorComponent error={isErrors?.zip} />}
								</div>
							</div>
							<div className="flex flex-wrap gap-2 md:gap-0 -mx-3 mb-2">
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<Label htmlFor="grid-industry">Industry</Label>
									<Input id="grid-industry" placeholder={"Services"}></Input>
								</div>
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<Label htmlFor="grid-founded">Founded</Label>
									<Input id="grid-founded" placeholder={"1890"}></Input>
								</div>
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<Label htmlFor="grid-employees">Employees</Label>
									<Input id="grid-employees" placeholder={"500"}></Input>
								</div>
							</div>
							<div className="flex items-end place-content-end mt-8">
								{editMode ? (
									isSubmitting ? (
										<Button text="Submitting" loader=<LoaderOval type="button" intent="primary" /> />
									) : (
										<div className="flex gap-4">
											<Button text="Submit" type="submit" intent="primary" />
											<Button text="Cancel" type="button" intent="secondary" onClick={handleCancel} />
										</div>
									)
								) : (
									<Button text="Edit" type="button" onClick={handleEdit} intent="primary" />
								)}
							</div>
						</div>
					</form>
					<Backdrop />
				</>
			);
		};
		if (!isError) {
			return <InnerDetailView />;
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
	}, []);

	return DetailView;
}

export default FormCompany;
