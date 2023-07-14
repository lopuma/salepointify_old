"use client";
import { LoaderOval } from "@/components/Loaders/page";
import { Form, FormContainer, FormGroup, FormField } from "./page";
import { InputComponent } from "../Input/page";
import { LabelComponent } from "../Label/page";
import { ButtonComponent } from "../Button/page";
import { TextareaComponent } from "../Textarea/page";
import { ErrorComponent } from "../ErrorComponent/page";
import { SelectProvinces, SelectPopulation, Zip } from "@/components/Locations/page";
import useField from "@/app/hooks/useField";
import useSelect from "@/app/hooks/useSelect";
import useForm from "@/app/hooks/useForm";

export const FormCompany = () => {
	const { handleSubmit, handleEdit, handleCancel, editMode, isSubmitting, errorsValidation } = useForm();
	const firstName = useField({
		name: "firstName",
	});
	const lastName = useField({
		name: "lastName",
	});
	const CIF = useField({
		name: "CIF",
	});
	const phone = useField({
		name: "phone",
		type: "number",
	});
	const website = useField({
		name: "website",
	});
	const industry = useField({
		name: "industry",
	});
	const companyName = useField({
		name: "companyName",
	});
	const founded = useField({
		name: "founded",
		type: "number",
	});
	const employees = useField({
		name: "employees",
		type: "number",
	});
	const description = useField({
		name: "description",
	});
	const province = useSelect({
		name: "parent_code",
	});
	const population = useSelect({
		name: "population",
	});

	return (
		<Form onSubmit={handleSubmit}>
			<FormContainer>
				<FormGroup>
					<FormField columns={"50%"}>
						<LabelComponent htmlFor="firstName">First Name:</LabelComponent>
						<InputComponent {...firstName} required />
						<ErrorComponent errorValidation={errorsValidation?.firstName} />
					</FormField>
					<FormField columns={"50%"}>
						<LabelComponent htmlFor="lastName">Last Name:</LabelComponent>
						<InputComponent {...lastName} required />
						<ErrorComponent errorValidation={errorsValidation?.lastName} />
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField columns={"66%"}>
						<LabelComponent htmlFor="companyName">Company Name:</LabelComponent>
						<InputComponent {...companyName} required={true} />
						<ErrorComponent errorValidation={errorsValidation?.companyName} required />
					</FormField>
					<FormField columns={"33%"}>
						<LabelComponent htmlFor="CIF">CIF:</LabelComponent>
						<InputComponent {...CIF} />
						<ErrorComponent errorValidation={errorsValidation?.CIF} />
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField columns={"50%"}>
						<LabelComponent htmlFor="phone">Phone</LabelComponent>
						<InputComponent {...phone}></InputComponent>
					</FormField>
					<FormField columns={"50%"}>
						<LabelComponent htmlFor="website">Website</LabelComponent>
						<InputComponent {...website}></InputComponent>
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField columns={"100%"} className={"flex flex-col md:flex-row gap-2"}>
						<SelectProvinces {...province} />
						<SelectPopulation {...population} />
						<Zip></Zip>
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField columns={"33%"}>
						<LabelComponent htmlFor="industry">Industry</LabelComponent>
						<InputComponent {...industry}></InputComponent>
					</FormField>
					<FormField columns={"33%"}>
						<LabelComponent htmlFor="founded">Founded</LabelComponent>
						<InputComponent {...founded}></InputComponent>
					</FormField>
					<FormField columns={"33%"}>
						<LabelComponent htmlFor="employees">Employees</LabelComponent>
						<InputComponent {...employees}></InputComponent>
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField columns={"100%"}>
						<LabelComponent htmlFor="description">Description</LabelComponent>
						<TextareaComponent {...description}></TextareaComponent>
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField columns={"100%"} className="flex place-content-end ">
						{!editMode ? (
							isSubmitting ? (
								<ButtonComponent text="Submitting" loader={<LoaderOval type="button" intent="primary" />} />
							) : (
								<div className="flex gap-4">
									<ButtonComponent text="Cancel" type="button" intent="secondary" onClick={handleCancel} />
									<ButtonComponent text="Submit" type="submit" intent="primary" />
								</div>
							)
						) : (
							<ButtonComponent text="Edit" type="button" onClick={handleEdit} intent="primary" />
						)}
					</FormField>
				</FormGroup>
			</FormContainer>
		</Form>
	);
};
