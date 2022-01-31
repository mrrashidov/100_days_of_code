const { UserInputError } = require("apollo-server-core");

const config = require("../../../../knexfile"),
  Knex = require("knex"),
  knex = Knex(config.development),
  user = require("../../user/actions/user"),
  { createTag, updateTag } = require("../validators"),
  { validator } = require("../../../helpers");

class Tag {
  async list(_, __, context, root) {
    const tags = await knex("tags");
    const result = tags.map((tag) => {
      return {
        id: tag.id,
        user: user.find(_, { id: tag.user_id }, context, root),
        name: tag.name,
        color: tag.color,
        description: tag.description,
        status: tag.status,
        createdAt: tag.created_at,
      };
    });
    return result;
  }

  async find(_, { id }, context, root) {
    const tag = await knex("tags").where({ id }).first();
    if (!tag) {
      throw new UserInputError("Tag not found");
    }
    return {
      id: tag.id,
      user: user.find(_, { id: tag.user_id }, context, root),
      name: tag.name,
      color: tag.color,
      description: tag.description,
      status: tag.status,
      createdAt: tag.created_at,
    };
  }

  async create(_, { input }, context, root) {
    const result = validator(createTag, input);
    if (result) {
      await knex
        .insert({
          user_id: input.userId,
          name: input.name,
          color: input.color,
          description: input.description,
          status: input.status,
        })
        .into("tags");
    }
    return {
      id: 1,
      message: {
        title: "Success",
        body: "Created new tag",
      },
    };
  }

  async update(_, { input }, context, root) {
    const tag = await knex("tags").where({ id: input.id }).first();

    if (!tag) {
      throw new UserInputError("Tag not found");
    }
    const result = await validator(updateTag, input);
    if (result) {
      await knex("tags")
        .where({ id: input.id })
        .update({
          name: input.name || tag.name,
          color: input.color || tag.color,
          description: input.description || tag.description,
          status: input.status || tag.status,
          type: input.type || tag.type,
        });
    }
    return {
      id: 2,
      message: {
        title: "Success",
        body: "Updated Tag",
      },
    };
  }

  async delete(_, { id }, context, root) {
    const tag = await knex("tags").where({ id }).first();
    if (!tag) {
      throw new Error("Tag not found");
    }
    await knex("tags").where({ id }).del();
    return {
      id: 3,
      message: {
        title: "Success",
        body: "Deleted Tag",
      },
    };
  }
}

module.exports = new Tag();
