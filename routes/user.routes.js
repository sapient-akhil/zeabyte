const express = require("express");

const { ValidateBody } = require("../validation/validation.methods");
const Schemas = require("../validation/validation.schemas");
const privacyPolicyController = require("../controllers/user/privacyPolicyController");
const termsAndConditionController = require("../controllers/user/termsAndConditionsController");
const refundAndReturnPolicyController = require("../controllers/user/refundAndReturnPolicyController");
const termOfUseController = require("../controllers/user/termOfUseController");
const faqsController = require("../controllers/user/faqsController");
const contactUsController = require("../controllers/user/contactUsController");
const aboutUsController = require("../controllers/user/aboutUsController");
const router = express.Router();

//------------------------------ privacy policy -------------------------//
router.get("/privacy-policy", privacyPolicyController.getPrivacyPolicy);

//------------------------------ terms and condition -------------------------//
router.get(
  "/terms-condition-list",
  termsAndConditionController.getAllTermsAndConditions
);

//------------------------------ refund policy -------------------------//
router.get(
  "/refund-return-policy",
  refundAndReturnPolicyController.getRefundAndReturnPolicy
);

//------------------------------ term of use -------------------------//
router.get("/term-of-use", termOfUseController.getTermOfUse);

//------------------------------ faqs -------------------------//
router.get("/faqs", faqsController.getAllFaqs);

//-------------------------------- contact us -------------------------//
router.post(
  "/contact-us",
  ValidateBody(Schemas.contactUsSchema),
  contactUsController.addInquiry
);

//-------------------------------- about us -------------------------//
router.get("/about-us", aboutUsController.getAboutUs);

module.exports = router;
