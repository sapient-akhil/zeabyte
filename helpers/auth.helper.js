const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants/env.constant");
const Admins = require("../sequelize/models/admin/admin");

module.exports = {
  // generate token
  signAccessToken: (userId, userRole, email, time) => {
    return new Promise((resolve, reject) => {
      const payload = { userId, email, userRole };
      const secret = JWT_SECRET_KEY;
      const options = {
        expiresIn: time,
        issuer: "zeabyte",
        audience: [userId],
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },
  adminAuthentication: async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
      return next(createError.Unauthorized("Authorization Token Required"));

    // token = token.split(" ")[1];

    jwt.verify(token, JWT_SECRET_KEY, async (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          status: 401,
          message: "Invalid Token or Expired" + err.message,
          isAuth: false,
          data: [],
        });
      }
      // console.log("result && result.email", result && result.email);
      try {
        if (result && result.email) {
          const getAdminData = await Admins.findOne({
            where: { email: result.email, active: true },
          });
          if (!getAdminData)
            return res.json({
              success: false,
              status: 401,
              message: "Invalid Token or Expired",
              isAuth: false,
              data: [],
            });
          req.payload = {
            userRole: "admin",
          };
          return next();
        }
      } catch (error) {
        console.error(
          "Database Query Error:",
          error.stack || error.message || error
        );
        return res.status(500).json({
          success: false,
          status: 500,
          message: "Internal Server Error",
          isAuth: false,
          data: [],
        });
      }
      return res.json({
        success: false,
        status: 401,
        message: "Invalid Token or Expired",
        isAuth: false,
        data: [],
      });
    });
  },
  employerAuthentication: async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
      return next(createError.Unauthorized("Authorization Token Required"));

    token = token.split(" ")[1];
    jwt.verify(token, JWT_SECRET_KEY, async (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          status: 401,
          message: "Invalid Token or Expired" + err.message,
          isAuth: false,
          data: [],
        });
      }
      try {
        if (result && result.email) {
          const getEmployerData = await Employers.findOne({
            where: {
              email: result.email,
              emailVerification: true,
              active: true,
            },
          });
          if (!getEmployerData)
            return res.json({
              success: false,
              status: 401,
              message: "Invalid Token or Expired",
              isAuth: false,
              data: [],
            });

          return next();
        }
      } catch (error) {
        console.error(
          "Database Query Error:",
          error.stack || error.message || error
        );
        return res.status(500).json({
          success: false,
          status: 500,
          message: "Internal Server Error",
          isAuth: false,
          data: [],
        });
      }
      return res.json({
        success: false,
        status: 401,
        message: "Invalid Token or Expired",
        isAuth: false,
        data: [],
      });
    });
  },
};
