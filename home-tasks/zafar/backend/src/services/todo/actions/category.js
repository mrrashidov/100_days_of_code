const { UserInputError } = require("apollo-server-core");

const config = require("../../../../knexfile"),
  Knex = require("knex"),
  knex = Knex(config.development),
  { createCategory, updateCategory } = require("../validators"),
  { validator } = require("../../../helpers");
class Category {
  async list(_, __, context, root) {
    const categories = await knex("categories");
    return categories;
  }

  async find(_, { id }, context, root) {
    const category = await knex("categories").where({ id }).first();
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
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
    const category = await knex("categories").where({ id: input.id }).first();
    console.log(category);
    if (!category) {
      throw new UserInputError("Category not found");
    }
    const result = await validator(updateCategory, input);
    if (result) {
      await knex("categories")
        .where({ id: input.id })
        .update({
          name: input.name || category.name,
          description: input.description || category.description,
        });
    }
    return {
      id: 2,
      message: {
        title: "Success",
        body: "Updated category",
      },
    };
  }

  async delete(_, { id }, context, root) {
    const category = await knex("categories").where({ id }).first();
    if (!category) {
      throw new Error("Category not found");
    }
    await knex("categories").where({ id }).del();
    return {
      id: 3,
      message: {
        title: "Success",
        body: "Deleted category",
      },
    };
  }
}

module.exports = new Category();
