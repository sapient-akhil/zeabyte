const AdminForgotPassword = require("../../sequelize/models/admin/adminForgotPassword");

module.exports = {
  addAdminForgotPasswordData: async (data) => {
    try {
      let forgotAdminData = null;
      const isEmailExist = await AdminForgotPassword.findOne({
        where: { adminEmail: data.adminEmail },
      });
      if (isEmailExist) {
        forgotAdminData = await AdminForgotPassword.update(
          { ...data },
          { where: { adminEmail: data.adminEmail }, returning: true }
        );
        return forgotAdminData;
      } else {
        forgotAdminData = await AdminForgotPassword.create(data);
        return forgotAdminData;
      }
    } catch (err) {
      console.log("Add Admin Forgot Password Data Service Error  : ", err);
      return err;
    }
  },
  findForgotData: async (data) => {
    try {
      const isForgotIdExist = await AdminForgotPassword.findOne({
        where: { forgotId: data.forgotId },
      });
      return isForgotIdExist;
    } catch (err) {
      console.log("Find ForgotData Service Error  : ", err);
      return err;
    }
  },
  deleteForgotData: async (data) => {
    try {
      return await AdminForgotPassword.destroy({
        where: { forgotId: data },
      });
    } catch (err) {
      console.log("Find ForgotData Service Error  : ", err);
      return err;
    }
  },
};
