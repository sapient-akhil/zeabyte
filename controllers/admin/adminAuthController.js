const { signAccessToken } = require("../../helpers/auth.helper");
const { decryption } = require("../../helpers/cryptoUtils");
const adminAuthService = require("../../services/admin/adminAuthService");

module.exports = {
  checkAdminExist: async (req, res, next) => {
    try {
      const isAdminAlreadyExist = await adminAuthService.checkIfAdminExist();
      if (isAdminAlreadyExist === 0) {
        return res.status(200).send({
          success: false,
          message: "Admin not exists",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Admin already exists",
      });
    } catch (err) {
      next(err);
    }
  },
  registerAdmin: async (req, res, next) => {
    try {
      const reqBody = req.body;
      const adminData = await adminAuthService.findAdminByEmail(reqBody.email);
      if (adminData) {
        return res.status(200).send({
          success: false,
          message: "Admin already exists",
        });
      }
      const admin = await adminAuthService.registerAdminService(reqBody);
      const { password, updatedAt, createdAt, active, ...otherDetails } =
        admin.toJSON();
      return res.status(201).send({
        success: true,
        message: "Admin created successfully",
        data: otherDetails,
      });
    } catch (err) {
      next(err);
    }
  },
  loginAdmin: async (req, res, next) => {
    try {
      const reqBody = req.body;
      const { admin, adminId, email, TIME } = await adminAuthService.adminLogin(
        reqBody
      );

      const token = await signAccessToken(adminId, "admin", email, TIME);
      const { password, updatedAt, createdAt, active, ...otherDetails } =
        admin.toJSON();
      otherDetails.token = token;

      return res.status(200).send({
        success: true,
        message: "Admin login successfully",
        data: otherDetails,
      });
    } catch (err) {
      next(err);
    }
  },
  forgotPasswordAdmin: async (req, res, next) => {
    try {
      const reqData = req.body;
      const emailResult = await adminAuthService.adminForgotPassword(reqData);
      if (emailResult) {
        return res.json({
          success: true,
          message: "Email sent successfully",
        });
      } else {
        return res.json({
          success: false,
          message: "Failed to send email",
        });
      }
    } catch (err) {
      next(err);
    }
  },
  resetPasswordAdmin: async (req, res, next) => {
    try {
      const reqData = req.body;
      const payload = {
        encryptedData: reqData.token,
      };
      const decryptedData = await decryption(payload);
      if (!decryptedData.success) {
        return res.json({
          success: false,
          message: "Failed to set new password",
        });
      }
      const forgotData = decryptedData.data;
      const setPasswordDone = await adminAuthService.adminResetPassword(
        reqData,
        forgotData
      );
      if (setPasswordDone) {
        return res.json({
          success: true,
          message: "New password set successfully",
        });
      } else {
        return res.json({
          success: false,
          message: "Failed to set new password",
        });
      }
    } catch (err) {
      next(err);
    }
  },
};
