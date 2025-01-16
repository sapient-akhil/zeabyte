const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models"); // Adjust the path as needed

const Customer = sequelize.define(
  "customer",
  {
    customerCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inActiveInAccredo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Customer",
  }
);

module.exports = Customer;
