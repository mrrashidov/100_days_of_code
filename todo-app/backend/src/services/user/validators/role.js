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
    permissions: yup.array().of(yup.string().required()).required(),
    status: yup.string().oneOf(["active", "pending", "passive"]),
  }),

  update: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
    name: yup.string().min(3).max(20),
    description: yup.string().min(10).max(100),
    permissions: yup.array().of(yup.string()),
    status: yup.string().oneOf(["active", "pending", "passive"]),
  }),
};
