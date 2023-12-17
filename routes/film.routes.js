import { Router } from "express"

import {
  createFilm,
  getAllFilm,
  getFilm,
  getFilmByCategorie,
  getFilmByTitle,
  getCategorieByFilm,
  removeFilm,
  updateFilm,
} from "../controllers/film.controller.js"

const Films = () => {
  const router = Router()
  router.get("/", getAllFilm)
  router.post("/", createFilm)
  router.get("/:id", getFilm)
  router.get("/bycategorie/:categorieId", getFilmByCategorie)
  router.get("/byfilm/:filmId", getCategorieByFilm)
  router.patch("/:id", updateFilm)
  router.delete("/:id", removeFilm)
  

  return router
}

export default Films
