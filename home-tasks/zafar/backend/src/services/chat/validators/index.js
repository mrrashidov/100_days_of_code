const yup = require("yup");
const { string } = require("yup/lib/locale");
module.exports = {
  create: yup.object({
    name: yup.string().required().min(3).max(20),
  }),
  createMessage: yup.object({
    chatRoomId: yup.number().required(),
    content: yup.string().required(),
    senderId: yup.number().required(),
    reciverId: yup.number().required(),
    typeReceiver: yup.string().required(),
  }),
  updateMessage: yup.object({
    id: yup.number().required(),
    content: yup.string().required(),
  }),
};
