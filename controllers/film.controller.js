import { Film } from "../models/db.config.js"

export const getAllFilm = async (req, res) => {
  const films = await Film.findAll()

  res.json({ type: "success", data: films })
}

export const getFilm = async (req, res) => {
  const id = req.params.id
  if (!id) return res.status(400).json({ type: "error", message: "Id is required" })

  const film = await Film.findOne({
    where: { id },
  })
  if (!film) return res.status(400).json({ type: "error", message: "Film is undefined" })

  res.status(200).json({ type: "success", data: film })
}

export const createFilm = async (req, res) => {
  const { name, description, releaseDate, rating } = req.body
  console.log(req.body)
  if (!name || !description || !releaseDate) return res.status(400).json({ type: "error", message: "Name, description, rating and release date are required." })
  
  const film = await Film.create({ nom: name, description, date_parution: releaseDate, note: rating })
  
  res.json({ type: "success", data: film })
}

export const updateFilm = async (req, res) => {
  const { name, description, releaseDate, rating } = req.body
  if (!name || !description || !releaseDate) return res.status(400).json({ type: "error", message: "Name, description, rating and release date are required." })
  const id = req.params.id
  if (!id) return res.status(400).json({ type: "error", message: "Id is required" })

  const film = await Film.findOne({
    where: { id },
  })
  if (!film) return res.status(400).json({ type: "error", message: "Film is undefined" })
  
  await Film.update({ nom: name, description, date_parution: releaseDate, note: rating }, { where : { id } })
  res.json({ type: "success", message: "Film updated." })
}

export const removeFilm = async (req, res) => {
  const id = req.params.id
  if (!id) return res.status(400).json({ type: "error", message: "Id is required" })

  const film = await Film.findOne({
    where: { id },
  })
  if (!film) return res.status(400).json({ type: "error", message: "Film is undefined" })

  await Film.destroy({ where: { id } })
  res.json({ type: "success", message: "Film removed successfully." })
}