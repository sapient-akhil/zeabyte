const termOfUseServices = require("../../services/admin/termOfUseServices");

module.exports = {
  addTermOfUse: async (req, res, next) => {
    try {
      const termOfUseData = req.body;
      const createdTermOfUse = await termOfUseServices.addTermOfUse(
        termOfUseData
      );
      return res.status(200).send({
        success: true,
        message: "Term of use added successfully.",
        data: createdTermOfUse,
      });
    } catch (err) {
      next(err);
    }
  },
  editTermOfUse: async (req, res, next) => {
    try {
      const privacyPolicyId = req.params.id;
      const newData = req.body;
      const updatedTermOfUse = await termOfUseServices.editTermOfUse(
        privacyPolicyId,
        newData
      );
      return res.status(200).send({
        success: true,
        message: "Term of use updated successfully.",
        data: updatedTermOfUse,
      });
    } catch (err) {
      next(err);
    }
  },
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
