import { Op } from "sequelize"

import { Categorie, Film, FilmCategorie } from "../models/db.config.js"

export const getAllFilm = async (req, res) => {
  const { query, limit: limitString = "10", page: pageString = "0" } = req.query

  const limitUnchecked = parseInt(limitString)
  const limit =
    isNaN(limitUnchecked) || limitUnchecked < 1 || limitUnchecked > 50
      ? 10
      : limitUnchecked

  const pageUnchecked = parseInt(pageString)
  const page = isNaN(pageUnchecked) || pageUnchecked < 1 ? 1 : pageUnchecked

  const films = await Film.findAll({
    where: query
      ? {
          [Op.or]: [
            { nom: { [Op.like]: `%${query}%` } },
            { description: { [Op.like]: `%${query}%` } },
          ],
        }
      : undefined,
    // isNaN : is Not a Number
    limit,
    offset: (page - 1) * limit,
  })

  res.json({ type: "success", data: films })
}

export const getFilm = async (req, res) => {
  const id = req.params.id
  if (!id)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const film = await Film.findOne({
    where: { id },
  })
  if (!film)
    return res.status(400).json({ type: "error", message: "Film is undefined" })

  res.status(200).json({ type: "success", data: film })
}

export const getFilmByCategorie= async (req, res) => {
  const id = req.params.id
  if (!id)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const films = await Film.findAll({
    include: [
      {
        model: Categorie,
        through: FilmCategorie,
        where: { id }
      },
    ],
  })
  if(!films)
    return res.status(400).json({ type: "error", message: "Film is undefined" })

  return res.status(200).json({ type: "success", data: films })
}

export const getCategorieByFilm= async (req, res) => {
  const id = req.params.id
  if (!id)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const categories = await Categorie.findAll({
    include: [
      {
        model: Film,
        through: FilmCategorie,
        where: { id }
      },
    ],
  })
  if(!categories)
    return res.status(400).json({ type: "error", message: "Category is undefined" })

  return res.status(200).json({ type: "success", data: categories })
}

export const createFilm = async (req, res) => {
  const { name, description, releaseDate, rating } = req.body
  console.log(req.body)
  if (!name || !description || !releaseDate)
    return res.status(400).json({
      type: "error",
      message: "Name, description, rating and release date are required.",
    })

  const film = await Film.create({
    nom: name,
    description,
    date_parution: releaseDate,
    note: rating,
  })

  res.json({ type: "success", data: film })
}

export const updateFilm = async (req, res) => {
  const { name, description, releaseDate, rating } = req.body
  if (!name || !description || !releaseDate)
    return res.status(400).json({
      type: "error",
      message: "Name, description, rating and release date are required.",
    })
  const id = req.params.id
  if (!id)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const film = await Film.findOne({
    where: { id },
  })
  if (!film)
    return res.status(400).json({ type: "error", message: "Film is undefined" })

  await Film.update(
    { nom: name, description, date_parution: releaseDate, note: rating },
    { where: { id } },
  )
  res.json({ type: "success", message: "Film updated." })
}

export const removeFilm = async (req, res) => {
  const id = req.params.id
  if (!id)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const film = await Film.findOne({
    where: { id },
  })
  if (!film)
    return res.status(400).json({ type: "error", message: "Film is undefined" })

  await Film.destroy({ where: { id } })
  res.json({ type: "success", message: "Film removed successfully." })
}
