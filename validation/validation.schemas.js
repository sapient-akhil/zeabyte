const validate = require("./validation");
const Joi = require("joi");

module.exports = {
  contactFormSchema: Joi.object().keys({
    name: validate.reqString,
    email: validate.reqEmail,
    mobileNumber: validate.string,
    message: validate.reqString,
  }),
  adminRegisterSchema: Joi.object().keys({
    email: validate.reqEmail,
    password: validate.reqString,
  }),
  adminLoginSchema: Joi.object().keys({
    email: validate.reqEmail,
    password: validate.reqString,
  }),
  adminForgotPasswordSchema: Joi.object().keys({
    email: validate.reqEmail,
  }),
  adminResetPasswordSchema: Joi.object().keys({
    password: validate.reqString,
    token: validate.reqString,
  }),
  configSchema: Joi.object().keys({
    title: validate.reqString,
    details: validate.reqString,
  }),
  faqsSchema: Joi.object().keys({
    question: validate.reqString,
    answer: validate.reqString,
  }),
  contactUsSchema: Joi.object().keys({
    name: validate.reqString,
    email: validate.reqEmail,
    phoneNumber: validate.reqString,
    message: validate.reqString,
  }),
  aboutUsSchema: Joi.object({
    heroSection: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required(),
          description: Joi.string().optional(),
          image: Joi.string().uri().required(),
        })
      )
      .required(),
    foodPartner: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().optional(),
      logos: Joi.array()
        .items(
          Joi.object({
            image_alt: Joi.string().required(),
            image: Joi.string().uri().required(),
          })
        )
        .required(),
    }).required(),
    familyLeadership: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().optional(),
      membersData: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            designation: Joi.string().required(),
            image: Joi.string().uri().required(),
          })
        )
        .required(),
    }).required(),
    teamMembers: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().optional(),
      membersData: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            designation: Joi.string().required(),
            image: Joi.string().uri().required(),
          })
        )
        .required(),
    }).required(),
    teamDetails: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }).required(),
  }),
  uploadOne: Joi.object().keys({
    image: Joi.any(),
  }),
};
