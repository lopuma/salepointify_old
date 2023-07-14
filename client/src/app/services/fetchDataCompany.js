"use client";
import axios from "axios";
import config from "@/app/config";
const API_BASE_URL = config.API_BASE_URL;
const companyURL = `${API_BASE_URL}/company`;
import checkUrlAvailability from "../context/globals";

const getSuspender = (promise) => {
	let status = "pending";
	let response;
	const suspender = promise.then(
		(res) => {
			status = "success";
			response = res.data;
		},
		(err) => {
			status = "error";
			response = err;
		}
	);

	const read = () => {
		switch (status) {
			case "pending":
				throw suspender;
			case "error":
				throw response;
			default:
				return response;
		}
	};

	return { read };
};

export async function getCompanyData(url) {
	const _URL = `${API_BASE_URL}/${url}`;
	const isAvailable = await checkUrlAvailability(_URL);
	if (!isAvailable) {
		console.error(`The URL ${_URL} is not available`);
		return;
	}
	try {
		const promise = axios.get(_URL);
		return getSuspender(promise);
	} catch (e) {
		console.error("There was a problem with the axios request: " + e.message);
		throw new Error("There was a problem with the axios request: " + e.message);
	}
}

export const postCompanyData = async (data) => {
	const isAvailable = await checkUrlAvailability(companyURL);
	if (!isAvailable) {
		console.error(`The URL ${companyURL} is not available`);
		return;
	}
	try {
		const response = await axios.post(companyURL, data);
		const result = await response.data;
		return result;
	} catch (e) {
		console.error("Network response OK but HTTP response not OK");
		throw new Error("Network response OK but HTTP response not OK");
	}
};
