const { find, create, update, destroy } = require("../validators/category");
const { status: ss, getKeyByValue } = require("../../../helpers/constants");
const { validator } = require("../../../helpers");
const { ApolloError } = require("apollo-server-core");

class Category {
  async list(_, { input }, { db }, root) {
    const categories = await db
      .select(
        "categories.id",
        "categories.user_id",
        "categories.name",
        "categories.description",
        "categories.type",
        "categories.status",
        "users.username as user_name",
        "users.email as user_email",
        "users.phone as user_phone",
        "users.first_name as user_first_name",
        "users.last_name as user_last_name",
        "users.status as user_status",
        "users.avatar as user_avatar"
      )
      .from("categories")
      .whereNot({
        "categories.status": ss.passive,
      })
      .innerJoin("users", { "users.id": "categories.user_id" })
      .returning("*");
    console.log(categories[0]);
    let data = categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      type: category.type,
      status: category.status,
      user: {
        id: category.user_id,
        name: {
          first: category.user_first_name,
          last: category.user_last_name,
          name: category.user_name,
        },
        email: category.user_email,
        phone: category.user_phone,
        avatar: category.user_avatar,
        // status: getKeyByValue(ss, category.user_status),
      },
    }));
    console.log(data);
    return data;
  }

  async find(_, { id }, { db }, root) {
    const result = await validator(find, { id });
    if (result) {
      const findCategory = await db
        .select(
          "categories.id",
          "categories.user_id",
          "categories.name",
          "categories.description",
          "categories.type",
          "categories.status",
          "users.username as user_name",
          "users.email as user_email",
          "users.phone as user_phone",
          "users.first_name as user_first_name",
          "users.last_name as user_last_name",
          "users.status as user_status",
          "users.avatar as user_avatar"
        )
        .from("categories")
        .whereNot({
          "categories.status": ss.passive,
        })
        .innerJoin("users", { "users.id": "categories.user_id" })
        .first();
      if (!findCategory)
        throw new ApolloError("Category not found", "NOT_FOUND");
      console.log(findCategory);
      return {
        id: findCategory.id,
        name: findCategory.name,
        description: findCategory.description,
        type: findCategory.type,
        status: findCategory.status,
        user: {
          id: findCategory.user_id,
          name: {
            first: findCategory.user_first_name,
            last: findCategory.user_last_name,
            name: findCategory.user_name,
          },
          email: findCategory.user_email,
          phone: findCategory.user_phone,
          avatar: findCategory.user_avatar,
          status: findCategory.user_status,
        },
      };
    }
  }

  async create(_, { input }, { db }, root) {
    const result = await validator(create, input);
    if (result) {
      const id = await db
        .into("categories")
        .insert({
          name: result.name.trim(),
          description: result.description.trim(),
          user_id: result.userId,
          type: result.type,
          status: ss[result.status],
        })
        .returning("id");
      return {
        id: id[0],
        message: {
          title: "Success",
          body: "Category created successfully",
        },
      };
    }
  }

  async update(_, { input }, { db }, root) {
    const result = await validator(update, input);
    if (result) {
      const ifCategoryExists = await db("categories")
        .where({ id: result.id })
        .first();
      if (!ifCategoryExists)
        throw new ApolloError("Category not found", "NOT_FOUND");
      const id = await db("categories")
        .where({ id: result.id })
        .update({
          name: result.name ? result.name.trim() : ifCategoryExists.name,
          description: result.description
            ? result.description.trim()
            : ifCategoryExists.description,
          status: result.status ? ss[result.status] : ifCategoryExists.status,
          type: result.type ? result.type : ifCategoryExists.type,
        })
        .returning("id");

      return {
        id: id[0],
        message: {
          title: "Success",
          body: "Category updated successfully",
        },
      };
    }
  }

  async delete(_, { id }, { db }, root) {
    const result = await validator(destroy, { id });
    if (result) {
      const category = await db("categories")
        .where({ id })
        .whereNot({ status: ss.passive })
        .first();
      if (!category) {
        throw new Error("Category not found");
      }
      const delId = await db("categories")
        .update({ status: ss.passive })
        .where({ id: result.id })
        .returning("id");
      return {
        id: delId[0],
        message: {
          title: "Success",
          body: "Category deleted successfully",
        },
      };
    }
  }
}

module.exports = new Category();
