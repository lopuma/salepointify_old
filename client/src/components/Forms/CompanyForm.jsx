"use client";
import { Form, FormContainer, FormGroup, FormField } from "../UI/Form/page";
import { InputComponent } from "@/components/UI/Input/page";
import { LabelComponent } from "@/components/UI/Label/page";
import { ButtonComponent } from "@/components/UI/Button/page";
import { TextareaComponent } from "@/components/UI/Textarea/page";
import { SelectProvinces, SelectPopulation, Zip } from "@/components/Locations/page";
import { LoaderOval } from "@/components/Loaders/page";
import { ErrorComponent, ErrorValidation } from "@/components/Errors/page";
import useField from "@/app/hooks/useField";
import useSelect from "@/app/hooks/useSelect";
import useForm from "@/app/hooks/useForm";
import useCompany from "@/app/hooks/useCompany";

export default function CompanyForm() {
	const { formData, handleSubmit, handleEdit, handleCancel, editMode, isSubmitting, errorsValidation } = useForm();
	const { isError } = useCompany();

	if (isError) {
		const customError = {
			status: isError.status,
			label: isError.label,
			message: isError.message,
		};
		return <ErrorComponent customError={customError} />;
	}

	if (!formData) {
		return null;
	}

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
					<FormField cols={"50%"}>
						<LabelComponent htmlFor="firstName">First Name:</LabelComponent>
						<InputComponent {...firstName} required />
						<ErrorValidation message={errorsValidation?.firstName} />
					</FormField>
					<FormField cols={"50%"}>
						<LabelComponent htmlFor="lastName">Last Name:</LabelComponent>
						<InputComponent {...lastName} required />
						<ErrorValidation message={errorsValidation?.lastName} />
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField cols={"66%"}>
						<LabelComponent htmlFor="companyName">Company Name:</LabelComponent>
						<InputComponent {...companyName} required={true} />
						<ErrorValidation message={errorsValidation?.companyName} />
					</FormField>
					<FormField cols={"33%"}>
						<LabelComponent htmlFor="CIF">CIF:</LabelComponent>
						<InputComponent {...CIF} />
						<ErrorValidation message={errorsValidation?.CIF} />
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField cols={"50%"}>
						<LabelComponent htmlFor="phone">Phone</LabelComponent>
						<InputComponent {...phone}></InputComponent>
					</FormField>
					<FormField cols={"50%"}>
						<LabelComponent htmlFor="website">Website</LabelComponent>
						<InputComponent {...website}></InputComponent>
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField cols={"100%"} className={"flex flex-col md:flex-row gap-2"}>
						<SelectProvinces {...province} />
						<SelectPopulation {...population} />
						<Zip></Zip>
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField cols={"33%"}>
						<LabelComponent htmlFor="industry">Industry</LabelComponent>
						<InputComponent {...industry}></InputComponent>
					</FormField>
					<FormField cols={"33%"}>
						<LabelComponent htmlFor="founded">Founded</LabelComponent>
						<InputComponent {...founded}></InputComponent>
					</FormField>
					<FormField cols={"33%"}>
						<LabelComponent htmlFor="employees">Employees</LabelComponent>
						<InputComponent {...employees}></InputComponent>
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField cols={"100%"}>
						<LabelComponent htmlFor="description">Description</LabelComponent>
						<TextareaComponent {...description}></TextareaComponent>
					</FormField>
				</FormGroup>
				<FormGroup>
					<FormField cols={"100%"} className="flex place-content-end md:min-h-[auto] md:mt-6">
						{!editMode ? (
							isSubmitting ? (
								<ButtonComponent text="Submitting" loader={<LoaderOval type="button" intent="primary" />} />
							) : (
								<div className="flex gap-4">
									<ButtonComponent type="button" intent="secondary" onClick={handleCancel}>
										Cancel
									</ButtonComponent>
									<ButtonComponent type="submit" intent="primary">
										Submit
									</ButtonComponent>
								</div>
							)
						) : (
							<ButtonComponent type="button" onClick={handleEdit} intent="primary">
								Edit
							</ButtonComponent>
						)}
					</FormField>
				</FormGroup>
			</FormContainer>
		</Form>
	);
}
