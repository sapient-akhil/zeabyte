const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models"); // Adjust the path as needed

const Contact = sequelize.define(
  "contacts",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Contact",
  }
);

module.exports = Contact;
