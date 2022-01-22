const config = require("../../../../knexfile"),
  Knex = require("knex"),
  knex = Knex(config.development);

class User {
  async list(_, __, context, root) {
    const users = await knex("users");
    const result = users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        name: {
          first: user.first_name,
          last: user.last_name,
          name: user.username,
        },
        status: user.status,
      };
    });
    return result;
  }

  async find(_, { id }, context, root) {
    const user = await knex("users").where({ id }).first();
    if (!user) {
      throw new Error("User not found");
    }
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      name: {
        first: user.first_name,
        last: user.last_name,
        name: user.username,
      },
      status: user.status,
    };
  }

  async create(_, { input }, context, root) {
    return null;
  }

  async update(_, { input }, context, root) {
    return null;
  }

  async delete(_, { input }, context, root) {
    return null;
  }
}

module.exports = new User();
