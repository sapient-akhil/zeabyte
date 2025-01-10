const TermsAndCondition = require("../../sequelize/models/admin/termsAndConditions");
const createError = require("http-errors");

module.exports = {
  addTermsAndCondition: async (reqData) => {
    try {
      const createdTermsAndCondition = await TermsAndCondition.create(reqData);
      return createdTermsAndCondition;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },
  editTermsAndCondition: async (termsAndConditionId, newData) => {
    try {
      const termsAndCondition = await TermsAndCondition.findByPk(
        termsAndConditionId
      );
      if (!termsAndCondition) {
        throw createError.BadRequest("Invalid terms and condition id.");
      }

      Object.assign(termsAndCondition, newData);
      await termsAndCondition.save();

      return termsAndCondition;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },
  getAllTermsAndConditions: async () => {
    try {
      const termsAndConditions = await TermsAndCondition.findAll({
        attributes: { exclude: ["updatedAt"] },
      });

      return termsAndConditions;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
};
