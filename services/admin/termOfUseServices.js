const TermOfUse = require("../../sequelize/models/admin/termOfUse");
const createError = require("http-errors");

module.exports = {
  addTermOfUse: async (reqData) => {
    try {
      const createdTermOfUse = await TermOfUse.create(reqData);
      return createdTermOfUse;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  editTermOfUse: async (termOfUseId, newData) => {
    try {
      const termOfUse = await TermOfUse.findByPk(termOfUseId);
      if (!termOfUse) {
        throw createError.BadRequest("Invalid term of use id.");
      }

      Object.assign(termOfUse, newData);
      await termOfUse.save();

      return termOfUse;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  getAllTermOfUse: async () => {
    try {
      const termOfUseData = await TermOfUse.findAll({
        attributes: { exclude: ["updatedAt"] },
      });

      return termOfUseData;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
};
