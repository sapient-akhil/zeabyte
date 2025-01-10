const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models"); // Adjust the path as needed

const FAQS = sequelize.define(
  "faqs",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "FAQS" }
);

module.exports = FAQS;
