import { Router } from "express"

import {
  createFilm,
  getAllFilm,
  getFilm,
  getFilmByCategorie,
  getCategorieByFilm,
  removeFilm,
  updateFilm,
} from "../controllers/film.controller.js"

const Films = () => {
  const router = Router()
  router.get("/", getAllFilm)
  router.post("/", createFilm)
  router.get("/:id", getFilm)
  router.get("/categorie/:id", getFilmByCategorie)
  router.get("/film/:id", getCategorieByFilm)
  router.patch("/:id", updateFilm)
  router.delete("/:id", removeFilm)
  
  return router
}

export default Films
