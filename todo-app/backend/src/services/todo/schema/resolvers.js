const category = require("../actions/category"),
  tag = require("../actions/tag"),
  todo = require("../actions/todo");
module.exports = {
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
