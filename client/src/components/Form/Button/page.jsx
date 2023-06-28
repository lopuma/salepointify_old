const defaultCustom = "bg-blue-500 text-white hover:bg-gray-400";

const Button = ({ text, className, loader, onClick }) => (
    <button 
        className={`font-bold py-2 px-4 rounded inline-flex items-center ${className ? className  : defaultCustom}`}
        onClick={onClick ?? onClick}
    >
		{loader ?? loader}
		<span className="mx-2">{text}</span>
	</button>
);

export default Button;