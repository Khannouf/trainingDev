import { DataTypes, Sequelize } from "sequelize"

/**
 *
 * @param {Sequelize} sequelize
 * @returns {typeof import('sequelize').Model}
 */

const setupFilm = sequelize => {
  const Film = sequelize.define(
    "film",
    {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      date_parution: {
        type: DataTypes.DATEONLY,
      },
      note: {
        type: DataTypes.INTEGER(11),
      },
    },
    { timestamps: false, freezeTableName: true },
  )
  return Film
}

export default setupFilm
