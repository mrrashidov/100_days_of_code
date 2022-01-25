const chat = require("../actions/chat");
const message = require("../actions/message");
module.exports = {
  Query: {
    room: (parent, context, root, args) =>
      chat.find(parent, context, root, args),
    rooms: (parent, context, root, args) =>
      chat.list(parent, context, root, args),
    message: (parent, context, root, args) =>
      message.find(parent, context, root, args),
    messages: (parent, context, root, args) =>
      message.list(parent, context, root, args),
  },
  Mutation: {
    createRoom: (parent, context, root, args) =>
      chat.create(parent, context, root, args),
    updateRoom: (parent, context, root, args) =>
      chat.update(parent, context, root, args),
    deleteRoom: (parent, context, root, args) =>
      chat.delete(parent, context, root, args),
    createMessage: (parent, context, root, args) =>
      message.create(parent, context, root, args),
    updateMessage: (parent, context, root, args) =>
      message.update(parent, context, root, args),
    deleteMessage: (parent, context, root, args) =>
      message.delete(parent, context, root, args),
  },
};
