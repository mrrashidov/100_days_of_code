const config = require("../../../../knexfile"),
  Knex = require("knex"),
  knex = Knex(config.development);

class Todo {
  async list(_, { input }, context, root) {
    return null;
  }

  async find(_, { input }, context, root) {
    return null;
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

module.exports = new Todo();
