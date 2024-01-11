import * as AdminController from "../controllers/AdminController"
import express, { Router } from "express"

const router: Router = express.Router()

router.get("/", AdminController.getAllAdmin)
router.post("/", AdminController.createAdmin)

router.get("/test", AdminController.testApi)


export default router