import { Router } from "express";
import fs from "fs/promises";

const routerPopulations = Router();

const populationsFile = new URL("../../../json/populations.json", import.meta.url);

const getPopulations = async (req, res) => {
	try {
		const data = await fs.readFile(populationsFile, "utf-8");
		const populations = JSON.parse(data);
		res.status(200).json(populations);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error getting the populations" });
	}
};

const getPopulation = async (req, res) => {
	try {
		const parentCode = req.params.parentCode;
		const data = await fs.readFile(populationsFile, "utf-8");
		const populations = JSON.parse(data);
		const result = populations.filter((population) => population.parent_code === parentCode);
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener la población" });
	}
};

routerPopulations.get("/", getPopulations);
routerPopulations.get("/:parentCode", getPopulation);

export default routerPopulations;
