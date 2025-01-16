const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models"); // Adjust the path as needed

const TermOfUSe = sequelize.define(
  "term_of_use",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING(100000),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "TermOfUSe",
  }
);

module.exports = TermOfUSe;
