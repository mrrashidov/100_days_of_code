const yup = require("yup");
module.exports = {
  find: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
  }),
  destroy: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
  }),
  create: yup.object({
    name: yup.string().min(3).max(20).required(),
    description: yup.string().min(10).max(100).required(),
  }),
  update: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
    name: yup.string().min(3).max(20),
    description: yup.string().min(10).max(100),
  }),
};
