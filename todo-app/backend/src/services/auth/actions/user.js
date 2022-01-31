const { AuthenticationError } = require("apollo-server-core"),
  jwt = require("jsonwebtoken"),
  { login, register } = require("../validators"),
  { validator } = require("../../../helpers");

class User {
  async login(_, { input }, { db }, root) {
    const result = await validator(login, input);
    if (result) {
      const findUser = await db("users")
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
        //process
        process.env.JWT_SECRET
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

  async signup(_, { input }, { db }, root) {
    const result = await validator(register, input);
    //TODO unique control email , phone and username
    if (result) {
      // new UserInputError('Email must be unique')
      return db
        .insert({
          username: Date.now().toString(),
          email: result.email,
          phone: result.phone,
          first_name: result.first_name ? result.first_name.trim() : "No",
          last_name: result.last_name ? result.last_name.trim() : "Name",
          password: db.raw(`crypt(?,gen_salt('bf'))`, result.password),
        })
        .into("users");
    }
  }

  async verification(_, args, { db }, root) {
    return null;
  }

  async verify(_, args, { db }, root) {
    return null;
  }

  async user(_, args, { db }, root) {
    return null;
  }
  async forgot(_, args, { db }, root) {
    return null;
  }

  async refresh(_, args, { db }, root) {
    return null;
  }
}

module.exports = new User();
