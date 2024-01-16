import express, { Router } from "express"

const router = Router()
router.use(express.json())

import AdminRouter from "./AdminRouter"
import UserRouter from "./UserRouter"
import CategoryRouter from "./CategoryRouter"
import EventRouter from "./EventRouter"

router.use("/api/admin", AdminRouter)
router.use("/api/user", UserRouter)
router.use("/api/category", CategoryRouter)
router.use("/api/event", EventRouter)

export default router