const config = require("../../../../knexfile"),
  Knex = require("knex"),
  knex = Knex(config.development),
  { createCategory } = require("../validators"),
  { validator } = require("../../../helpers");
class Category {
  async list(_, { input }, context, root) {
    return null;
  }

  async find(_, { input }, context, root) {
    return null;
  }

  async create(_, { input }, context, root) {
    const result = await validator(createCategory, input);
    if (result) {
      const newCategory = {
        name: input.name,
        description: input.description,
        user_id: input.userId,
      };
      await knex.insert(newCategory).into("categories");
      return {
        id: 1,
        message: {
          title: "Success",
          body: "Created new category",
        },
      };
    }
  }

  async update(_, { input }, context, root) {
    return null;
  }

  async delete(_, { input }, context, root) {
    return null;
  }
}

module.exports = new Category();
