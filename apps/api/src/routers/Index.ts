import express, { Router } from "express"

const router = Router()
router.use(express.json())

import AdminRouter from "./AdminRouter"

router.use("/api/admin", AdminRouter)

export default router