import { DataTypes, Sequelize } from "sequelize"
import setupFilm from "./film.js";
import setupCategorie from "./categorie.js";

/**
 *
 * @param {Sequelize} sequelize
 * @returns {typeof import('sequelize').Model}
 */

const setupFilmCategorie = sequelize => {
  const FilmCategorie = sequelize.define(
    "filmcategories",
    {
      Id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
      },
      filmId: {
        type: DataTypes.INTEGER(11),
        //references: {model :setupFilm},
        allowNull: false,
      },
      categorieId: {
        type: DataTypes.INTEGER(11),
        //references: { model : setupCategorie },
        allowNull: false,
      },
  });

  return FilmCategorie
}

export default setupFilmCategorie
