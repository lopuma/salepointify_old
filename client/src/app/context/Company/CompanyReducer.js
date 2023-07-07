import { GET_COMPANY } from "../types";

export default (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case GET_COMPANY:
			console.log("si ahce?");
			return {
				...state,
				companyData: payload,
			};
		default:
			return state;
	}
};
