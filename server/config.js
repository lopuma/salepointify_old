import { config } from "dotenv";
import { resolve } from "path";

if (process.env.NODE_ENV === "development") {
	config({
		path: resolve(process.env.NODE_ENV + ".env"),
	});
} else {
	config({
		path: resolve(".env"),
	});
}

export const PORT = process.env.PORT || 3001;
