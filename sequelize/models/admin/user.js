const { DataTypes } = require("sequelize");
const { hashSync } = require("bcrypt");
const { sequelize } = require("../../models");

const Admins = sequelize.define(
  "admins",
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      set: function (value) {
        this.setDataValue("password", hashSync(value, 10));
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "admin",
      trim: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "Admins" }
);

module.exports = Admins;
