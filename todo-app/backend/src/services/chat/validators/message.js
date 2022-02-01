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
    type: yup.boolean(),
    updated_at: yup.date().required(),
    deleted_at: yup.date().required(),
  }),

  update: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
    name: yup.string().min(3).max(20),
    type: yup.boolean(),
    updated_at: yup.date(),
    deleted_at: yup.date(),
  }),
};
