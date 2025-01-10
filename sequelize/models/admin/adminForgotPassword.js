const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const Admins = require("./admin");

const AdminForgotPassword = sequelize.define(
  "admin_forgot_password",
  {
    adminEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      references: {
        model: Admins, // Foreign key relationship
        key: "email",
      },
      onUpdate: "CASCADE", // Updates if the referenced field changes
      onDelete: "CASCADE", // Deletes records if the referenced record is deleted
    },
    forgotId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      trim: true,
      unique: true,
    },
    expireAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("NOW() + INTERVAL '10 minutes'"),
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "AdminForgotPassword",
    indexes: [
      {
        unique: true,
        fields: ["forgotId"], // Ensures forgotId is unique
      },
    ],
  }
);

AdminForgotPassword.belongsTo(Admins, {
  foreignKey: "adminEmail",
});

module.exports = AdminForgotPassword;
