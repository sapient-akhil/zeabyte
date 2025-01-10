const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");

const ContactUs = sequelize.define(
  "contact_us",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    view: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "ContactUs",
  }
);

module.exports = ContactUs;
