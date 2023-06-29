import express, { json } from "express";
import morgan from "morgan";
import { ready, warn } from "./utils.js";
import { PORT as _PORT } from "./config.js";
import cors from "cors";
import configCors from "./configCors.js";
import * as routerCompany from "./routes/api/company/Company.router.api.js";
import * as locations from "./routes/api/locations/Location.router.api.js"
const PORT = _PORT;

const app = express();

// 1 - Usamos Cors
app.use(cors(configCors.cors.server));

// 2 - midlelware
app.use(morgan("dev"));

// 3 - Manejar JSON
app.use(json());

// 4 - Router
app.use("/api/company", routerCompany.getCompany);
app.use("/api/company", routerCompany.createCompany);
app.use("/api/locations",locations.getProvince)

app.post("/api", (req, res) => {
	const { firstName, lastName, companyName } = req.body;
	console.log({ firstName, lastName, companyName });
	res.status(201).json({
		success: true,
		message: "Update Company name",
	});
});

app.use((req, res) => {
	res.status(404).json({
		error: "Not found",
	});
});

function startServer(port) {
	app
		.listen(port, () => {
			const host = "0.0.0.0";
			const appUrl = `http://localhost:${port}`;

			ready(` started server on ${host}:${port}, url: ${appUrl}`);
		})
		.on("error", (err) => {
			if (err.code === "EADDRINUSE") {
				warn(`Port ${port} is in use, trying ${port + 1} instead.`);
				startServer(port + 1);
			} else {
				console.error(err);
			}
		});
}

startServer(PORT);
