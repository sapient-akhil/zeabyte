const contactUsServices = require("../../services/user/contactUs.services");

module.exports = {
  viewInquiry: async (req, res, next) => {
    try {
      const inquiryId = req.params.id;
      const viewInquiry = await contactUsServices.viewInquiry(inquiryId);
      return res.status(200).send({
        success: true,
        message: "Contact us data is read successfully.",
        data: viewInquiry,
      });
    } catch (err) {
      next(err);
    }
  },

  getAllInquiries: async (req, res, next) => {
    try {
      const { view, pageNo = 1, perPage = 10 } = req.query;
      const { inquiries, totalCount } = await contactUsServices.getAllInquiries(
        view,
        pageNo,
        perPage
      );
      return res.status(200).send({
        success: true,
        message: "Inquiries retrieved successfully.",
        data: inquiries,
        pagination: {
          count: totalCount,
          perPage: Number(perPage),
          pageNo: Number(pageNo),
          totalPages: Math.ceil(totalCount / perPage),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getOneInquiry: async (req, res, next) => {
    try {
      const inquiryId = req.params.id;
      const inquiry = await contactUsServices.getOneInquiry(inquiryId);
      return res.status(200).send({
        success: true,
        message: "Inquiry retrieved successfully.",
        data: inquiry,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteInquiry: async (req, res, next) => {
    try {
      const inquiryId = req.params.id;
      await contactUsServices.deleteInquiry(inquiryId);
      return res.status(200).send({
        success: true,
        message: "Inquiry deleted successfully.",
        data: {},
      });
    } catch (err) {
      next(err);
    }
  },
};
