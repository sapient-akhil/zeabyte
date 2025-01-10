const { FREE_EMAIL_PROVIDERS } = require("../constants/env.constant");

module.exports = {
  // Function to check if the email belongs to a free email provider
  isFreeEmailDomain: (email) => {
    const domain = email.split("@")[1];
    return FREE_EMAIL_PROVIDERS.includes(domain);
  },
};
