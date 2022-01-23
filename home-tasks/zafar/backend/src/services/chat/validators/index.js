const yup = require("yup");
module.exports = {
  create: yup.object({
    name: yup.string().required().min(3).max(20),
  }),
};
