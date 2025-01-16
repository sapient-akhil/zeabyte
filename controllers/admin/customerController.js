const customerServices = require("../../services/admin/customer.services");
const axios = require("axios");
module.exports = {
  addCustomer: async (req, res, next) => {
    try {
      const getCustomerDataFromAccredo = `https://salesapp.starfoods.co.nz:6569/saturn/odata4/v1/Company('TEST2OWN')/ARCustomerList`;
      const apiToken = "fDdEDXLHLZG9-n-E";
      // Fetch customer data from Accredo API
      const response = await axios.get(getCustomerDataFromAccredo, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json", // Optional, adjust based on Accredo API spec
        },
      });

      console.log("Fetched customer data from Accredo:", response.data);

      // Now pass the data to the service to store in the database
      const addCustomerData = await customerServices.addAboutUs(
        response.data.value
      ); // Assuming the customer data is inside the 'value' key

      return res.status(200).send({
        success: true,
        message: "Customer data added successfully.",
        data: addCustomerData,
      });
    } catch (err) {
      console.error("Error:", err);
      next(err); // Pass error to error handler
    }
  },
};
