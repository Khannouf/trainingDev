import { Router } from "express"

import {
  createCategory,
  getAllCategories,
  getCategory,
  removeCategory,
  updateCategory,
} from "../controllers/category.controller.js"

const Categories = () => {
  const router = Router()
  router.get("/", getAllCategories)
  router.post("/", createCategory)
  router.get("/:id", getCategory)
  router.patch("/:id", updateCategory)
  router.delete("/:id", removeCategory)

  return router
}

export default Categories
