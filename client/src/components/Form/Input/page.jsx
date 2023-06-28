"use client";
import { useRef, useEffect } from "react";

const Input = ({
	valueRef,
	id,
	type,
	placeholder,
	value,
	handleRefRegister,
	editMode,
	onChange,
	className,
	errorState,
	required,
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		handleRefRegister(valueRef, inputRef.current);
	}, [inputRef]);

	const inputClassName = `appearance-none block w-full ${
		editMode ? "bg-white" : "bg-gray-200 cursor-not-allowed"
	} text-gray-700 border ${
		errorState ? "border-red-500 dark:ring dark:ring-red-400 dark:border-red-300" : null
	} rounded-md py-3 px-4 focus:outline-0 focus:ring focus:ring focus:border-cyan-700 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-sky-700 dark:focus:border-sky-600`;
	return (
		<input
			ref={inputRef}
			className={className ? className : inputClassName}
			id={id}
			type={type || "text"}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			readOnly={!editMode}
			required={required}
		/>
	);
};

export default Input;
