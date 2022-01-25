const { UserInputError } = require("apollo-server-core");

const config = require("../../../../knexfile"),
  Knex = require("knex"),
  knex = Knex(config.development),
  { createMessage } = require("../validators"),
  { updateMessage } = require("../validators"),
  { validator } = require("../../../helpers");
class Message {
  async list(_, { input }, context, root) {
    const messages = await knex("messages");
    const users = await knex("users");
    const groups = await knex("chat_rooms");
    console.log(users[1]);
    const result = messages.map((message) => {
      return {
        sender: users.find((user) => (user.id = message.sender_id)),
        reciver:
          message.type_receiver === "user"
            ? users.find((user) => (user.id = message.receiver_id))
            : groups.find((group) => (group.id = message.receiver_id)),
        message: {
          id: message.id,
          content: message.content,
          typeReceiver: message.type_receiver,
        },
      };
    });
    return result;
  }

  async find(_, { id }, context, root) {
    const message = await knex("messages").where({ id }).first();
    const sender = await knex("users").where({ id: message.sender_id });
    const reciver =
      message.type_receiver === "user"
        ? await knex("users").where({ id: message.receiver_id })
        : await knex("chat_rooms").where({ id: message.receiver_id });
    console.log(sender);
    return {
      sender: sender,
      reciver: reciver,
      message: {
        id: message.id,
        content: message.content,
        typeReceiver: message.type_receiver,
      },
    };
  }

  async create(_, { input }, context, root) {
    const result = await validator(createMessage, input);
    if (result) {
      const id = await knex
        .insert({
          content: input.content,
          sender_id: input.senderId,
          receiver_id: input.reciverId,
          type_receiver: input.typeReceiver,
        })
        .into("messages")
        .returning("id");
      await knex
        .insert({
          room_id: input.chatRoomId,
          message_id: id[0],
        })
        .into("chat_room_messages");
      return {
        id: 1,
        message: {
          title: "Success",
          body: "Created new message",
        },
      };
    }
  }

  async update(_, { input }, context, root) {
    const message = await knex("messages").where({ id: input.id });

    if (!message) {
      throw new UserInputError("Message not found");
    }

    const result = await validator(updateMessage, input);
    if (result) {
      await knex("messages")
        .where({ id: input.id })
        .update({
          content: input.content || message.content,
        });
      return {
        id: 2,
        message: {
          title: "Success",
          body: "Message updated",
        },
      };
    }
  }

  async delete(_, { id }, context, root) {
    const message = await knex("messages").where({ id }).first();
    if (!chatRoom) {
      throw new Error("Messages not found");
    }
    await knex("messages").where({ id }).del();
    return {
      id: 3,
      message: {
        title: "Success",
        body: "Deleted message",
      },
    };
  }
}

module.exports = new Message();
