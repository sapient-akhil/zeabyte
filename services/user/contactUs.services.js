const Inquiries = require("../../sequelize/models/user/contactUs");
const createError = require("http-errors");

module.exports = {
  addInquiry: async (reqData) => {
    try {
      const createdInquiry = await Inquiries.create(reqData);
      return createdInquiry;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  editInquiry: async (inquiryId, newData) => {
    try {
      const inquiry = await Inquiries.findByPk(inquiryId);
      if (!inquiry) {
        throw createError.BadRequest("Invalid inquiry id.");
      }

      Object.assign(inquiry, newData);
      await inquiry.save();

      return inquiry;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  viewInquiry: async (inquiryId) => {
    try {
      const inquiry = await Inquiries.findByPk(inquiryId);
      if (!inquiry) {
        throw createError.BadRequest("Invalid inquiry id.");
      }

      inquiry.view = true;
      await inquiry.save();

      return inquiry;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  getAllInquiries: async (view, pageNo = 1, perPage = 10) => {
    try {
      const offset = (pageNo - 1) * perPage;
      const { rows: inquiries, count: totalCount } =
        await Inquiries.findAndCountAll({
          where: { view },
          limit: perPage,
          offset,
          attributes: { exclude: ["updatedAt"] },
        });

      return { inquiries, totalCount };
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },

  getOneInquiry: async (inquiryId) => {
    try {
      const inquiry = await Inquiries.findByPk(inquiryId, {
        attributes: { exclude: ["updatedAt"] },
      });
      if (!inquiry) {
        throw createError.BadRequest("Invalid inquiry id.");
      }
      return inquiry;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },

  deleteInquiry: async (inquiryId) => {
    try {
      const inquiry = await Inquiries.findByPk(inquiryId, {
        attributes: { exclude: ["updatedAt"] },
      });
      if (!inquiry) {
        throw createError.BadRequest("Invalid inquiry id.");
      }

      await inquiry.destroy();

      return { message: "Inquiry deleted successfully." };
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },
};
