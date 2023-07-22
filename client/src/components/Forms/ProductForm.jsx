"use client";
import React, { useState } from "react";
import { Form, FormContainer, FormField, FormGroup } from "@/components/UI/Form/page";
import { InputComponent } from "@/components/UI/Input/page";
import { LabelComponent } from "@/components/UI/Label/page";
import { ErrorComponent } from "@/components/Errors/page";
function ProductForm() {
	const initialData = [
		{
			nameProduct: "",
			price: 0,
		},
	];
	const [value, setValue] = useState("");
	const [validation, setValidation] = useState(false);
	const [formData, setFormData] = useState(initialData);
	const useField = ({ name, type, placeholder, formData, setFormData, ...props }) => {
		///const { formData, errorState, editMode, handleChange } = useForm();
		const onChange = (event) => {
			//handleChange(event);
			let { name, value } = event.target;
			if (value.length < 4) {
				setValidation(true);
			} else {
				setValidation(false);
				console.log({ name, value });
				setValue(event.target.value);
				setFormData((prevData) => ({
					...prevData,
					[name]: value,
				}));
			}
		};
		console.log({ name, type, placeholder, ...props });
		return {
			id: name,
			placeholder: placeholder || name,
			name,
			type,
			value: formData[name],
			onChange,
			...props,
		};
	};
	const price = useField({
		name: "price",
		editMode: false,
		errorState: false, // me marca el input de rojo si es true
		formData: formData,
		setFormData: setFormData,
	});
	const nameProduct = useField({
		name: "nameProduct",
		editMode: false,
		errorState: false, // me marca el input de rojo si es true
		formData: formData,
		setFormData: setFormData,
	});
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(value);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormContainer>
				<FormGroup>
					<FormField cols={"50%"}>
						<LabelComponent htmlFor={"nameProduct"}>Product name: </LabelComponent>
						<InputComponent {...nameProduct}></InputComponent>
						{validation ? <ErrorComponent errorValidation={"name produc menor"} /> : null}
					</FormField>
					<FormField cols={"50%"}>
						<LabelComponent htmlFor={"price"}>Product name: </LabelComponent>
						<InputComponent {...price}></InputComponent>
					</FormField>
				</FormGroup>
			</FormContainer>
		</Form>
	);
}

export default ProductForm;
