import { Sequelize } from "sequelize"

import setupFilm from "./film.js"

const sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,
})

export const Film = (sequelize.film = setupFilm(sequelize))

export default sequelize