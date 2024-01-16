import * as EventController from "../controllers/EventController"
import express, { Router } from "express"

const router: Router = express.Router()

router.get("/", EventController.getAllEvent)
router.get("/:id", EventController.getEventById)
router.post("/", EventController.createEvent)
router.delete("/:id", EventController.deleteEventById)

export default router