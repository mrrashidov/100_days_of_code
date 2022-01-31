const { find, create, update, destory } = require("../validators/user");
const { status } = require("../../../helpers/constants");
const { validator } = require("../../../helpers");
const { ApolloError } = require("apollo-server-core");
class User {
  async list(_, { input }, { db }, root) {
    return db("users")
      .whereNot({
        status: status.passive,
      })
      .select("*");
  }

  async find(_, { id }, { db }, root) {
    const result = await validator(find, { id });
    if (result) {
      const findUser = await db("users")
        .where({ id: result.id })
        .whereNot({
          status: status.passive,
        })
        .first();
      if (!findUser) throw new ApolloError("User not found", "NOT_FOUND");
      return findUser;
    }
  }

  async update(_, { input }, context, root) {
    const result = await validator(update, input);
    if (result) {
      const ifUserExists = await db("users")
        .whereNot({
          status: status.passive,
        })
        .where({ id: result.id })
        .first();
      if (!ifUserExists) throw new ApolloError("User not found", "NOT_FOUND");
      const findUserEmailORPhone = await db("users")
        .where({ email: result?.email })
        .orWhere({ phone: result?.phone })
        .first();
      if (findUserEmailORPhone && findUserEmailORPhone.id !== result.id)
        throw new ApolloError(
          "User with this email or phone already exists",
          "ALREADY_EXISTS"
        );
      return db("users")
        .where({ id: result.id })
        .update({
          username: result.username
            ? result.name.trim()
            : ifUserExists.username,
          email: result.email ? result.email.trim() : ifUserExists.email,
          phone: result.phone ? result.phone.trim() : ifUserExists.phone,
          first_name: result.first_name
            ? result.first_name.trim()
            : ifUserExists.first_name,
          last_name: result.last_name
            ? result.last_name.trim()
            : ifUserExists.last_name,
          avatar: result.avatar ? result.avatar.trim() : ifUserExists.avatar,
          status: result.status ? status[result.status] : ifUserExists.status,
        })
        .returning("*");
    }
  }

  async delete(_, { input }, { db }, root) {
    const result = await validator(destory, input);
    if (result) {
      return db("users")
        .where({ id: result.id })
        .update({ status: status.passive })
        .returning("*");
    }
  }
}

module.exports = new User();
