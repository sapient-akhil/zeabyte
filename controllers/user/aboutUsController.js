const aboutUsServices = require("../../services/admin/aboutUs.services");

module.exports = {
  getAboutUs: async (req, res, next) => {
    try {
      const aboutUs = await aboutUsServices.getAboutUs();
      return res.status(200).send({
        success: true,
        message: "About Us data retrieved successfully.",
        data: aboutUs[0],
      });
    } catch (err) {
      next(err);
    }
  },
};
