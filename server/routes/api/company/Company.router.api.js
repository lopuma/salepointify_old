import { Router } from "express";

const routerCompany = Router();

let companyName = "Corporacion";

const getCompany = (req, res) => {
	res.status(200).json([
		{
			firstName: "Jose",
			lastName: "Cedeño",
			companyName,
			CIF: "00001",
			industry: "Manufacturing",
			founded: "1990",
			employees: 5000,
			website: "www.acmecorp.com",
			description:
				"Acme Corporation is a leading manufacturing company specializing in the production of high-quality widgets. With over 30 years of experience, Acme has established itself as an industry leader, providing innovative solutions to clients worldwide.",
			locations: [
				{
					parent_code: 20,
					state: "Gipuzkoa",
					population: "Donostia/San Sebastián",
					zip: "20017",
				},
			],
		},
	]);
};

const createCompany = (req, res) => {
	const { firstName, lastName, companyName, locations } = req.body;
	console.log({ firstName, lastName, companyName, locations });
	res.status(201).json({
		success: true,
		message: "Update Company name",
	});
};

routerCompany.get("/", getCompany);
routerCompany.post("/", createCompany);

export default routerCompany;
