const createError = require("http-errors");
const Customer = require("../../sequelize/models/admin/customer");

module.exports = {
  addAboutUs: async (customerData) => {
    try {
      const addCustomerData = [];

      // Loop through the data and create customers in your database
      for (const customer of customerData) {
        // Assuming 'IsActive' is the field indicating whether a customer is active or inactive.
        // Adjust this key based on the actual field name returned by the Accredo API.
        if (customer.Inactive !== true) {
          // Only add active customers
          const createdCustomer = await Customer.create({
            customerCode: customer.CustomerCode, // Adjust this key based on Accredo response
            customerName: customer.CustomerName, // Adjust this key based on Accredo response
            customerEmail: customer.EmailAddress, // Adjust this key based on Accredo response
            inActiveInAccredo: customer.Inactive, // Adjust this key based on Accredo response
          });
          addCustomerData.push(createdCustomer);
        }
      }

      return addCustomerData;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },
};
