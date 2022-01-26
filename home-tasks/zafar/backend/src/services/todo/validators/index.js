const yup = require("yup");
module.exports = {
  createCategory: yup.object({
    name: yup.string().required().min(3).max(20),
    description: yup.string().required().max(50),
    userId: yup.number().required(),
  }),
  updateCategory: yup.object({
    id: yup.number().required(),
    name: yup.string().min(3).max(20),
    description: yup.string().max(50),
  }),
  createTag: yup.object({
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
  updateTag: yup.object({
    id: yup.number().required(),
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
