"use client";
import axios from "axios";
import config from "@/app/config";
const API_BASE_URL = config.API_BASE_URL;

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

export function getLocations(url) {
	const URL = `${API_BASE_URL}/${url}`;
	try {
		const promise = axios.get(URL);
		return getSuspender(promise);
	} catch (e) {
		console.error("There was a problem with the axios request: " + e.message);
		throw new Error("There was a problem with the axios request: " + e.message);
	}
}
