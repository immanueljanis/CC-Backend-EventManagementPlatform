import * as UserController from "../controllers/UserController"
import express, { Router } from "express"
import { tokenVerifyUser } from "@/middlewares/tokenVerify"

const router: Router = express.Router()

router.get("/", UserController.getAllUser)
router.get("/:id", UserController.getUserById)
router.put("/:id", UserController.updateUserById)
router.post("/", UserController.createUser)
router.delete("/:id", UserController.deleteUserById)

router.post("/login", UserController.userLogin)
router.post("/keep-login", tokenVerifyUser, UserController.userKeepLogin)

export default router