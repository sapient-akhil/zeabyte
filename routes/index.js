const admin = require("./admin.routes");
const user = require("./user.routes");
const common = require("./common.routes");

module.exports = {
  // zeitcard routes
  zeitCardAdminRoutes: (app) => {
    app.use("/admin", admin);
  },
  zeitCardUserRoutes: (app) => {
    app.use("/user", user);
  },
  zeitCardCommonRoutes: (app) => {
    app.use("/common", common);
  },
};
