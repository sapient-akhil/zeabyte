const faqsServices = require("../../services/admin/faqs.services");

module.exports = {
  getAllFaqs: async (req, res, next) => {
    try {
      const faqs = await faqsServices.getAllFaqs();
      return res.status(200).send({
        success: true,
        message: "Faqs fetched successfully.",
        data: faqs,
      });
    } catch (error) {
      next(error);
    }
  },
};
