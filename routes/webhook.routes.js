const express = require("express");

const webhookController = require("../webhook/webhook");
const router = express.Router();

//------------------------------ faqs -------------------------//
router.get("/ARCustomerList", webhookController.sendCustomerData);

module.exports = router;
