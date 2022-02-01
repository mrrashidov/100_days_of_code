const yup = require("yup");
module.exports = {
  find: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
  }),
  destroy: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
  }),
  create: yup.object({
    name: yup.string().required().min(3).max(20),
    description: yup.string().required().max(50),
    userId: yup.string().matches(/^\d+$/).required(),
    type: yup.boolean(),
    status: yup.boolean(),
  }),
  update: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
    name: yup.string().min(3).max(20),
    description: yup.string().max(50),
    type: yup.boolean(),
    status: yup.boolean(),
  }),
};
