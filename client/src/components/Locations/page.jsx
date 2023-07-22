import { getLocations } from "@/app/services/fetchDataLocations";
import { LabelComponent } from "../UI/Label/page";
import { FormField } from "../UI/Form/page";
import { InputComponent } from "../UI/Input/page";
import { SelectComponent } from "../UI/Select/page";
import useField from "@/app/hooks/useField";
import useForm from "@/app/hooks/useForm";
import { useQuery } from "react-query";
const apiDataProvinces = getLocations("locations/provinces");

const colors = {
	color: "var(--primary)",
};

export const SelectProvinces = ({ name, editMode, value, onChange }) => {
	const { data: dataProvinces } = useQuery("dataProvinces", () => apiDataProvinces.read());
	return (
		<FormField columns={"33%"} className={"px-0 md:pr-3"}>
			<LabelComponent htmlFor={name}>State / Provinces</LabelComponent>
			<div className="relative">
				<select
					name={name}
					id={name}
					className={`block appearance-none w-full ${
						!editMode ? "bg-white " : "bg-gray-200 cursor-not-allowed"
					} border border-gray-200 text-gray-700 h-10 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
					disabled={editMode}
					onChange={onChange}
					value={value}
				>
					{dataProvinces?.map(({ label, code }) => {
						return (
							<option key={label} value={code}>
								{label}
							</option>
						);
					})}
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
					<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={colors}>
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</div>
			</div>
		</FormField>
	);
};

export const SelectPopulation = ({ name, editMode, value, onChange, disabled }) => {
	const { selectedPopulation } = useForm();
	return (
		<FormField columns="33%" className={"px-0"}>
			<LabelComponent htmlFor={"population"}>Populations</LabelComponent>
			<div className="relative">
				<SelectComponent name={name} editMode={editMode} onChange={onChange} disabled={disabled} value={value}>
					{disabled ? (
						selectedPopulation?.map(({ label }) => {
							return (
								<option key={label} value={label}>
									{label}
								</option>
							);
						})
					) : (
						<option disabled value={value}>
							{value}
						</option>
					)}
				</SelectComponent>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
					<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={colors}>
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</div>
			</div>
		</FormField>
	);
};

export const Zip = () => {
	const zip = useField({
		name: "zip_code",
		type: "number",
	});
	return (
		<FormField columns="33%" className={"px-0 md:pl-3"}>
			<LabelComponent htmlFor={"zip_code"}>Zip</LabelComponent>
			<InputComponent {...zip}></InputComponent>
		</FormField>
	);
};
