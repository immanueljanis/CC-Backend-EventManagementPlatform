import * as OrganizerController from "../controllers/OrganizerController"
import express, { Router } from "express"

const router: Router = express.Router()

router.get("/", OrganizerController.getAllOrganizer)
router.get("/:id", OrganizerController.getOrganizerById)
router.put("/:id", OrganizerController.updateOrganizerById)
router.post("/", OrganizerController.createOrganizer)
router.delete("/:id", OrganizerController.deleteOrganizerById)

router.post("/login", OrganizerController.organizerLogin)

export default router