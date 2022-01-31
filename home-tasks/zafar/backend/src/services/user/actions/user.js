const config = require("../../../../knexfile"),
  { AuthenticationError } = require("apollo-server-core"),
  Knex = require("knex"),
  knex = Knex(config.development);
class User {
  async list(_, __, context, root) {
    const users = await knex("users").where({
      status: "1",
    });
    const result = users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        name: {
          first: user.first_name,
          last: user.last_name,
          username: user.username,
        },
        status: user.status,
      };
    });
    return result;
  }

  async find(_, { id }, context, root) {
    const user = await knex("users")
      .where({
        id,
      })
      .first();
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
        username: user.username,
      },
      status: user.status,
    };
  }

  async create(_, { input }, context, root) {
    return null;
  }

  async update(_, { input }, context, root) {
    const user = await knex("users")
      .where({
        id: input.id,
      })
      .first();
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = {
      username: input.name.username || user.username,
      email: input.email || user.email,
      phone: input.phone || user.phone,
      first_name: input.name.first || user.first_name,
      last_name: input.name.last || user.last_name,
      avatar: input.avatar || user.avatar,
      status: input.status || user.status,
    };
    await knex("users").where({ id: input.id }).update(updatedUser);
    return {
      id: user.id,
      email: updatedUser.email,
      phone: updatedUser.phone,
      avatar: updatedUser.avatar,
      name: {
        first: updatedUser.first_name,
        last: updatedUser.last_name,
        username: updatedUser.username,
      },
      status: updatedUser.status,
    };
  }

  async updatePassword(_, { input }, context, root) {
    const findUser = await knex
      .raw(
        `
            SELECT *
            FROM users
            WHERE id = ?
            AND password = crypt(?, password)`,
        [input.id, input.password_old]
      )
      .then(({ rows }) => rows[0]);
    if (!findUser) throw new AuthenticationError("Invalid credentials");
    if (input.password_new !== input.password_confirmation)
      throw new AuthenticationError("Invalid credentials");
    await knex("users")
      .where({ id: input.id })
      .update({
        password: knex.raw(`crypt(?,gen_salt('md5'))`, input.password_new),
      });

    return true;
  }

  async delete(_, { input }, context, root) {
    return null;
  }
}

module.exports = new User();
