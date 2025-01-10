const Admins = require("../../sequelize/models/admin/admin");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const randomstring = require(`randomstring`);
const { addAdminForgotPasswordData } = require("./adminForgotPasswordService");
const { encryption } = require("../../helpers/cryptoUtils");
const { ADMIN_HOST } = require("../../constants/env.constant");
const { sendMailWithServices } = require("../../helpers/mail.helper");
const { forgetPasswordTemplate } = require("../../helpers/emailTemplate");
const adminForgotPasswordService = require("./adminForgotPasswordService");

module.exports = {
  // register a new admin
  registerAdminService: async (data) => {
    try {
      const admin = await Admins.create(data);
      if (!admin)
        throw createError.InternalServerError("Error creating admin :");
      return admin;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  },
  // admin login
  adminLogin: async (data) => {
    try {
      const admin = await Admins.findOne({
        where: { email: data.email, active: true },
      });

      if (!admin) throw createError.BadRequest("Invalid credentials");

      const validPassword = await bcrypt.compare(data.password, admin.password);
      if (!validPassword) throw createError.BadRequest("Invalid credentials");

      // assuming you use some JWT or session mechanism for login
      const adminId = admin.id;
      const email = admin.email;
      const TIME = "1d";

      return { admin, adminId, email, TIME };
    } catch (err) {
      throw err;
    }
  },
  // admin forgot password
  adminForgotPassword: async (data) => {
    try {
      const admin = await Admins.findOne({
        where: { email: data.email, active: true },
      });
      if (!admin) throw createError.BadRequest("Invalid email");

      const infoData = {
        forgotId: randomstring.generate(17),
        adminEmail: admin.email,
      };
      const addForgotData = await addAdminForgotPasswordData(infoData);
      if (addForgotData) {
        const ciphertext = await encryption(addForgotData);
        console.log("ciphertext", ciphertext);
        const resetUrl = `${ADMIN_HOST}/reset-password?auth=${ciphertext}`;
        const template = await forgetPasswordTemplate(resetUrl);
        const sendVerification = await sendMailWithServices(
          admin.email,
          "Forgot Password For Zeabyte Admin",
          template
        );
        if (sendVerification) {
          return sendVerification;
        } else {
          return false;
        }
      } else {
        throw createError.BadRequest(
          "Something went wrong while create forgot password session"
        );
      }
    } catch (err) {
      throw err;
    }
  },
  // admin reset password
  // adminResetPassword: async (reqBody, forgotData) => {
  //   try {
  //     console.log("reqBody",reqBody)
  //     console.log("forgotData",forgotData)
  //     const isForgotDataExist = await adminForgotPasswordService.findForgotData(
  //       forgotData
  //     );
  //     if (!isForgotDataExist) {
  //       throw new Error("Data does not exist");
  //     }
  //     // Check if the data is expired
  //     const currentTime = new Date();
  //     const expireTime = new Date(forgotData.expireAt);
  //     if (currentTime >= expireTime) {
  //       await adminForgotPasswordService.deleteForgotData(forgotData.forgotId);
  //       throw new Error("Reset link has expired, please try again");
  //     }

  //     // Update the password in the Admin model
  //     const updatedAdmin = await Admins.update(
  //       { password: reqBody.password }, // Fields to update
  //       { where: { email: forgotData.adminEmail } } // Condition to find the specific admin
  //     );
  //     if (updatedAdmin) {
  //       // Delete the forgotData after a successful reset
  //       await adminForgotPasswordService.deleteForgotData(forgotData.forgotId);
  //       return true;
  //     } else {
  //       throw new Error("Failed to update, please try again");
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // },
  adminResetPassword: async (reqBody, forgotData) => {
    try {
      console.log("reqBody", reqBody);
      console.log("forgotData", forgotData);

      // Utility function to safely extract adminEmail and forgotId from forgotData
      const getForgotDataField = (field) => {
        if (Array.isArray(forgotData)) {
          return forgotData[1][0]?.[field]; // Array case
        }
        return forgotData?.[field]; // Object case
      };

      const adminEmail = getForgotDataField("adminEmail");
      const forgotId = getForgotDataField("forgotId");
      const expireTime = new Date(forgotData.expireAt);
      const currentTime = new Date();

      // Check if forgotData exists and the reset link is expired
      const isForgotDataExist = await adminForgotPasswordService.findForgotData(
        forgotData
      );
      if (!isForgotDataExist) {
        throw new Error("Data does not exist");
      }
      console.log("forgotId", forgotId);
      if (currentTime >= expireTime) {
        if (forgotId) {
          await adminForgotPasswordService.deleteForgotData(forgotId); // Delete expired forgotData
        }
        throw new Error("Reset link has expired, please try again");
      }

      // If adminEmail is not found, throw error
      if (!adminEmail) {
        throw new Error("Admin email not found");
      }

      // Update the password
      const updatedAdmin = await Admins.update(
        { password: reqBody.password },
        { where: { email: adminEmail } }
      );

      // Check if any rows were updated (i.e., successful password update)
      if (updatedAdmin[0] > 0) {
        // Delete the forgotData after a successful reset
        if (forgotId) {
          await adminForgotPasswordService.deleteForgotData(forgotId);
        }
        return true; // Return success
      } else {
        throw new Error("Failed to update, please try again");
      }
    } catch (err) {
      console.error(err); // Log the error for debugging purposes
      throw err; // Rethrow the error
    }
  },

  // check if admin exist
  checkIfAdminExist: async () => {
    try {
      // Hash the password before saving
      const adminCount = await Admins.count();
      console.log("🚀 ~ checkIfAdminExist: ~ adminCount:", adminCount);
      return adminCount;
    } catch (err) {
      throw err;
    }
  },
  // find admin by email
  findAdminByEmail: async (data) => {
    try {
      const admin = await Admins.findOne({
        where: { email: data, active: true },
      });
      console.log("admin", admin);
      if (admin) return admin;
      return null;
    } catch (err) {
      throw err;
    }
  },
};
