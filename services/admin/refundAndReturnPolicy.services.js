const RefundAndReturnPolicy = require("../../sequelize/models/admin/refundAndReturnPolicy");
const createError = require("http-errors");

module.exports = {
  addRefundAndReturnPolicy: async (reqData) => {
    try {
      const createdRefundAndReturnPolicy = await RefundAndReturnPolicy.create(
        reqData
      );
      return createdRefundAndReturnPolicy;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  editRefundAndReturnPolicy: async (refundAndReturnPolicyId, newData) => {
    try {
      const refundAndReturnPolicy = await RefundAndReturnPolicy.findByPk(
        refundAndReturnPolicyId
      );
      if (!refundAndReturnPolicy) {
        throw createError.BadRequest("Invalid refundAndReturn policy id.");
      }

      Object.assign(refundAndReturnPolicy, newData);
      await refundAndReturnPolicy.save();

      return refundAndReturnPolicy;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  getAllRefundAndReturnPolicy: async () => {
    try {
      const refundAndReturnPolicyData = await RefundAndReturnPolicy.findAll({
        attributes: { exclude: ["updatedAt"] },
      });

      return refundAndReturnPolicyData;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
};
