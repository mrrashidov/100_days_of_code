const yup = require("yup");
module.exports = {
  createCategory: yup.object({
    name: yup.string().required().min(3).max(20),
    description: yup.string().required().max(50),
    userId: yup.number().required(),
  }),
};
