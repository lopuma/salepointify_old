import { Router } from "express";
const router = Router();

let companyName = "Corporacion";

export const getCompany = router.get("/", (req, res) => {
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
                    name: "Headquarters",
                    address: "123 Main Street, New York, USA",
                },
            ],
        },
    ]);
});

export const createCompany = router.post("/", (req, res) => {
    const { firstName, lastName, companyName } = req.body;
    console.log({ firstName, lastName, companyName });
    res.status(201).json({
        success: true,
        message: "Update Company name",
    });
});