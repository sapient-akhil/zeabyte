const refundAndReturnPolicyServices = require("../../services/admin/refundAndReturnPolicy.services");
const createError = require("http-errors");

module.exports = {
  addRefundAndReturnPolicy: async (req, res, next) => {
    try {
      const refundAndReturnPolicyData = req.body;
      const createdRefundAndReturnPolicy =
        await refundAndReturnPolicyServices.addRefundAndReturnPolicy(
          refundAndReturnPolicyData
        );

      return res.status(200).send({
        success: true,
        message: "Refund and return policy added successfully.",
        data: createdRefundAndReturnPolicy,
      });
    } catch (err) {
      next(err);
    }
  },

  editRefundAndReturnPolicy: async (req, res, next) => {
    try {
      const refundAndReturnPolicyId = req.params.id;
      const newData = req.body;

      const updatedRefundAndReturnPolicy =
        await refundAndReturnPolicyServices.editRefundAndReturnPolicy(
          refundAndReturnPolicyId,
          newData
        );
      return res.status(200).send({
        success: true,
        message: "Refund and return policy updated successfully.",
        data: updatedRefundAndReturnPolicy,
      });
    } catch (err) {
      next(err);
    }
  },

  getRefundAndReturnPolicy: async (req, res, next) => {
    try {
      const privacyPolicy =
        await refundAndReturnPolicyServices.getAllRefundAndReturnPolicy();
      return res.status(200).send({
        success: true,
        message: "Refund and return policy retrieved successfully.",
        data: privacyPolicy[0],
      });
    } catch (err) {
      next(err);
    }
  },
};
