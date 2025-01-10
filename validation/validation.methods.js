const { decryption } = require("../helpers/cryptoUtils");

const ValidateBody = (schema) => {
  return async (req, res, next) => {
    const reqBody = req.body;

    const decryptedData = await decryption(
      reqBody,
      req.protocol,
      req.get("host")
    );
    if (!decryptedData.success) {
      return res.json({
        success: false,
        message: "Failed decryption",
      });
    }
    req.body = await decryptedData.data;
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: `Validation Error : ${error.details[0].message}`,
      });
    } else {
      // Set the validated query parameters in the request object
      req.body = value;
      // Pass control to the next middleware or route handler
      next();
    }
  };
};

const ValidateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: [] });
    }

    // Set the validated query parameters in the request object
    req.query = value;

    next();
  };
};

const ValidateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: [] });
    }

    // Set the validated query parameters in the request object
    req.query = value;

    next();
  };
};
module.exports = {
  ValidateBody,
  ValidateQuery,
  ValidateParams,
};
