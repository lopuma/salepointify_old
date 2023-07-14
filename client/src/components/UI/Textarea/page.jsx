export const TextareaComponent = ({ editMode, value, name, placeholder, onChange }) => {
	return (
		<textarea
			name={name}
			id={name}
			rows="4"
			className={`block p-2.5 w-full text-sm text-gray-900 ${
				!editMode ? " bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"
			} rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			readOnly={editMode}
		></textarea>
	);
};
