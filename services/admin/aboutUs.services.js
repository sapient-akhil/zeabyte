const { getAboutUs } = require("../../controllers/admin/aboutUsController");
const AboutUs = require("../../sequelize/models/admin/aboutUs");
const createError = require("http-errors");

module.exports = {
  addAboutUs: async (reqData) => {
    try {
      const createdAboutUs = await AboutUs.create(reqData);
      return createdAboutUs;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },
  editAboutUs: async (aboutUsId, newData) => {
    try {
      const aboutUs = await AboutUs.findByPk(aboutUsId);
      if (!aboutUs) {
        throw createError.BadRequest("Invalid about us id.");
      }

      Object.assign(aboutUs, newData);
      await aboutUs.save();

      return aboutUs;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },
  getAboutUs: async () => {
    try {
      const aboutUsData = await AboutUs.findAll({
        attributes: { exclude: ["updatedAt"] },
      });

      return aboutUsData;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
};
