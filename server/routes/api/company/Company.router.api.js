import { Router } from "express";
import { debug } from "../../../utils.js";
const routerCompany = Router();

let companyData = {
	id: "0001",
	firstName: "Jose",
	lastName: "Cedeño",
	companyName: "Corporacion",
	CIF: "00001",
	industry: "Manufacturing",
	founded: "1990",
	employees: 5000,
	phone: "555555555",
	website: "www.acmecorp.com",
	description:
		"Acme Corporation is a leading manufacturing company specializing in the production of high-quality widgets. With over 30 years of experience, Acme has established itself as an industry leader, providing innovative solutions to clients worldwide.",
	locations: [
		{
			parent_code: 20,
			state: "Gipuzkoa",
			population: "Donostia/San Sebastián",
			zip_code: "20017",
		},
	],
};

const getCompany = (req, res) => {
	res.status(200).json(companyData);
};

const postCompany = (req, res) => {
	const {
		firstName,
		lastName,
		companyName,
		CIF,
		phone,
		website,
		industry,
		founded,
		employees,
		description,
		locations,
	} = req.body;

	debug({
		firstName,
		lastName,
		companyName,
		CIF,
		phone,
		website,
		industry,
		founded,
		employees,
		description,
		locations,
	});

	companyData.firstName = firstName;
	companyData.lastName = lastName;
	companyData.companyName = companyName;
	companyData.CIF = CIF;
	companyData.phone = phone;
	companyData.website = website;
	companyData.industry = industry;
	companyData.founded = founded;
	companyData.employees = employees;
	companyData.description = description;
	companyData.locations = locations;
	res.status(201).json({
		success: true,
		message: "Company data updated",
		data: companyData,
	});
};

routerCompany.get("/", getCompany);
routerCompany.post("/", postCompany);

export default routerCompany;
