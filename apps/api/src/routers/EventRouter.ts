import * as EventController from "../controllers/EventController"
import express, { Router } from "express"
import { tokenVerifyEvent } from "@/middlewares/tokenVerify"

const router: Router = express.Router()

router.get("/", EventController.getAllEvent)
router.get("/:id", EventController.getEventById)
router.post("/", tokenVerifyEvent, EventController.createEvent)
router.delete("/:id", tokenVerifyEvent, EventController.deleteEventById)

export default router