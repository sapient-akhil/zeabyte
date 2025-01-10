const aboutUsServices = require("../../services/admin/aboutUs.services");

module.exports = {
  addAboutUs: async (req, res, next) => {
    try {
      const aboutUsData = req.body;
      const createdAboutUs = await aboutUsServices.addAboutUs(aboutUsData);
      return res.status(200).send({
        success: true,
        message: "About Us data added successfully.",
        data: createdAboutUs,
      });
    } catch (err) {
      next(err);
    }
  },
  editAboutUs: async (req, res, next) => {
    try {
      const aboutUsId = req.params.id;
      const newData = req.body;

      const updatedAboutUs = await aboutUsServices.editAboutUs(
        aboutUsId,
        newData
      );
      return res.status(200).send({
        success: true,
        message: "About us data updated successfully.",
        data: updatedAboutUs,
      });
    } catch (err) {
      next(err);
    }
  },
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
