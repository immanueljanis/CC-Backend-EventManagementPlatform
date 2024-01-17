import * as TransactionController from "../controllers/TransactionController"
import express, { Router } from "express"
import { tokenVerifyTransaction } from "@/middlewares/tokenVerify"

const router: Router = express.Router()

router.get("/", tokenVerifyTransaction, TransactionController.getAlltransaction)
router.get("/:id", TransactionController.getTransactionById)
router.get("/user", TransactionController.getTransactionByIsLogin)
router.post("/:event_id", tokenVerifyTransaction, TransactionController.createTransaction)

export default router