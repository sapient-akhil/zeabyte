const FaqsModel = require("../../sequelize/models/admin/faqs");
const createError = require("http-errors");

module.exports = {
  getAllFaqs: async (pageNo = 1, perPage = 10, pagination) => {
    try {
      if (pagination) {
        // Apply pagination logic if paginate is true
        const offset = (pageNo - 1) * perPage;
        const { rows: faqs, count: totalCount } =
          await FaqsModel.findAndCountAll({
            limit: perPage,
            offset,
            attributes: { exclude: ["updatedAt"] },
          });
        return { faqs, totalCount };
      } else {
        // Fetch all FAQs without pagination
        const faqs = await FaqsModel.findAll({
          attributes: { exclude: ["updatedAt"] },
        });
        return faqs; // No pagination, so totalCount is just the length of faqs
      }
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  },

  addFaq: async (data) => {
    try {
      const faq = await FaqsModel.create(data);
      return faq;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  },

  deleteFaq: async (id) => {
    try {
      const faq = await FaqsModel.destroy({ where: { id } });
      return faq;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  },

  updateFaq: async (id, data) => {
    try {
      const faq = await FaqsModel.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!faq) {
        throw createError.BadRequest("Invalid faq id.");
      }

      await faq.update(data);

      return faq;
    } catch (error) {
      throw error;
    }
  },

  getFaq: async (id) => {
    try {
      const faq = await FaqsModel.findOne({ where: { id } });
      if (!faq) {
        throw createError.BadRequest("Invalid faq id.");
      }
      return faq;
    } catch (error) {
      throw error;
    }
  },
};
