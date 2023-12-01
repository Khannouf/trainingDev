import { Router } from "express"

import {
  createFilm,
  getAllFilm,
  getFilm,
  getFilmByTitle,
  removeFilm,
  updateFilm,
} from "../controllers/film.controller.js"

const Films = () => {
  const router = Router()
  router.get("/", getAllFilm)
  router.post("/", createFilm)
  router.get("/:id", getFilm)
  router.patch("/:id", updateFilm)
  router.delete("/:id", removeFilm)

  return router
}

export default Films
