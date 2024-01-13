import express, { Router } from "express"

const router = Router()
router.use(express.json())

import AdminRouter from "./AdminRouter"
import UserRouter from "./UserRouter"
import CategoryRouter from "./CategoryRouter"

router.use("/api/admin", AdminRouter)
router.use("/api/user", UserRouter)
router.use("/api/category", CategoryRouter)


export default router