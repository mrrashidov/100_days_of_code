const yup = require("yup");
module.exports = {
  find: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
  }),
  destroy: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
  }),
  createTodo: yup.object({
    userId: yup.string().matches(/^\d+$/).required(),
    name: yup.string().required().min(3).max(20),
    description: yup.string().required().max(50),
    type: yup.boolean(),
    status: yup.string().oneOf(["active", "passive", "pending"]),
    tagId: yup.string().matches(/^\d+$/).required(),
    categoryId: yup.string().matches(/^\d+$/).required(),
  }),
  updateTodo: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
    name: yup.string().min(3).max(20),
    description: yup.string().max(50),
    type: yup.boolean(),
    status: yup.string().oneOf(["active", "passive", "pending"]),
    tagId: yup.string().matches(/^\d+$/).required(),
    categoryId: yup.string().matches(/^\d+$/).required(),
  }),
};
