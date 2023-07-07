import { GET_COMPANY } from "../types";

export default (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case GET_COMPANY:
			console.log("si hace? ", payload[0]);
			return {
				...state,
				companyData: payload,
			};
		default:
			return state;
	}
};
