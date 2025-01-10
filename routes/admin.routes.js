const express = require("express");
const { ValidateBody } = require("../validation/validation.methods");
// const {
//   adminRegisterSchema,
//   adminLoginSchema,
//   adminForgotPasswordSchema,
//   adminResetPasswordSchema,
// } = require("../validation/validation.schemas");
const Schemas = require("../validation/validation.schemas");
const { adminAuthentication } = require("../helpers/auth.helper");
const adminAuthController = require("../controllers/admin/adminAuthController");
const privacyPolicyController = require("../controllers/admin/privacyPolicyController");
const termsAndConditionController = require("../controllers/admin/termsAndConditionsController");
const refundAndReturnPolicyController = require("../controllers/admin/refundAndReturnPolicyController");
const termOfUseController = require("../controllers/admin/termOfUseController");
const faqsController = require("../controllers/admin/faqsController");
const contactUsController = require("../controllers/admin/contactUsController");
const aboutUsController = require("../controllers/admin/aboutUsController");
const router = express.Router();

// ----------------- admin - auth module  --------------------------

router.get("/check-superadmin-exist", adminAuthController.checkAdminExist);
router.post(
  "/admin-register",
  ValidateBody(Schemas.adminRegisterSchema),
  adminAuthController.registerAdmin
);
router.post(
  "/admin-login",
  ValidateBody(Schemas.adminLoginSchema),
  adminAuthController.loginAdmin
);
router.post(
  "/admin-forgot-password",
  ValidateBody(Schemas.adminForgotPasswordSchema),
  adminAuthController.forgotPasswordAdmin
);
router.post(
  "/admin-reset-password",
  ValidateBody(Schemas.adminResetPasswordSchema),
  adminAuthController.resetPasswordAdmin
);

//------------------------------ privacy policy -------------------------//
router.get(
  "/privacy-policy",
  adminAuthentication,
  privacyPolicyController.getPrivacyPolicy
);
router.post(
  "/privacy-policy",
  ValidateBody(Schemas.configSchema),
  adminAuthentication,
  privacyPolicyController.addPrivacyPolicy
);
router.put(
  "/privacy-policy/:id",
  ValidateBody(Schemas.configSchema),
  adminAuthentication,
  privacyPolicyController.editPrivacyPolicy
);

//------------------------------ terms and condition -------------------------//
router.get(
  "/terms-condition-list",
  adminAuthentication,
  termsAndConditionController.getAllTermsAndConditions
);
router.post(
  "/terms-condition",
  ValidateBody(Schemas.configSchema),
  adminAuthentication,
  termsAndConditionController.addTermsAndCondition
);
router.put(
  "/terms-condition/:id",
  ValidateBody(Schemas.configSchema),
  adminAuthentication,
  termsAndConditionController.editTermsAndCondition
);

//------------------------------ refund policy -------------------------//
router.get(
  "/refund-return-policy",
  adminAuthentication,
  refundAndReturnPolicyController.getRefundAndReturnPolicy
);
router.post(
  "/refund-return-policy",
  ValidateBody(Schemas.configSchema),
  adminAuthentication,
  refundAndReturnPolicyController.addRefundAndReturnPolicy
);
router.put(
  "/refund-return-policy/:id",
  ValidateBody(Schemas.configSchema),
  adminAuthentication,
  refundAndReturnPolicyController.editRefundAndReturnPolicy
);

//------------------------------ term of use -------------------------//
router.get(
  "/term-of-use",
  adminAuthentication,
  termOfUseController.getTermOfUse
);
router.post(
  "/term-of-use",
  ValidateBody(Schemas.configSchema),
  adminAuthentication,
  termOfUseController.addTermOfUse
);
router.put(
  "/term-of-use/:id",
  ValidateBody(Schemas.configSchema),
  adminAuthentication,
  termOfUseController.editTermOfUse
);

//------------------------------ faqs -------------------------//
router.post(
  "/faq",
  ValidateBody(Schemas.faqsSchema),
  adminAuthentication,
  faqsController.addFaq
);
router.get("/faq/:id", adminAuthentication, faqsController.getOneFaq);
router.put(
  "/faq/:id",
  ValidateBody(Schemas.faqsSchema),
  adminAuthentication,
  faqsController.editFaq
);
router.get("/faqs", adminAuthentication, faqsController.getAllFaqs);
router.delete("/faq/:id", adminAuthentication, faqsController.deleteFaq);

//-------------------------------- contact us -------------------------//
router.get(
  "/contact-us-list",
  adminAuthentication,
  contactUsController.getAllInquiries
);
router.get(
  "/contact-us/:id",
  adminAuthentication,
  contactUsController.getOneInquiry
);
router.delete(
  "/contact-us/:id",
  adminAuthentication,
  contactUsController.deleteInquiry
);
router.put(
  "/contact-us/:id",
  adminAuthentication,
  contactUsController.viewInquiry
);

//-------------------------------- about us -------------------------//
router.post(
  "/about-us",
  ValidateBody(Schemas.aboutUsSchema),
  adminAuthentication,
  aboutUsController.addAboutUs
);
router.get("/about-us", adminAuthentication, aboutUsController.getAboutUs);
router.patch(
  "/about-us/:id",
  ValidateBody(Schemas.aboutUsSchema),
  adminAuthentication,
  aboutUsController.editAboutUs
);

module.exports = router;
