import { Router } from "express";
import fs from "fs/promises";

const routerProvinces = Router();

const provincesFile = new URL("../../../json/provinces.json", import.meta.url);

const getProvinces = async (req, res) => {
	try {
		const data = await fs.readFile(provincesFile, "utf-8");
		const provinces = JSON.parse(data);
		res.status(200).json(provinces);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error getting the provinces" });
	}
};

routerProvinces.get("/", getProvinces);

export default routerProvinces;
