const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");

const TermsAndConditions = sequelize.define(
  "terms_and_conditions",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "TermsAndConditions",
  }
);

module.exports = TermsAndConditions;
