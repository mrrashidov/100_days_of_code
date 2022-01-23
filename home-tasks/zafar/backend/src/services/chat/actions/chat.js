const config = require("../../../../knexfile"),
  Knex = require("knex"),
  knex = Knex(config.development),
  { create } = require("../validators"),
  { validator } = require("../../../helpers");

class User {
  async list(_, __, context, root) {
    const rooms = await knex("chat_rooms");
    return rooms;
  }

  async find(_, { roomId }, context, root) {
    console.log(roomId);
    const room = await knex("chat_rooms").where({ id: 5 });
    console.log(room);
    return room;
  }

  async create(_, { input }, context, root) {
    const result = await validator(create, input);
    if (result) {
      await knex.insert({ name: input.name }).into("chat_rooms");
      return {
        id: 1,
        message: {
          title: "Success",
          body: "Created new chat room",
        },
      };
    }
  }

  async update(_, { input }, context, root) {
    const chatRoom = await knex("chat_rooms")
      .where({
        id: input.id,
      })
      .first();
    if (!chatRoom) {
      throw new Error("Chat room not found");
    }

    const result = await validator(create, input);
    if (result) {
      const updatedChatRoom = {
        name: input.name,
      };
      await knex("chat_rooms").where({ id: input.id }).update(updatedChatRoom);
      return {
        id: 2,
        message: {
          title: "Success",
          body: "Updated chat room",
        },
      };
    }
  }

  async delete(_, { id }, context, root) {
    const chatRoom = await knex("chat_rooms").where({ id }).first();
    if (!chatRoom) {
      throw new Error("Chat room not found");
    }
    await knex("chat_rooms").where({ id }).del();
    return {
      id: 3,
      message: {
        title: "Success",
        body: "Deleted chat room",
      },
    };
  }
}

module.exports = new User();
