import * as AdminController from "../controllers/AdminController"
import express, { Router } from "express"

const router: Router = express.Router()

router.get("/", AdminController.getAdminById)
router.post("/", AdminController.createAdmin)
router.delete("/", AdminController.deleteAdminById)
router.put("/", AdminController.updateAdminById)


export default router