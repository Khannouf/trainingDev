import { DataTypes, Sequelize } from "sequelize"

/**
 *
 * @param {Sequelize} sequelize
 * @returns {typeof import('sequelize').Model}
 */

const setupFilmCategorie = sequelize => {
  const FilmCategorie = sequelize.define(
    "filmCategorie",
    {
      Id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      filmId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      categorieId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true },
  )

  return FilmCategorie
}

export default setupFilmCategorie
