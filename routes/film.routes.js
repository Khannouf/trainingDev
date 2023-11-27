import { Router } from "express"
import { getAllFilm, getFilm, createFilm, updateFilm, removeFilm } from "../controllers/film.controller.js"

const Films = () => {
  const router = Router()
  router.get("/", getAllFilm)
  router.get("/:id", getFilm)
  router.post("/create", createFilm)
  router.patch("/update/:id", updateFilm)
  router.delete("/delete/:id", removeFilm)

  return router
}

export default Films
