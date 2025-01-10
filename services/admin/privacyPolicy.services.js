const PrivacyPolicy = require("../../sequelize/models/admin/privacyPolicy");
const createError = require("http-errors");

module.exports = {
  addPrivacyPolicy: async (reqData) => {
    try {
      const createdPrivacyPolicy = await PrivacyPolicy.create(reqData);
      return createdPrivacyPolicy;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  editPrivacyPolicy: async (privacyPolicyId, newData) => {
    try {
      const privacyPolicy = await PrivacyPolicy.findByPk(privacyPolicyId);
      if (!privacyPolicy) {
        throw createError.BadRequest("Invalid privacy policy id.");
      }

      Object.assign(privacyPolicy, newData);
      await privacyPolicy.save();

      return privacyPolicy;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  getAllPrivacyPolicy: async () => {
    try {
      const privacyPolicyData = await PrivacyPolicy.findAll({
        attributes: { exclude: ["updatedAt"] },
      });

      return privacyPolicyData;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
};
