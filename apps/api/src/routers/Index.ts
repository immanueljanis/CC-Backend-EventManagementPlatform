import express, { Router } from "express"

const router = Router()
router.use(express.json())

import AdminRouter from "./AdminRouter"
import UserRouter from "./UserRouter"
import CategoryRouter from "./CategoryRouter"
import EventRouter from "./EventRouter"
import OrganizerROuter from "./OrganizerRouter"

router.use("/api/admin", AdminRouter)
router.use("/api/user", UserRouter)
router.use("/api/category", CategoryRouter)
router.use("/api/event", EventRouter)
router.use("/api/organizer", OrganizerROuter)

export default router