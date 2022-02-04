const category = require("../actions/category"),
  tag = require("../actions/tag"),
  todo = require("../actions/todo"),
  user = require("../../user/actions/user"),
  { status: ss, getKeyByValue } = require("../../../helpers/constants");
module.exports = {
  Category: {
    id: ({ id }) => id,
    name: ({ name }) => name,
    description: ({ description }) => description,
    type: ({ type }) => type,
    // createdAt: ({ createdAt }) => createdAt,
    status: ({ status }) => getKeyByValue(ss, status),
    user: ({
      user_id,
      user_name,
      user_first_name,
      user_last_name,
      user_email,
    }) => ({
      id: user_id,
      name: {
        // Bu ma'lumotlar graphql ga null bo`lib boryapti, id va email da muammo yo`q
        first: user_first_name,
        last: user_last_name,
        name: user_name,
      },
      // name: ({ user_first_name, user_last_name, user_name }) =>
      //   console.log("aaa", {
      //     first: user_first_name,
      //     last: user_last_name,
      //     name: user_name,
      //   }),
      email: user_email,
    }),
  },
  Query: {
    category: (parent, context, root, args) =>
      category.find(parent, context, root, args),
    categories: (parent, context, root, args) =>
      category.list(parent, context, root, args),
    tag: (parent, context, root, args) => tag.find(parent, context, root, args),
    tags: (parent, context, root, args) =>
      tag.list(parent, context, root, args),
    todo: (parent, context, root, args) =>
      todo.find(parent, context, root, args),
    todos: (parent, context, root, args) =>
      todo.list(parent, context, root, args),
  },
  Mutation: {
    createCategory: (parent, context, root, args) =>
      category.create(parent, context, root, args),
    updateCategory: (parent, context, root, args) =>
      category.update(parent, context, root, args),
    deleteCategory: (parent, context, root, args) =>
      category.delete(parent, context, root, args),
    createTag: (parent, context, root, args) =>
      tag.create(parent, context, root, args),
    updateTag: (parent, context, root, args) =>
      tag.update(parent, context, root, args),
    deleteTag: (parent, context, root, args) =>
      tag.delete(parent, context, root, args),
    createTodo: (parent, context, root, args) =>
      todo.create(parent, context, root, args),
    updateTodo: (parent, context, root, args) =>
      todo.update(parent, context, root, args),
    deleteTodo: (parent, context, root, args) =>
      todo.delete(parent, context, root, args),
  },
};
