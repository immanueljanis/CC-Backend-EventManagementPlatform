import * as TransactionController from "../controllers/TransactionController"
import express, { Router } from "express"
import { tokenVerifyTransaction, tokenVerifyUser } from "@/middlewares/tokenVerify"

const router: Router = express.Router()

router.get("/", tokenVerifyTransaction, TransactionController.getAlltransaction)
router.get("/:id", TransactionController.getTransactionById)
router.post("/user", tokenVerifyUser, TransactionController.getTransactionByIsLogin)
router.post("/", tokenVerifyUser, TransactionController.createTransaction)

export default router