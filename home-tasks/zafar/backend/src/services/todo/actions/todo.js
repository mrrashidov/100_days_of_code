const { UserInputError } = require("apollo-server-core");

const config = require("../../../../knexfile"),
  Knex = require("knex"),
  knex = Knex(config.development),
  { createTodo, updateTodo } = require("../validators"),
  { validator } = require("../../../helpers");

class Todo {
  async list(_, __, context, root) {
    const todos = await knex("todos");
    const users = await knex("users");
    const tags = await knex("tags");
    const categories = await knex("categories");
    const todoCategories = await knex("todo_categories");
    const todoTags = await knex("todo_tags");
    const result = todos.map((todo) => {
      const tagIds = [];
      const categoryIds = [];
      todoTags.forEach((item) => {
        if (item.todo_id === todo.id) {
          tagIds.push(item.tag_id);
        }
      });
      todoCategories.forEach((item) => {
        if (item.todo_id === todo.id) {
          categoryIds.push(item.category_id);
        }
      });

      const tagsList = tags.filter((tag) => tagIds.includes(tag.id));
      const categoriesList = categories.filter((category) =>
        categoryIds.includes(category.id)
      );

      return {
        id: todo.id,
        user: users.find((user) => user.id === todo.user_id),
        name: todo.name,
        description: todo.description,
        type: todo.type,
        status: todo.status,
        tag: tagsList,
        category: categoriesList,
        createdAt: todo.created_at,
      };
    });
    return result;
  }

  async find(_, { id }, context, root) {
    const todo = await knex("todos").where({ id }).first();
    if (!todo) {
      throw new UserInputError("Todo not found");
    }

    const user = await knex("users").where({ id: todo.user_id }).first();
    if (!user) {
      throw new UserInputError("User not found");
    }

    const todoCategories = await knex("todo_categories").where({
      todo_id: todo.id,
    });
    const todoCatIds = todoCategories.map((cat) => cat.category_id);

    const todoTags = await knex("todo_tags").where({ todo_id: todo.id });
    const todoTagIds = todoTags.map((tag) => tag.tag_id);

    let tags = [];
    let cats = [];

    if (todoCatIds.length > 0) {
      const query = `select * from categories where id in (${todoCatIds.join(
        ","
      )})`;
      const ansQuery = await knex.raw(query);
      cats = ansQuery.rows;
    }

    if (todoTagIds.length > 0) {
      const query = `select * from tags where id in (${todoTagIds.join(",")})`;
      const ansQuery = await knex.raw(query);
      tags = ansQuery.rows;
    }

    return {
      id: todo.id,
      user: user,
      name: todo.name,
      description: todo.description,
      type: todo.type,
      status: todo.status,
      tag: tags,
      category: cats,
      createdAt: todo.created_at,
    };
  }

  async create(_, { input }, context, root) {
    const result = validator(createTodo, input);
    if (result) {
      const tags = await knex("tags");
      const categories = await knex("categories");

      const todoId = await knex
        .insert({
          user_id: input.userId,
          name: input.name,
          description: input.description,
          type: input.type,
          status: input.status,
        })
        .into("todos")
        .returning("id");

      const tagsInput = [];
      tags.forEach((tag) => {
        if (input.tagId.includes(tag.id.toString())) {
          tagsInput.push({
            todo_id: todoId[0],
            tag_id: tag.id,
          });
        }
      });

      const categoriesInput = [];
      categories.forEach((category) => {
        if (input.categoryId.includes(category.id.toString())) {
          categoriesInput.push({
            todo_id: todoId[0],
            category_id: category.id,
          });
        }
      });

      await knex("todo_tags").insert(tagsInput);
      await knex("todo_categories").insert(categoriesInput);
    }
    return {
      id: 1,
      message: {
        title: "Success",
        body: "Created new todo",
      },
    };
  }

  async update(_, { input }, context, root) {
    const result = validator(updateTodo, input);
    if (result) {
      const todo = await knex("todos").where({ id: input.id }).first();
      if (!todo) {
        throw new UserInputError("Todo not found");
      }
      const updatedTodo = {
        name: input.name || todo.name,
        description: input.description || todo.description,
        type: input.type || todo.type,
        status: input.status || todo.status,
      };
      await knex("todos").where({ id: input.id }).update(updatedTodo);

      if (input.categoryId.length > 0) {
        await knex("todo_categories").where({ todo_id: todo.id }).del();
        const categories = await knex("categories");
        const categoriesInput = [];
        categories.forEach((category) => {
          if (input.categoryId.includes(category.id.toString())) {
            categoriesInput.push({
              todo_id: todo.id,
              category_id: category.id,
            });
          }
        });
        await knex("todo_categories").insert(categoriesInput);
      }

      if (input.tagId.length > 0) {
        await knex("todo_tags").where({ todo_id: todo.id }).del();
        const tags = await knex("tags");
        const tagsInput = [];
        tags.forEach((tag) => {
          if (input.tagId.includes(tag.id.toString())) {
            tagsInput.push({
              todo_id: todo.id,
              tag_id: tag.id,
            });
          }
        });
        await knex("todo_tags").insert(tagsInput);
      }
      return {
        id: 2,
        message: {
          title: "Success",
          body: "Updated Todo",
        },
      };
    }
  }

  async delete(_, { id }, context, root) {
    const todo = await knex("todos").where({ id }).first();
    if (!todo) {
      throw new Error("Todo not found");
    }
    await knex("todos").where({ id }).del();
    await knex("todo_categories").where({ todo_id: todo.id }).del();
    await knex("todo_tags").where({ todo_id: todo.id }).del();
    return {
      id: 3,
      message: {
        title: "Success",
        body: "Deleted Todo",
      },
    };
  }
}

module.exports = new Todo();
