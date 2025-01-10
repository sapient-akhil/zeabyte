const express = require("express");
const { adminAuthentication } = require("../helpers/auth.helper");
const fileUploadController = require("../controllers/common/fileUpload.controller");
const router = express.Router();

//---------------------- file upload ----------------------//
router.post("/image", fileUploadController.uploadImage);

router.post(
  "/images",
  adminAuthentication,
  fileUploadController.uploadMultipleImage
);

router.delete("/image", adminAuthentication, fileUploadController.deleteImage);

router.delete(
  "/image",
  adminAuthentication,
  fileUploadController.deleteMultipleImage
);

module.exports = router;
