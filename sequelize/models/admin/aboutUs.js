const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models"); // Adjust the path as needed

const AboutUs = sequelize.define(
  "about_us",
  {
    heroSection: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    foodPartner: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    familyLeadership: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    teamMembers: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    teamDetails: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "AboutUs",
  }
);

module.exports = AboutUs;
