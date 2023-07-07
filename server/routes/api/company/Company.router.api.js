import { Router } from "express";

const routerCompany = Router();

let companyData = [
	{
		id: "0001",
		firstName: "Jose",
		lastName: "Cedeño",
		companyName: "Corporacion",
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
];

const getCompany = (req, res) => {
	console.log("se envia => ", companyData[0].companyName);
	res.status(200).json(companyData);
};

const createCompany = (req, res) => {
	const { firstName, lastName, companyName, locations } = req.body;
	console.log({ firstName, lastName, companyName, locations });
	const index = companyData.findIndex((company) => company.id === "0001");

	if (index !== -1) {
		// Si se encontró el objeto, actualizar sus propiedades con los nuevos valores
		companyData[index].firstName = firstName;
		companyData[index].lastName = lastName;
		companyData[index].companyName = companyName;
		companyData[index].locations = locations;

		res.status(201).json({
			success: true,
			message: "Company data updated",
			data: companyData,
		});
	} else {
		res.status(404).json({
			success: false,
			message: "Company not found",
		});
	}
};

routerCompany.get("/", getCompany);
routerCompany.post("/", createCompany);

export default routerCompany;
