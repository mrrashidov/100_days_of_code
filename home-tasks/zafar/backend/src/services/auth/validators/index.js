const yup = require("yup");
module.exports = {
  login: yup.object({
    email: yup.string().email(),
    phone: yup.number(),
    password: yup
      .string()
      .min(6)
      .max(20)
      .when(["email", "phone"], {
        is: true,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema,
      }),
  }),
  register: yup.object({
    email: yup.string().email().required(),
    phone: yup.number().required(),
    username: yup.string().required().min(3).max(16),
    first_name: yup.string().min(3).max(20),
    last_name: yup.string().min(3).max(20),
    password: yup
      .string()
      .required("No password provided.")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),
};
