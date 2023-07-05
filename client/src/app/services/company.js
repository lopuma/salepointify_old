import axios from "axios";
import config from "@/app/config";
const API_BASE_URL = config.API_BASE_URL;
const companyUrl = `${API_BASE_URL}/company`;
import checkUrlAvailability from "../context/globals";

export const allCompanyData = async () => {
	const isAvailable = await checkUrlAvailability(companyUrl);
	if (isAvailable) {
		try {
			const response = await axios.get(companyUrl);
			const company = await response.data;
			return company;
		} catch (e) {
			console.error("Network response OK but HTTP response not OK");
			throw new Error("Network response OK but HTTP response not OK");
		}
	} else {
		console.error("The url is not available");
		throw new Error("The url is not available");
	}
};
