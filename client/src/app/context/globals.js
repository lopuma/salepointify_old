import axios from "axios";

const checkUrlAvailability = async (url) => {
	try {
		const response = await axios.head(url, { timeout: 3000 });
		return response.status === 200;
	} catch {
		console.error("The requested URL could not be accessed. Please verify the address and try again later.");
		return false;
	}
};

export default checkUrlAvailability;
