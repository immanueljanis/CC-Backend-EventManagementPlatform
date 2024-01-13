import * as CategoryController from "../controllers/CategoryController"
import express, { Router } from "express"

const router: Router = express.Router()

router.get("/", CategoryController.getAllCategory)
router.get("/:id", CategoryController.getCategoryById)
router.put("/:id", CategoryController.updateCategoryById)
router.post("/", CategoryController.createCategory)
router.delete("/:id", CategoryController.deleteCategoryById)

export default router