const axios = require("axios");

// Define the base URL
const BASE_URL = "https://starfoods-service-sg.zeabyte.co.nz/api/";

module.exports = {
  sendCustomerData: async (req, res) => {
    try {
      console.log("In the web hook function");

      const customerData = req.body;

      console.log("Received customer update:", customerData);

      res
        .status(200)
        .json({ message: "Customer update received successfully" });
    } catch (error) {
      console.log("Error:", error);

      res.status(500).json({
        message: "An error occurred while processing the customer update",
        error: error.message,
      });
    }
  },
};
