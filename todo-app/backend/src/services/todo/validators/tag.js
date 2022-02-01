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
    color: yup
      .string()
      .oneOf([
        "red",
        "green",
        "blue",
        "yellow",
        "purple",
        "orange",
        "pink",
        "black",
        "white",
      ]),
    description: yup.string().required().max(50),
    status: yup.string().oneOf(["active", "passive", "pending"]),
  }),
  update: yup.object({
    id: yup.string().matches(/^\d+$/).required(),
    name: yup.string().min(3).max(20),
    color: yup
      .string()
      .oneOf([
        "red",
        "green",
        "blue",
        "yellow",
        "purple",
        "orange",
        "pink",
        "black",
        "white",
      ]),
    description: yup.string().max(50),
    status: yup.string().oneOf(["active", "passive", "pending"]),
  }),
};
