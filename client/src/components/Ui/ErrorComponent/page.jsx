const ErrorComponent = ({ error, className }) => {
	const defaultClassName = "mt-2 text-xs text-never-foreground dark:text-never italic";
	return error ? <p className={className ? className : defaultClassName}>{error}</p> : null;
};
export default ErrorComponent;
