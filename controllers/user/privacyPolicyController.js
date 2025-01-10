const privacyPolicyServices = require("../../services/admin/privacyPolicy.services");

module.exports = {
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
