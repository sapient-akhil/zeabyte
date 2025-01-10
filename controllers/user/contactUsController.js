const contactUsServices = require("../../services/user/contactUs.services");
const createError = require("http-errors");

module.exports = {
  addInquiry: async (req, res, next) => {
    try {
      const inquiryData = req.body;
      const createdContactUs = await contactUsServices.addInquiry(inquiryData);
      if (!createdContactUs) {
        return next(
          createError.InternalServerError("Error creating ContactUs.")
        );
      }
      return res.status(200).send({
        success: true,
        message: "ContactUs added successfully.",
        data: createdContactUs,
      });
    } catch (err) {
      next(err);
    }
  },
};
