const { find, create, update, destory } = require("../validators/role");
const { status } = require("../../../helpers/constants");
const { validator } = require("../../../helpers");
const { ApolloError } = require("apollo-server-core");
class Role {
  async list(_, { input }, { db }, root) {
    return db("roles").select("*");
  }

  async find(_, { id }, { db }, root) {
    const result = await validator(find, { id: id });
    if (result) {
      // TODO role permissions logic qilinishi kerak
      return db("roles").where({ id: result.id }).first();
    }
  }

  async create(_, { input }, { db }, root) {
    const result = await validator(create, input);
    if (result) {
      return db
        .insert("roles")
        .into({
          name: result.name.trim(),
          description: result.description.trim(),
          status: status[result.status],
        })
        .returning("*")
        .then((res) => {
          // now inser permissions
          const payload = result.permissions.map((permission) => ({
            role_id: res[0],
            permission_id: permission,
          }));
          return db.insert("role_permissions").into(payload);
          return res;
        });
    }
  }

  async update(_, { input }, context, root) {
    const result = await validator(update, input);
    if (result) {
      const ifRoleExists = await db("roles").where({ id: result.id }).first();
      if (!ifRoleExists) throw new ApolloError("Role not found", "NOT_FOUND");
      return db("roles")
        .where({ id: result.id })
        .update({
          name: result.name ? result.name.trim() : ifRoleExists.name,
          description: result.description
            ? result.description.trim()
            : ifRoleExists.description,
          status: result.status ? status[result.status] : ifRoleExists.status,
        })
        .returning("*")
        .then(async (res) => {
          if (result.permissions) {
            //first delete this role permissions
            await db("role_permissions").where({ role_id: result.id }).del();
            // now inser permissions
            const payload = result.permissions.map((permission) => ({
              role_id: result.id,
              permission_id: permission,
            }));
            await db.insert("role_permissions").into(payload);
            return res;
          }
        });
    }
  }

  async delete(_, { input }, { db }, root) {
    const result = await validator(destory, input);
    if (result) {
      return db("roles")
        .where({ id: result.id })
        .del()
        .returning("*")
        .then(async (res) => {
          await db("role_permissions").where({ role_id: result.id }).del();
          return res;
        });
    }
  }
}

module.exports = new Role();
