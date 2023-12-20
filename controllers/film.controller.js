import { Op } from "sequelize"

import {
  Categorie,
  Film,
  FilmCategorie,
  sequelize,
} from "../models/db.config.js"

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

  const filmCategories = await film.getCategories()
  const filteredCategories = filmCategories.map(({ id, nom }) => ({ id, nom }))

  res
    .status(200)
    .json({ type: "success", data: { film, categories: filteredCategories } })
}

export const createFilm = async (req, res) => {
  const { name, description, releaseDate, rating, categories } = req.body
  console.log(req.body)
  if (!name || !description || !releaseDate)
    return res.status(400).json({
      type: "error",
      message: "Name, description, rating and release date are required.",
    })

  try {
    const transaction = await sequelize.transaction()

    const film = await Film.create(
      {
        nom: name,
        description,
        date_parution: releaseDate,
        note: rating,
      },
      { transaction },
    )

    if (categories && categories.length > 0) {
      for (const nom of categories) {
        let categorie = await Categorie.findOne(
          { where: { nom } },
          { transaction },
        )
        if (!categorie) {
          categorie = await Categorie.create({ nom }, { transaction })
        }
        await film.addCategorie(categorie, { transaction })
      }
    }

    await transaction.commit()

    const filmCategories = await film.getCategories()
    const filteredCategories = filmCategories.map(({ id, nom }) => ({
      id,
      nom,
    }))

    res.json({
      type: "success",
      data: { film, categories: filteredCategories },
    })
  } catch (err) {
    if (transaction) await transaction.rollback()
    res.status(500).json({
      type: "error",
      message: "An error occurred while creating the film.",
    })
  }
}

export const updateFilm = async (req, res) => {
  const { name, description, releaseDate, rating, categories } = req.body
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

  const transaction = await sequelize.transaction()
  try {
    await Film.update(
      { nom: name, description, date_parution: releaseDate, note: rating },
      { where: { id } },
      { transaction },
    )

    if (categories) {
      await film.setCategories([], { transaction })

      for (const nom of categories) {
        const categorie = await Categorie.findOrCreate({
          where: { nom },
          transaction,
        })
        await film.addCategorie(categorie[0], { transaction })
      }
    }

    await transaction.commit()

    res.json({ type: "success", message: "Film updated." })
  } catch (err) {
    await transaction.rollback()
    res.status(500).json({
      type: "error",
      message: "An error occurred while updating the film.",
    })
  }
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

  try {
    const transaction = await sequelize.transaction()

    await FilmCategorie.destroy({ where: { filmId: id } }, { transaction })
    await Film.destroy({ where: { id } }, { transaction })

    await transaction.commit()

    res.json({ type: "success", message: "Film removed successfully." })
  } catch (err) {
    if (transaction) await transaction.rollback()
    res.status(500).json({
      type: "error",
      message: "An error occurred while removing the film.",
    })
  }
}
