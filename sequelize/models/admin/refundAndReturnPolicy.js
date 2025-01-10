const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");

const RefundAndReturnPolicy = sequelize.define(
  "refund_and_return_policy",
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
    modelName: "RefundAndReturnPolicy",
  }
);

module.exports = RefundAndReturnPolicy;
