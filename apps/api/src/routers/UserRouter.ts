import * as UserController from "../controllers/UserController"
import express, { Router } from "express"

const router: Router = express.Router()

router.get("/", UserController.getAllUser)
router.get("/:id", UserController.getUserById)
router.put("/:id", UserController.updateUserById)
router.post("/", UserController.createUser)
router.delete("/:id", UserController.deleteUserById)

router.post("/login", UserController.userLogin)

export default router