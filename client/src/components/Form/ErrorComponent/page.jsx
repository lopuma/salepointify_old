const ErrorComponent = ({ error, className }) => {
    const defaultClassName = "text-xs text-red-500 italic"
	return error ? <p className={className ? className : defaultClassName}>{error}</p> : null;
};
export default ErrorComponent;
