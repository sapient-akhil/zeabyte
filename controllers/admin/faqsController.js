const faqsServices = require("../../services/admin/faqs.services");

module.exports = {
  getAllFaqs: async (req, res, next) => {
    try {
      const { pageNo = 1, perPage = 10 } = req.query;
      const { faqs, totalCount } = await faqsServices.getAllFaqs(
        pageNo,
        perPage,
        (pagination = true)
      );
      return res.status(200).send({
        success: true,
        message: "Faqs fetched successfully.",
        data: faqs,
        pagination: {
          count: totalCount,
          perPage: Number(perPage),
          pageNo: Number(pageNo),
          totalPages: Math.ceil(totalCount / perPage),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  addFaq: async (req, res, next) => {
    try {
      const reqData = req.body;
      const faq = await faqsServices.addFaq(reqData);

      return res.status(200).send({
        success: true,
        message: "Faq added successfully.",
        data: faq,
      });
    } catch (error) {
      next(error);
    }
  },

  editFaq: async (req, res, next) => {
    try {
      const reqData = req.body;
      const { id } = req.params;
      const faq = await faqsServices.updateFaq(id, reqData);
      return res.status(200).send({
        success: true,
        message: "Faq updated successfully.",
        data: faq,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteFaq: async (req, res, next) => {
    try {
      const { id } = req.params;
      await faqsServices.deleteFaq(id);
      return res.status(200).send({
        success: true,
        message: "Faq deleted successfully.",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  },

  getOneFaq: async (req, res, next) => {
    try {
      const { id } = req.params;
      const faq = await faqsServices.getFaq(id);
      return res.status(200).send({
        success: true,
        message: "Faq fetched successfully.",
        data: faq,
      });
    } catch (error) {
      next(error);
    }
  },
};
