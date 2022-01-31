const { find, create, update, destory } = require("../validators/permission");
const { validator } = require("../../../helpers");
class Permission {
  async list(_, { input }, { db }, root) {
    return db("permissions").select("*");
  }

  async find(_, { id }, { db }, root) {
    const result = await validator(find, { id: id });
    if (result) {
      return db("permissions").where({ id: result.id }).first();
    }
  }

  async create(_, { input }, { db }, root) {
    const result = await validator(create, input);
    if (result) {
      result.name = result.name.trim();
      result.description = result.description.trim();
      return db.insert("permissions").into(result).returning("*");
    }
  }

  async update(_, { input }, context, root) {
    const result = await validator(update, input);
    if (result) {
      const ifPermissionExists = await db("permissions")
        .where({ id: result.id })
        .first();
      if (!ifPermissionExists)
        throw new AuthenticationError("Permission not found", "NOT_FOUND");
      result.name = result.name ? result.name.trim() : ifPermissionExists.name;
      result.description = result.description
        ? result.description.trim()
        : ifPermissionExists.description;
      return db("permissions")
        .where({ id: result.id })
        .update({
          name: result.name,
          description: result.description,
        })
        .returning("*");
    }
  }

  async delete(_, { input }, { db }, root) {
    const result = await validator(destory, input);
    if (result) {
      db("permissions").where({ id: result.id }).del().returning("*");
    }
  }
}

module.exports = new Permission();
