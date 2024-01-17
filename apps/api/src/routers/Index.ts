import express, { Router } from "express"

const router = Router()
router.use(express.json())

import AdminRouter from "./AdminRouter"
import UserRouter from "./UserRouter"
import CategoryRouter from "./CategoryRouter"
import EventRouter from "./EventRouter"
import OrganizerRouter from "./OrganizerRouter"
import TransactionRouter from "./TransactionRouter"

router.use("/api/admin", AdminRouter)
router.use("/api/user", UserRouter)
router.use("/api/category", CategoryRouter)
router.use("/api/event", EventRouter)
router.use("/api/organizer", OrganizerRouter)
router.use("/api/transaction", TransactionRouter)

export default router