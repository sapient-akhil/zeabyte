const termOfUseServices = require("../../services/admin/termOfUseServices");

module.exports = {
  getTermOfUse: async (req, res, next) => {
    try {
      const termOfUse = await termOfUseServices.getAllTermOfUse();
      return res.status(200).send({
        success: true,
        message: "Term of use retrieved successfully.",
        data: termOfUse[0],
      });
    } catch (err) {
      next(err);
    }
  },
};
