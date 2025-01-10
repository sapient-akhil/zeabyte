const termsAndConditionService = require("../../services/admin/termsAndCondition.services");

module.exports = {
  addTermsAndCondition: async (req, res, next) => {
    try {
      const termsAndConditionData = req.body;
      const createdTermsAndCondition =
        await termsAndConditionService.addTermsAndCondition(
          termsAndConditionData
        );

      return res.status(200).send({
        success: true,
        message: "Terms and Condition added successfully.",
        data: createdTermsAndCondition,
      });
    } catch (err) {
      next(err);
    }
  },

  editTermsAndCondition: async (req, res, next) => {
    try {
      const termsAndConditionId = req.params.id;
      const newData = req.body;
      const updatedTermsAndCondition =
        await termsAndConditionService.editTermsAndCondition(
          termsAndConditionId,
          newData
        );
      return res.status(200).send({
        success: true,
        message: "Terms and Condition updated successfully.",
        data: updatedTermsAndCondition,
      });
    } catch (err) {
      next(err);
    }
  },

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
