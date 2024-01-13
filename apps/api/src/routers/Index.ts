import express, { Router } from "express"

const router = Router()
router.use(express.json())

import AdminRouter from "./AdminRouter"
import UserRouter from "./UserRouter"

router.use("/api/admin", AdminRouter)
router.use("/api/user", UserRouter)

export default router