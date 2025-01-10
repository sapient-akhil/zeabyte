const termsAndConditionService = require("../../services/admin/termsAndCondition.services");

module.exports = {
  getAllTermsAndConditions: async (req, res, next) => {
    try {
      const termsAndConditions =
        await termsAndConditionService.getAllTermsAndConditions();

      return res.status(200).send({
        success: true,
        message: "Terms and Conditions retrieved successfully.",
        data: termsAndConditions[0],
      });
    } catch (err) {
      next(err);
    }
  },
};
