import { Op } from "sequelize"

import { Categorie, FilmCategorie, sequelize } from "../models/db.config.js"

export const getAllCategories = async (req, res) => {
  const { query } = req.query

  const categories = await Categorie.findAll({
    where: query
      ? {
          nom: { [Op.like]: `%${query}%` },
        }
      : undefined,
  })

  res.json({ type: "success", data: categories })
}

export const getCategory = async (req, res) => {
  const id = req.params.id
  if (!id)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const category = await Categorie.findOne({
    where: { id },
  })
  if (!category)
    return res.status(400).json({ type: "error", message: "Category is undefined" })

  const categoryFilms = await category.getFilms()
  const filteredFilms = categoryFilms.map(({ id, nom, description, date_parution, note }) => ({ id, nom, description, date_parution, note }))

  res.status(200).json({ type: "success", data: { category, films: filteredFilms } })
}

export const createCategory = async (req, res) => {
  const { name } = req.body
  console.log(req.body)
  if (!name)
    return res.status(400).json({
      type: "error",
      message: "Name are required.",
    })

  const category = await Categorie.create({
    nom: name,
  })

  res.json({ type: "success", data: category })
}

export const updateCategory = async (req, res) => {
  const { name } = req.body
  if (!name)
    return res.status(400).json({
      type: "error",
      message: "Name are required.",
    })
  const id = req.params.id
  if (!id)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const category = await Categorie.findOne({
    where: { id },
  })
  if (!category)
    return res.status(400).json({ type: "error", message: "Category is undefined" })

  await Categorie.update(
    { nom: name },
    { where: { id } },
  )
  res.json({ type: "success", message: "Category updated." })
}

export const removeCategory = async (req, res) => {
  const id = req.params.id
  if (!id)
    return res.status(400).json({ type: "error", message: "Id is required" })

  const category = await Categorie.findOne({
    where: { id },
  })
  if (!category)
    return res.status(400).json({ type: "error", message: "Category is undefined" })

  try {
    const transaction = await sequelize.transaction()

    await FilmCategorie.destroy({ where: { categorieId: id } }, { transaction })
    await Categorie.destroy({ where: { id } }, { transaction })

    await transaction.commit()

    res.json({ type: "success", message: "Category removed successfully." })
  } catch(err) {
    if (transaction) await transaction.rollback()
    res.status(500).json({ type: "error", message: "An error occurred while removing the category." })
  }
}
