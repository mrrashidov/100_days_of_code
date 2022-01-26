const config = require("../../../../knexfile"),
  { AuthenticationError } = require("apollo-server-core"),
  Knex = require("knex"),
  jwt = require("jsonwebtoken"),
  knex = Knex(config.development),
  { login, register } = require("../validators"),
  { validator } = require("../../../helpers");

class User {
  async login(_, { input }, context, root) {
    const result = await validator(login, input);
    if (result) {
      const findUser = await knex("users")
        .whereRaw(`email = ? AND password = crypt(?, password)`, [
          input.email,
          input.password,
        ])
        .first();
      if (!findUser) throw new AuthenticationError("Invalid credentials");
      const token = jwt.sign(
        {
          id: findUser.id,
        },
        "secret"
      );
      return {
        message: "Login successfully",
        token: token,
        user: {
          id: findUser.id,
        },
      };
    }
  }

  async signup(_, { input }, context, root) {
    const result = await validator(register, input);
    //TODO unique control email , phone and username
    if (result) {
      // new UserInputError('Email must be unique')
      return knex
        .insert({
          username: Date.now().toString(),
          email: result.email,
          phone: result.phone,
          first_name: result.first_name ? result.first_name.trim() : "No",
          last_name: result.last_name ? result.last_name.trim() : "Name",
          password: knex.raw(`crypt(?,gen_salt('bf'))`, result.password),
        })
        .into("users");
    }
  }

  async verification(_, args, context, root) {
    return null;
  }

  async verify(_, args, context, root) {
    return null;
  }

  async user(_, args, context, root) {
    return null;
  }
}

module.exports = new User();
