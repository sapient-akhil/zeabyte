const refundAndReturnPolicyServices = require("../../services/admin/refundAndReturnPolicy.services");

module.exports = {
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
