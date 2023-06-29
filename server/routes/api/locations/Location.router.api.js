import { Router } from "express";

const router =  Router()

export const getProvince = router.get('/', (req, res) => {
    res.status(200).json({provincia: "juarez"})
})