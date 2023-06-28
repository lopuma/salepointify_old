const express = require("express");
const morgan = require("morgan");
const _log = require("./utils.js");
const config = require("./config.js");
const cors = require("cors");
const configCors = require("./configCors");

const PORT = config.PORT;

const app = express();

// 1 - midlelware
app.use(morgan("dev"));

// 2 - Usamos Cors
app.use(cors(configCors.application.cors.server));

// 3 - Manejar JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let companyName = "Corporacion";

app.post("/api", (req, res) => {
	const { firstName, lastName, companyName } = req.body;
	console.log({ firstName, lastName, companyName })
	res.status(201).json({
		success: true,
		message: "Update Company name",
	});
});

app.get("/api", (req, res) => {
	res.json([
		{   
            firstName: "Jose",
            lastName: "Cedeño",
			companyName,
            CIF:"00001",
			industry: "Manufacturing",
			founded: "1990",
			employees: 5000,
			website: "www.acmecorp.com",
			description:
				"Acme Corporation is a leading manufacturing company specializing in the production of high-quality widgets. With over 30 years of experience, Acme has established itself as an industry leader, providing innovative solutions to clients worldwide.",
			locations: [
				{
					name: "Headquarters",
					address: "123 Main Street, New York, USA",
				}
			],
		},
	]);
});

function startServer(port) {
	app
		.listen(port, () => {
			const host = "0.0.0.0"; // Cambia esto a tu hostname deseado si no es 0.0.0.0
			const appUrl = `http://localhost:${port}`;

			_log.ready(` started server on ${host}:${port}, url: ${appUrl}`);
		})
		.on("error", (err) => {
			if (err.code === "EADDRINUSE") {
				_log.warn(`Port ${port} is in use, trying ${port + 1} instead.`);
				startServer(port + 1);
			} else {
				console.error(err);
			}
		});
}

startServer(PORT);
