import { DataTypes, Sequelize } from "sequelize"

/**
 *
 * @param {Sequelize} sequelize
 * @returns {typeof import('sequelize').Model}
 */

const setupCategorie = sequelize => {
  const Categorie = sequelize.define(
    "categorie",
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
    },
    { timestamps: false, freezeTableName: true },
  );

  // Categorie.associate = (models) => {
  //   Categorie.belongsToMany(models.Film, {
  //     through: 'FilmCategorie',
  //     //foreignKey: 'id'
  //   });
  // };


  return Categorie
}

export default setupCategorie
