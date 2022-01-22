const config = require("../../../../knexfile"),
  { status } = require("../../../helpers/constants"),
  Knex = require("knex"),
  knex = Knex(config.development);

class Role {
  async list(_, { input }, context, root) {
    return knex("roles").where({
      status: status.active,
    });
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

module.exports = new Role();
