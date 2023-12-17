import { Sequelize } from "sequelize"

import setupFilm from "./film.js"
import setupCategorie from "./categorie.js"
import setupFilmCategorie from "./filmCategorie.js"

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
export const Categorie = (sequelize.categorie = setupCategorie(sequelize))
export const FilmCategorie = (sequelize.filmCategorie = setupFilmCategorie(sequelize))

Film.belongsToMany(Categorie, { through: FilmCategorie, foreignKey: 'filmId'});
Categorie.belongsToMany(Film, { through: FilmCategorie, foreignKey: 'categorieId'});

export default sequelize
