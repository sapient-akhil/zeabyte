const privacyPolicyServices = require("../../services/admin/privacyPolicy.services");

module.exports = {
  addPrivacyPolicy: async (req, res, next) => {
    try {
      const privacyPolicyData = req.body;
      const createdPrivacyPolicy = await privacyPolicyServices.addPrivacyPolicy(
        privacyPolicyData
      );
      return res.status(200).send({
        success: true,
        message: "Privacy Policy added successfully.",
        data: createdPrivacyPolicy,
      });
    } catch (err) {
      next(err);
    }
  },
  editPrivacyPolicy: async (req, res, next) => {
    try {
      const privacyPolicyId = req.params.id;
      const newData = req.body;
      const updatedPrivacyPolicy =
        await privacyPolicyServices.editPrivacyPolicy(privacyPolicyId, newData);
      return res.status(200).send({
        success: true,
        message: "Privacy Policy updated successfully.",
        data: updatedPrivacyPolicy,
      });
    } catch (err) {
      next(err);
    }
  },
  getPrivacyPolicy: async (req, res, next) => {
    try {
      const privacyPolicy = await privacyPolicyServices.getAllPrivacyPolicy();
      return res.status(200).send({
        success: true,
        message: "Privacy Policy retrieved successfully.",
        data: privacyPolicy[0],
      });
    } catch (err) {
      next(err);
    }
  },
};
